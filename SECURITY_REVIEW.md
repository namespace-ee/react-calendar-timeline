# Security Review — react-calendar-timeline

**Date:** 2026-02-05
**Version Reviewed:** 0.30.0-beta.6
**Branch:** `ci/automated-npm-release`

---

## Executive Summary

A comprehensive security review of the `react-calendar-timeline` library was conducted covering XSS/injection vulnerabilities, dependency auditing, input validation, prototype pollution, event handler safety, CI/CD pipeline security, and memory management.

**Overall Risk Rating: LOW-MEDIUM**

The library leverages React's built-in HTML escaping for all user-provided content and avoids dangerous patterns like `dangerouslySetInnerHTML`, `eval()`, and `innerHTML`. No critical XSS or injection vectors were found. However, several issues were identified around **memory leaks**, **missing input validation**, and **unconditional `preventDefault`** that should be addressed before production use at scale.

### Findings Summary

| Severity | Count | Categories |
|----------|-------|------------|
| CRITICAL | 2 | Memory leak (interact.js cleanup), unconditional `preventDefault` |
| MEDIUM | 5 | Division-by-zero, callback return validation, date validation, rapid setState, dependency vulnerability |
| LOW | 7 | CSS class injection, pointer type handling, timer validation, legacy CI script, custom event bubbling, non-null assertions, window scroll manipulation |

---

## 1. XSS and Injection Vulnerabilities

### 1.1 dangerouslySetInnerHTML — CLEAR

No usage of `dangerouslySetInnerHTML` found anywhere in the codebase.

### 1.2 Direct DOM Manipulation — CLEAR

No usage of `innerHTML`, `outerHTML`, `insertAdjacentHTML`, or `document.write`.

### 1.3 Dynamic Code Execution — CLEAR

No usage of `eval()`, `new Function()`, or string-based `setTimeout`/`setInterval`. The single `setInterval` in `TodayMarker.tsx:41` uses a callback function (safe).

### 1.4 URL / Protocol Injection — CLEAR

No dynamic `href` or `src` construction. No `javascript:` protocol vectors.

### 1.5 User Content Rendering — SAFE

All user-provided content (item titles, group titles, header labels) flows through React's JSX rendering pipeline and is automatically escaped:

| Content Type | File | Line | Rendering Method | Status |
|-------------|------|------|-----------------|--------|
| Item titles | `src/lib/items/defaultItemRenderer.tsx` | 17 | `{itemContext.title}` (React child) | SAFE |
| Group titles | `src/lib/layout/Sidebar.tsx` | 54 | JSX expression | SAFE |
| Header labels | `src/lib/headers/Interval.tsx` | 65 | `<span>{intervalText}</span>` | SAFE |
| Custom renderers | `src/lib/items/Item.tsx` | 668-682 | React component | SAFE (developer responsibility) |

### 1.6 CSS Class Injection — LOW RISK

**File:** `src/lib/items/Item.tsx:572`

```typescript
const classNames = 'rct-item' + (this.props.item.className ? ` ${this.props.item.className}` : '')
```

User-provided `className` strings are inserted directly into the class attribute. This is **not XSS** (React handles it safely), but could allow CSS injection in specific threat models. Modern browsers have mitigated CSS expression attacks.

### 1.7 Ref-based DOM Manipulation — SAFE

Refs are used only for event listener attachment, position reads, and interact.js integration. No `innerHTML` or `textContent` mutations through refs.

---

## 2. Dependency Audit

### 2.1 npm audit Results

```
2 moderate severity vulnerabilities

esbuild  <=0.24.2
  Severity: moderate
  Advisory: GHSA-67mh-4wv8-2f99 (development server request proxying)
  Fix: npm audit fix --force (upgrades vite to 7.x — breaking change)

  vite  0.11.0 - 6.1.6
  Depends on vulnerable versions of esbuild
```

**Assessment:** This is a **development-only** vulnerability in esbuild/vite that affects the development server. It does **not** affect the published library bundle. Consumers of the npm package are not impacted.

**Recommendation:** Upgrade to Vite 7.x when feasible to resolve.

### 2.2 Runtime Dependencies (4 total — minimal attack surface)

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| `classnames` | ^2.5.1 | SAFE | Tiny, widely-used, no known CVEs |
| `element-resize-detector` | ^1.2.4 | CAUTION | Last publish 2022; consider migrating to `ResizeObserver` |
| `lodash` | ^4.17.21 | SAFE | Only `isEqual` used; no deep merge/extend (prototype pollution safe) |
| `memoize-one` | ^6.0.0 | SAFE | Tiny, no known CVEs |

### 2.3 Peer Dependencies

| Package | Version | Notes |
|---------|---------|-------|
| `dayjs` | ^1.11.10 | Actively maintained, no known CVEs |
| `interactjs` | 1.10.27 | Pinned version; actively maintained |
| `react` | ^18 or ^19 | Actively maintained |
| `react-dom` | ^18 or ^19 | Actively maintained |

### 2.4 Outdated Dependencies (Notable)

| Package | Current | Latest | Risk |
|---------|---------|--------|------|
| `vite` | 5.4.21 | 7.3.1 | Contains moderate vuln (dev-only) |
| `eslint` | 8.57.1 | 9.39.2 | No security impact (devDep) |
| `jsdom` | 25.0.1 | 28.0.0 | No security impact (devDep) |

### 2.5 Supply Chain

- No `postinstall` or lifecycle scripts in `package.json` (safe)
- Package name `react-calendar-timeline` is well-established on npm (no dependency confusion risk)
- `npm ci` used in CI pipeline (ensures lockfile integrity)

---

## 3. Input Validation

### 3.1 CRITICAL — Division by Zero in Core Calculations

Multiple coordinate/time calculation functions lack zero-division guards. If `canvasWidth` becomes 0 (e.g., during resize, hidden container, or SSR), all position calculations return `Infinity` or `NaN`, silently corrupting the rendering pipeline.

**Affected functions:**

| Function | File | Line | Expression |
|----------|------|------|-----------|
| `coordinateToTimeRatio` | `src/lib/utility/calendar.tsx` | 25 | `(canvasTimeEnd - canvasTimeStart) / canvasWidth` |
| `calculateXPositionForTime` | `src/lib/utility/calendar.tsx` | 43 | `canvasWidth / (canvasTimeEnd - canvasTimeStart)` |
| `calculateTimeForXPosition` | `src/lib/utility/calendar.tsx` | 64 | `(canvasTimeEnd - canvasTimeStart) / canvasWidth` |
| Touch zoom handler | `src/lib/scroll/ScrollElement.tsx` | 157 | `this.lastTouchDistance / touchDistance` |

**Impact:** CSS properties set to `Infinity`, potential infinite loops, silent rendering failure.

**Recommendation:**
```typescript
if (!Number.isFinite(canvasWidth) || canvasWidth <= 0) {
  return 0 // or a safe default
}
```

### 3.2 MEDIUM — No Date/Time Range Validation

**File:** `src/lib/utility/calendar.tsx:312-313`, `src/lib/items/Item.tsx:226`

- No validation that `start_time < end_time`
- `dayjs(undefined)` and `dayjs(NaN)` silently return the current time
- `Infinity` and `-Infinity` are accepted without error
- `defaultTimeStart` and `defaultTimeEnd` are not validated against each other

**Recommendation:** Add guards at the prop boundary:
```typescript
if (!Number.isFinite(itemTimeStart) || !Number.isFinite(itemTimeEnd)) {
  return undefined // skip rendering
}
```

### 3.3 MEDIUM — Callback Return Values Not Validated

**File:** `src/lib/items/Item.tsx:337-338`

```typescript
if (this.props.moveResizeValidator) {
  dragTime = this.props.moveResizeValidator('move', this.props.item, dragTime)
}
```

The return value from `moveResizeValidator` is used directly without checking for `NaN`, `Infinity`, or `undefined`. Same pattern at lines 341, 362, 398, 421.

**Recommendation:** Validate callback returns with `Number.isFinite()`.

### 3.4 Safe Patterns Confirmed

- No `JSON.parse` on user-provided strings
- No regex patterns (no ReDoS risk)
- No deep merge/extend on user objects (no prototype pollution)
- `Object.assign` used only with internal/empty objects

---

## 4. Memory Leaks and Resource Management

### 4.1 CRITICAL — Missing interact.js Cleanup on Unmount

**File:** `src/lib/items/Item.tsx:289-438`

The `Item` component mounts interact.js drag/resize handlers in `mountInteract()` but has **no `componentWillUnmount` lifecycle method**. interact.js maintains internal event listeners and state that are never released.

**Impact:**
- Memory leak grows with every item select/deselect cycle
- interact.js listeners accumulate indefinitely
- With dynamic item lists, memory usage grows unboundedly
- Can cause browser performance degradation or crashes in long-running sessions

**Recommendation:**
```typescript
componentWillUnmount() {
  if (this.itemRef.current) {
    interact(this.itemRef.current).unset()
  }
}
```

### 4.2 MEDIUM — TodayMarker Interval Without Minimum Validation

**File:** `src/lib/markers/implementations/TodayMarker.tsx:40-46`

```typescript
createIntervalUpdater(interval: number) {
  return setInterval(() => {
    this.setState({ date: Date.now() })
  }, interval)
}
```

If `interval` is 0 or negative, `setInterval` fires as fast as possible, causing excessive re-renders.

**Recommendation:** Enforce a minimum interval (e.g., 100ms).

### 4.3 Confirmed Safe Cleanup

- `ScrollElement` properly removes all 6 event listeners in `componentWillUnmount`
- `CursorMarker` properly unsubscribes on unmount
- `TodayMarker` properly calls `clearInterval` on unmount
- Container resize detector properly calls `removeAllListeners` on unmount

---

## 5. Event Handler Security

### 5.1 CRITICAL — Unconditional preventDefault in composeEvents

**File:** `src/lib/utility/events.ts:4-8`

```typescript
export function composeEvents<T extends SyntheticEvent<any>>(...fns: (Fn<T> | undefined)[]) {
  return (event: T, ...args: any) => {
    event.preventDefault() // ALWAYS called
    fns.forEach(fn => fn && fn(event, ...args))
  }
}
```

**ALL** composed events have `preventDefault()` called unconditionally, regardless of the event type. This:
- Breaks browser defaults for links, form submissions, and keyboard shortcuts
- Can break accessibility (screen readers, keyboard navigation)
- Prevents standard user interactions within timeline items

**Recommendation:** Remove the blanket `preventDefault()`. Let individual handlers decide whether to prevent default behavior.

### 5.2 MEDIUM — Rapid setState During Drag Operations

**File:** `src/lib/items/Item.tsx:312-348`

`dragmove` events fire at 60+ times/second, each calling `setState`. No debouncing or throttling is applied, which can cause:
- Excessive re-renders
- State batching inconsistencies
- Performance degradation on lower-end devices

### 5.3 LOW — Window Scroll Manipulation

**File:** `src/lib/scroll/ScrollElement.tsx:174`

```typescript
window.scrollTo(window.scrollX, this.singleTouchStart!.screenY - deltaY0)
```

Direct `window.scrollTo()` manipulation during touch events could interfere with the user's scroll position on the page.

### 5.4 Safe Patterns Confirmed

- No `postMessage` or cross-origin communication
- No `localStorage` / `sessionStorage` usage
- No network requests (`fetch`, `XMLHttpRequest`)
- Custom events use safe boolean data, not user input

---

## 6. CI/CD Pipeline Security

### 6.1 GitHub Actions Workflow — `release.yml`

**Overall: SECURE**

| Check | Status | Details |
|-------|--------|---------|
| Secrets handling | SAFE | `NPM_TOKEN` passed via `env` block, not inline |
| Trigger type | SAFE | `push` on `v*` tags only (no PR-based triggers) |
| `pull_request_target` | NOT USED | No elevated permission risk |
| Action pinning | ACCEPTABLE | `actions/checkout@v4`, `actions/setup-node@v4` (official, major version) |
| Artifacts | NONE USED | No upload/download exploitation vectors |
| Permissions | MINIMAL | `contents: read` only |
| Pre-publish checks | PRESENT | Lint, test, build, version validation before npm publish |
| Dependency install | SAFE | Uses `npm ci` (lockfile integrity) |

### 6.2 Legacy Script — `deploy-gh-pages.sh`

**Status:** Legacy (Travis CI references). Not used by current workflows.

**Issues found:**
- Line 39: `eval \`ssh-agent -s\`` — unsafe eval usage
- Line 40: References Travis CI encrypted secrets
- Line 66: Unquoted environment variable in git config

**Recommendation:** Remove or archive this file if no longer in use.

---

## 7. TypeScript and Type Safety

### 7.1 Non-null Assertions

**File:** `src/lib/items/Item.tsx` — multiple lines (229, 241, 276, 317-318, etc.)

Widespread use of TypeScript non-null assertions (`!`) on state values that could be `null` during edge cases (unmounting during drag, rapid prop changes). These bypass TypeScript's null safety and could throw runtime errors.

### 7.2 ESLint Configuration

**File:** `.eslintrc.json`

- `@typescript-eslint/no-explicit-any` is disabled — allows `any` types throughout
- `@ts-comment` rule is set to warn only

These weaken type safety but are not direct security vulnerabilities.

---

## 8. Recommendations Summary

### Must Fix (Before Production at Scale)

1. **Add `componentWillUnmount` to `Item.tsx`** — Call `interact(this.itemRef.current).unset()` to prevent memory leaks
2. **Fix `composeEvents` in `events.ts`** — Remove unconditional `preventDefault()`
3. **Add zero-division guards in `calendar.tsx`** — Protect `coordinateToTimeRatio`, `calculateXPositionForTime`, `calculateTimeForXPosition`

### Should Fix

4. **Validate date/time inputs** — Guard against `NaN`, `Infinity`, and inverted ranges
5. **Validate `moveResizeValidator` return values** — Check with `Number.isFinite()`
6. **Add minimum interval enforcement** to `TodayMarker`
7. **Upgrade Vite** to 7.x to resolve esbuild advisory (dev-only)

### Consider

8. **Migrate from `element-resize-detector`** to native `ResizeObserver` (the former is unmaintained)
9. **Remove legacy `deploy-gh-pages.sh`** script
10. **Pin GitHub Actions to commit SHAs** for maximum supply chain security
11. **Add error boundaries** around custom renderers (`itemRenderer`, `groupRenderer`)
12. **Add throttling** to drag event state updates
13. **Enable stricter ESLint rules** — disallow `any`, require null checks

---

## 9. Production Usage Assessment

**Is this library safe to use in production?**

**Yes, with caveats.** The library has a clean security profile for a React UI component:

- No XSS vectors — React's escaping handles all user content
- No code execution risks — no `eval`, `innerHTML`, or dynamic code
- Minimal dependency surface — only 4 runtime deps, all well-maintained
- No network activity — pure UI component, no data exfiltration risk
- Secure CI/CD — proper secrets handling and minimal permissions

**Primary concerns for production:**

1. The **interact.js memory leak** (Item.tsx) will cause degradation in long-running sessions with frequent item interactions. This is the most impactful issue.
2. The **unconditional `preventDefault`** may break accessibility compliance and standard browser behaviors.
3. **Missing numeric validation** could cause silent rendering failures if your data contains edge-case values.

If your use case involves long-lived pages, accessibility requirements, or untrusted data sources, address the "Must Fix" items above before deploying.
