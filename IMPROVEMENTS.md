# Improvement Roadmap — react-calendar-timeline

**Date:** 2026-02-05
**Version:** 0.30.0-beta.12

A comprehensive list of improvements needed to bring this library to production-grade quality across testing, usability, accessibility, performance, documentation, and architecture.

---

## Table of Contents

0. [Unmigrated Files (moment → dayjs, Enzyme → RTL)](#0-unmigrated-files-moment--dayjs-enzyme--rtl)
1. [Testing](#1-testing)
2. [Accessibility (A11y)](#2-accessibility-a11y)
3. [API Usability & Developer Experience](#3-api-usability--developer-experience)
4. [Architecture & Modernization](#4-architecture--modernization)
5. [Performance](#5-performance)
6. [Documentation](#6-documentation)
7. [Build, CI & Tooling](#7-build-ci--tooling)
8. [Community & Project Health](#8-community--project-health)

---

## 0. Unmigrated Files (moment → dayjs, Enzyme → RTL)

The v0.30 rewrite moved the source to TypeScript and `dayjs`, but **11 test files were never migrated**. They still import `moment` and/or `enzyme`, which means they cannot run against the current source. This is the root cause of the disabled test suites and the ~30% coverage number.

### 0.1 Critical: Test Files Still Importing `moment`

These files import `moment` and use `moment()` calls. All must be rewritten to use `dayjs`:

| File | moment Usage |
|------|-------------|
| `__tests__/index.js` | `import moment from 'moment'` — ~15 `moment()` calls (lines 18-213) |
| `__tests__/components/Timeline/Timeline.test.js` | `import moment from 'moment'` — `moment()` for test data (lines 16-17, 33-34) |
| `__tests__/components/Headers/DateHeader.test.js` | `import moment from 'moment'` — `moment.isMoment()` checks, `moment()` constructors (lines 79-80, 203-275) |
| `__tests__/components/Headers/CustomHeader.test.js` | `import moment from 'moment'` — `moment.utc()` and `moment()` calls (lines 24-113) |
| `__tests__/utils/calendar/calculate-x-position-for-time.js` | `import moment from 'moment'` — `moment().startOf('day')` (line 24) |
| `__tests__/utils/calendar/get-min-unit.js` | `import moment from 'moment'` — `moment.duration()` calls (lines 12-42) |
| `__tests__/utils/calendar/get-visible-items.js` | `import moment from 'moment'` — `moment()` constructors (lines 14-105) |
| `__tests__/utils/calendar/calculate-time-for-x-position.js` | `import moment from 'moment'` — `moment()` calls (lines 6-61) |
| `__tests__/test-utility/header-renderer.js` | Uses `moment` indirectly via test data |

### 0.2 Critical: Test Files Still Using Enzyme

These files import `enzyme` and use `.mount()`, `.simulate()`, `.find()` patterns. All must be rewritten to use `@testing-library/react`:

| File | Enzyme Usage |
|------|-------------|
| `__tests__/index.js` | `import { mount } from 'enzyme'` — `.mount()` calls throughout (lines 39-230) |
| `__tests__/components/Timeline/Timeline.test.js` | `import { mount } from 'enzyme'` — `.mount()` calls (lines 25, 42) |
| `__tests__/components/interaction/PreventClickOnDrag.js` | `import { mount } from 'enzyme'` — `.mount()`, `.simulate()` (lines 10-147) |
| `__tests__/components/GroupRow/GroupRow.test.js` | `import { mount, render } from 'enzyme'` — `.mount()`, `.simulate()` (lines 26-41) |
| `__tests__/components/GroupRow/GroupRows.test.js` | `import { mount } from 'enzyme'` — `.mount()` (line 34) |
| `__tests__/components/Sidebar/Sidebar.test.js` | `import { mount } from 'enzyme'` — `.mount()` (line 40) |
| `__tests__/components/ScrollElement/ScrollElement.test.js` | `import { mount } from 'enzyme'` — `.mount()` (lines 50-51) |

### 0.3 Already Migrated (No Action Needed)

These files are already using `dayjs` and/or `@testing-library/react`:

- All `src/` source files — fully TypeScript, using `dayjs`
- All `demo/src/` files — using `dayjs`
- `demo-next/` — using `dayjs`
- `__fixtures__/` — plain data exports, no `moment`/`enzyme`
- `__tests__/components/Headers/DateHeader.test.js` — already uses RTL (still needs `moment` → `dayjs`)
- `__tests__/components/Headers/TimelineHeader.test.js` — already uses RTL
- `__tests__/components/Headers/SideBarHeader.test.js` — already uses RTL
- `__tests__/components/Headers/CustomHeader.test.js` — already uses RTL (still needs `moment` → `dayjs`)
- `__tests__/components/Markers/*.test.js` — already uses RTL

### 0.4 Medium: README and Documentation Still Referencing `moment`

| File | Lines | Issue |
|------|-------|-------|
| `README.md` | 72 | `import moment from 'moment'` in usage example |
| `README.md` | 81-96 | Multiple `moment()` calls in code examples |
| `README.md` | 100-111 | `ReactDOM.render()` instead of `createRoot()` |
| `README.md` | 71, 1213 | CSS import path `lib/Timeline.css` (old, no longer exists) |
| `README.md` | 38, 40 | GitHub links reference `master` branch instead of `main` |
| `CHANGELOG.md` | 210 | Example link references `/tree/master/examples` |
| `CONTRIBUTING.md` | 16 | "target the `master` branch" — should be `main` |
| `examples/README.md` | all | 10 CodeSandbox links all use `moment` and pre-v0.30 API |

---

## 1. Testing

The test suite currently covers roughly **30-40%** of the codebase. Two test suites are fully disabled, the most complex interactive component has zero tests, and there are no E2E tests.

### 1.1 Critical: Re-enable Disabled Test Suites

Two test suites are wrapped in `xdescribe` and never run:

- [ ] **`Timeline.test.js`** — 3 tests disabled. The main component has no active tests.
- [ ] **`ScrollElement.test.js`** — 11 tests disabled covering mouse events, dragging, and scroll behavior.
- [ ] Investigate why they were disabled (likely enzyme removal), port to React Testing Library, and re-enable.

### 1.2 Critical: Add Tests for Untested Components

These source files have **zero** test coverage:

| Component | File | Priority | Reason |
|-----------|------|----------|--------|
| Item | `src/lib/items/Item.tsx` | **P0** | Most complex component — drag, resize, selection, all untested |
| Items | `src/lib/items/Items.tsx` | P1 | Item collection management |
| defaultItemRenderer | `src/lib/items/defaultItemRenderer.tsx` | P1 | Default rendering pipeline |
| Columns | `src/lib/columns/Columns.tsx` | P2 | Column rendering |
| PreventClickOnDrag | `src/lib/interaction/PreventClickOnDrag.tsx` | P2 | Drag interaction prevention |
| CustomDateHeader | `src/lib/headers/CustomDateHeader.tsx` | P2 | Custom date header |
| TimelineHeaders | `src/lib/headers/TimelineHeaders.tsx` | P2 | Headers container |
| MarkerCanvas | `src/lib/markers/MarkerCanvas.tsx` | P2 | Marker canvas behavior |
| TimelineStateContext | `src/lib/timeline/TimelineStateContext.tsx` | P2 | State context provider |
| composeEvents | `src/lib/utility/events.ts` | P1 | Event composition (has known bugs) |
| generic utils | `src/lib/utility/generic.ts` | P2 | Helper functions |
| dom-helpers | `src/lib/utility/dom-helpers.ts` | P2 | Only 1 placeholder test exists |

### 1.3 High: Expand Thin Test Suites

These components have only smoke-level testing:

- [ ] **Sidebar.test.js** — 1 test (height prop only). Add: interaction, state management, prop validation, groupRenderer.
- [ ] **GroupRows.test.js** — 1 test (height mapping only). Add: callback testing, event handling, row rendering.
- [ ] **TodayMarker.test.js** — 2 tests commented out as `xit` (interval behavior). Fix and enable.

### 1.4 High: Add Missing Test Categories

- [ ] **Interaction tests** — Drag-and-drop, resize start/move/end, item selection/deselection, multi-select.
- [ ] **Edge case tests** — `NaN`/`Infinity` timestamps, zero-width items, `start_time >= end_time`, empty groups/items arrays, 0 `canvasWidth`.
- [ ] **Error handling tests** — Invalid prop combinations, malformed data, missing required props, callback exceptions.
- [ ] **Keyboard/accessibility tests** — Once keyboard support is added (see section 2).
- [ ] **Touch event tests** — Multi-touch, pinch-to-zoom, touch scroll.

### 1.5 Medium: Add E2E Tests

No end-to-end tests exist. Add Playwright or Cypress tests for:

- [ ] Full timeline render with groups and items.
- [ ] Drag an item to a new time/group.
- [ ] Resize an item.
- [ ] Zoom in/out (scroll wheel, pinch).
- [ ] Scroll horizontally through time.
- [ ] Select/deselect items.

### 1.6 Medium: Standardize Test Framework

Tests currently use a mix of patterns from a previous Enzyme setup and React Testing Library. Standardize:

- [ ] Remove all Enzyme-style patterns.
- [ ] Standardize on `@testing-library/react` + `@testing-library/user-event`.
- [ ] Migrate `simulate()` calls to `fireEvent` or `userEvent`.

### 1.7 Low: Add Test Infrastructure

- [ ] Add code coverage reporting (`jest --coverage`) and set minimum thresholds.
- [ ] Add coverage to CI pipeline with a failure gate.
- [ ] Add a `test:ci` script to `package.json`.
- [ ] Convert test files from `.js` to `.ts`/`.tsx` for type safety.

---

## 2. Accessibility (A11y)

The library has **no accessibility support**. Zero ARIA attributes, zero keyboard handlers, zero focus management, zero screen reader support. This is a WCAG compliance blocker.

### 2.1 Critical: ARIA Attributes

- [ ] Add `role="grid"` or `role="treegrid"` to the main timeline container.
- [ ] Add `role="row"` to group rows.
- [ ] Add `role="gridcell"` to timeline items.
- [ ] Add `aria-label` to all interactive items (include item title, time range, group name).
- [ ] Add `aria-selected` to items reflecting selection state.
- [ ] Add `aria-grabbed` / `aria-dropeffect` for drag-and-drop (or WAI-ARIA 1.2 equivalents).
- [ ] Add `role="columnheader"` to date headers.
- [ ] Add `role="rowheader"` to sidebar group labels.

### 2.2 Critical: Keyboard Navigation

- [ ] Add `tabIndex={0}` to interactive items to make them focusable.
- [ ] Implement arrow key navigation between items (left/right for time, up/down for groups).
- [ ] `Enter` / `Space` to select an item.
- [ ] `Escape` to deselect / cancel a drag operation.
- [ ] `Tab` / `Shift+Tab` for focus traversal.
- [ ] `Home` / `End` for first/last item in the timeline.

### 2.3 Critical: Keyboard Drag-and-Drop Alternative

- [ ] Arrow keys to move a selected item when in "grab mode" (activated by Space/Enter).
- [ ] `Shift+Arrow` for resizing a selected item.
- [ ] `Ctrl/Cmd+Arrow` for larger increments.
- [ ] `Escape` to cancel the operation and revert.

### 2.4 Critical: Focus Management

- [ ] Add visible focus indicators (`:focus-visible` outline) to all interactive elements.
- [ ] Manage focus restoration after drag/resize completes.
- [ ] Trap focus within the timeline when interacting.
- [ ] Ensure focus is not lost when items re-render or the list scrolls.

### 2.5 High: Screen Reader Support

- [ ] Add an `aria-live="polite"` region for announcing state changes.
- [ ] Announce when an item is selected: "Item [title] selected, [start] to [end], in group [name]".
- [ ] Announce during drag: "Moving [title] to [new time], group [name]".
- [ ] Announce after resize: "[title] resized to [start] - [end]".
- [ ] Add visually-hidden text (`.sr-only`) for context not conveyed visually.

### 2.6 High: Color Contrast Fix

The selected item state fails WCAG AA contrast:

- **Selected item:** `#FFC107` (amber) background + `white` text = **~1.9:1 contrast ratio** (requires 4.5:1).
- [ ] Change the default selected text color to a dark color (e.g., `#000` or `#333`).
- [ ] Add a secondary visual indicator for selection beyond color alone (e.g., thicker border, checkmark icon, shadow) per WCAG 1.4.1.

### 2.7 Medium: RTL (Right-to-Left) Support

- [ ] Replace physical CSS properties (`left`, `right`, `margin-left`) with logical properties (`inset-inline-start`, `margin-inline-start`).
- [ ] Add a `direction` prop or detect `dir` attribute from the DOM.
- [ ] Mirror the timeline layout for RTL locales.
- [ ] Test with Arabic/Hebrew content.

### 2.8 Low: Reduced Motion

- [ ] Add `@media (prefers-reduced-motion: reduce)` to disable any scroll smoothing or transitions.
- [ ] Respect the preference in JavaScript smooth-scroll calls.

---

## 3. API Usability & Developer Experience

### 3.1 High: Fix TypeScript Type Definitions

The type definitions don't match runtime behavior — many props are typed as required but have `defaultProps`:

- [ ] Mark all props with defaults as optional (`?`) in the TypeScript interface. Affected props: `sidebarWidth`, `rightSidebarWidth`, `dragSnap`, `lineHeight`, `itemHeightRatio`, `minZoom`, `maxZoom`, `stackItems`, `timeSteps`, `keys`, `buffer`, `canMove`, `canResize`, `canSelect`, `canChangeGroup`, `useResizeHandle`, and others.
- [ ] Remove `any` types and replace with proper types:
  - `headerRef?: Ref<any>` → `Ref<HTMLDivElement>`
  - `canResizeLeft: any`, `canResizeRight: any` → `boolean`
  - `onBoundsChange` return type `any` → `void`
  - `deepObjectCompare(obj1: any, obj2: any)` → add generics
- [ ] Add JSDoc comments to all exported types and props (enables IDE hover tooltips).

### 3.2 High: Support Generic Item/Group Types

Users cannot extend `TimelineItemBase` or `TimelineGroupBase` with custom fields and maintain type safety:

```typescript
// Current: rigid, no custom fields
interface TimelineItemBase { id, group, title, start_time, end_time, ... }

// Desired: extensible
interface TimelineItemBase<TCustom = {}> extends TCustom { id, group, title, ... }
// or
type TimelineItem<T> = TimelineItemBase & T
```

- [ ] Add generic type parameter to `TimelineItemBase` and `TimelineGroupBase`.
- [ ] Propagate generics to `ReactCalendarTimelineProps<TItem, TGroup>`.
- [ ] Propagate generics to all callback signatures.

### 3.3 High: Standardize Callback Parameter Order

Event handler signatures are inconsistent:

```typescript
// Current inconsistency:
onItemClick(itemId, e, time)         // id, event, time
onCanvasClick(groupId, time, e)      // id, time, event ← different order!
onItemSelect(itemId, e, time)        // id, event, time
onCanvasDoubleClick(groupId, time, e) // id, time, event ← different!
```

- [ ] Standardize all callbacks to `(id, event, time)` or, better, a single options object: `({ id, event, time })`.
- [ ] Deprecate old signatures and provide a migration path.

### 3.4 Medium: Clean Up Confusing Props

- [ ] Rename `canResize` — currently accepts `boolean | 'left' | 'right' | 'both'`. Mixing types is confusing. Consider separate `canResizeLeft` / `canResizeRight` booleans.
- [ ] Rename `dragSnap` to `snapInterval` for clarity.
- [ ] Rename `endTimeOrStartTime` parameter in `onItemResize` to be explicit about which time it represents.
- [ ] Document the interaction between `lineHeight`, `itemHeightRatio`, and `itemVerticalGap`.

### 3.5 Medium: Add Missing Props

- [ ] `readOnly` — Disables all interactions (drag, resize, select, zoom).
- [ ] `disableZoom` / `disableScroll` — Granular interaction control.
- [ ] `containerClassName` / `containerStyle` — For the `.rct-outer` wrapper.
- [ ] `onCanvasRightClick` — Currently only `onCanvasContextMenu` exists, naming is unclear.

### 3.6 Medium: Add Input Validation and Error Messages

- [ ] Validate `defaultTimeStart < defaultTimeEnd` with a descriptive error.
- [ ] Validate `minZoom < maxZoom`.
- [ ] Validate `visibleTimeStart < visibleTimeEnd`.
- [ ] Warn if an item references a non-existent group ID.
- [ ] Warn if `buffer` is set to 1 (disables scrolling — per README, but no runtime hint).
- [ ] Warn if `timeSteps.hour < 1` (causes infinite loop — issue #956).

### 3.7 Low: Remove Internal Types from Public API

- [ ] Stop exporting `OnItemDragObjectBase` (implementation detail).
- [ ] Stop exposing `dimensions` on `TimelineItemBase` and `TimelineGroupBase` (internal).
- [ ] Stop exposing `isOverlay` on items (undocumented internal).

---

## 4. Architecture & Modernization

### 4.1 High: Migrate Class Components to Function Components

The main components are class-based. Hooks would simplify lifecycle management, memoization, and context consumption:

| Component | File | Lines | Complexity |
|-----------|------|-------|-----------|
| `ReactCalendarTimeline` | `src/lib/Timeline.tsx` | 1109 | Very High |
| `Item` | `src/lib/items/Item.tsx` | ~700 | High |
| `ScrollElement` | `src/lib/scroll/ScrollElement.tsx` | ~200 | Medium |
| `DateHeaderInner` | `src/lib/headers/DateHeader.tsx` | ~150 | Low |
| `TimelineHeaders` | `src/lib/headers/TimelineHeaders.tsx` | ~120 | Low |
| `MarkerCanvas` | `src/lib/markers/MarkerCanvas.tsx` | ~80 | Low |
| `TodayMarker` | `src/lib/markers/implementations/TodayMarker.tsx` | ~60 | Low |

- [ ] Start with smaller components (`TodayMarker`, `MarkerCanvas`, `DateHeaderInner`).
- [ ] Migrate `Item` next — enables `useEffect` cleanup for interact.js (fixes memory leak).
- [ ] Migrate `ScrollElement` — enables `useRef` + `useEffect` for event listeners.
- [ ] Migrate `Timeline` last — largest and most complex.

### 4.2 High: Fix interact.js Memory Leak

`Item.tsx` mounts interact.js handlers in `mountInteract()` but has no `componentWillUnmount`. Listeners accumulate on every select/deselect cycle.

- [ ] Add cleanup: `interact(this.itemRef.current).unset()` on unmount.
- [ ] Or, if migrating to hooks: clean up in `useEffect` return function.

### 4.3 High: Fix `composeEvents` Bug

`src/lib/utility/events.ts` — `composeEvents()` calls `event.preventDefault()` unconditionally on every composed event, breaking browser defaults and accessibility.

- [ ] Remove the blanket `preventDefault()`.
- [ ] Let individual event handlers decide whether to prevent default.

### 4.4 Medium: Replace `element-resize-detector` with `ResizeObserver`

`element-resize-detector` (last published 2022) is a polyfill for `ResizeObserver`, which is now supported by all modern browsers (97%+ global support).

- [ ] Replace with native `ResizeObserver`.
- [ ] Remove the `element-resize-detector` dependency.
- [ ] Simplify the `resizeDetector` prop or remove it entirely.

### 4.5 Medium: Remove `secretKey` Anti-pattern

`TimelineHeaders` uses a `secretKey` static property for component type detection (`Timeline.tsx:876-879`). This is brittle and breaks with HOCs, `React.memo`, etc.

- [ ] Replace with React Context or a proper type guard.

### 4.6 Low: Extract Custom Hooks

Extract reusable logic from class components:

- [ ] `useResizeObserver()` — replace container/window resize detection.
- [ ] `useInteractDraggable()` — wrap interact.js with proper cleanup.
- [ ] `useTimelineScroll()` — encapsulate scroll/zoom behavior.
- [ ] `useTimelineKeyboard()` — once keyboard navigation is added.

---

## 5. Performance

### 5.1 High: Memoize Expensive Calculations During Drag

- [ ] `stackTimelineItems` is called on every render during drag operations (`Timeline.tsx:1012-1035`). Cache the result and only recalculate when items/groups/dimensions change, not on every drag event.
- [ ] `getTimelineContext()` creates a new object every call (`Timeline.tsx:246-260`). Memoize it.
- [ ] `getSelected()` creates a new array every render (`Timeline.tsx:948-950`). Memoize with `useMemo` or `memoize-one`.
- [ ] `childrenWithProps` object is recreated every render (`Timeline.tsx:881-926`). Memoize it.

### 5.2 Medium: Throttle Drag/Resize State Updates

`dragmove` events fire 60+ times per second, each calling `setState`. This triggers 60+ re-renders per second.

- [ ] Throttle or use `requestAnimationFrame` to batch drag state updates.
- [ ] Consider using a ref for intermediate drag state and only `setState` on significant changes.

### 5.3 Medium: Optimize `shouldComponentUpdate` in Items

`Items.tsx:59-77` uses `arraysEqual` (O(n) comparison) in `shouldComponentUpdate`. With many items, this adds up.

- [ ] Use shallow reference comparison where possible.
- [ ] Consider moving to `React.memo` with a custom comparator.

### 5.4 Low: Lazy Calculate Item Dimensions

- [ ] Only calculate dimensions for visible items, not all items.
- [ ] Use virtual scrolling for very large item lists (100k+ items).

---

## 6. Documentation

### 6.1 Critical: Update README for v0.30

The README is severely outdated:

- [ ] Replace all `moment` references with `dayjs`.
- [ ] Update the usage example to use `createRoot()` instead of `ReactDOM.render()`.
- [ ] Fix the CSS import path: `react-calendar-timeline/lib/Timeline.css` → `react-calendar-timeline/style.css`.
- [ ] Document new v0.30 features: `itemVerticalGap`, per-item `height`, external drag-and-drop.
- [ ] Add TypeScript usage examples and type import guidance.
- [ ] Fix broken links (`master` branch → `main`, CodeSandbox examples).
- [ ] Document the `dayjs` peer dependency and locale/timezone configuration.

### 6.2 Critical: Write a Migration Guide

No migration guide exists for v0.28 → v0.30, which is a major rewrite:

- [ ] Create `MIGRATION.md` covering:
  - `moment` → `dayjs` migration (including timezone plugin setup).
  - CSS import path changes.
  - React 18+ requirement (`createRoot`).
  - Removed/renamed props.
  - TypeScript adoption.
  - Build system changes (Webpack → Vite for the library).

### 6.3 High: Document Undocumented Props

These props exist in code but are missing from the README:

- [ ] `sidebarContent` / `rightSidebarContent`
- [ ] `headerRef`
- [ ] `isOverlay` on items
- [ ] `itemVerticalGap` (mentioned in banner but not in the API reference)
- [ ] Per-item `height` override

### 6.4 High: Add JSDoc to All Exports

- [ ] Add JSDoc comments to every prop in `ReactCalendarTimelineProps`.
- [ ] Add JSDoc to all exported types (`TimelineItemBase`, `TimelineGroupBase`, `ItemContext`, etc.).
- [ ] Add JSDoc to all exported utility functions.
- [ ] This enables IDE hover documentation without needing to consult the README.

### 6.5 Medium: Update CodeSandbox Examples

The 10 CodeSandbox examples in `examples/README.md` all use `moment` and pre-v0.30 API:

- [ ] Recreate all examples using `dayjs` and the current API.
- [ ] Consider using StackBlitz or CodeSandbox with GitHub repo links for automatic updates.

### 6.6 Medium: Add Storybook

No interactive component explorer exists:

- [ ] Set up Storybook with stories for: basic timeline, custom renderers, markers, headers, controlled/uncontrolled usage, drag/resize.
- [ ] Deploy Storybook to GitHub Pages or Chromatic for a live demo.

### 6.7 Low: Add a Root `dev` Script

The demo app exists in `demo/` but there's no way to start it from the root:

- [ ] Add `"dev": "cd demo && npm run dev"` or use npm workspaces.
- [ ] The README says `yarn start` but this script does not exist.

---

## 7. Build, CI & Tooling

### 7.1 High: Upgrade Vite to Resolve esbuild Advisory

```
esbuild <=0.24.2 — GHSA-67mh-4wv8-2f99 (moderate, dev-only)
vite 0.11.0 - 6.1.6 — depends on vulnerable esbuild
```

- [ ] Upgrade Vite from 5.4.x to 7.x (breaking change, needs build config review).

### 7.2 Medium: Fix Broken `lint:fix` Script

`package.json` has:
```json
"lint:fix": "npm run lint --fix"
```
This does **not** pass `--fix` to eslint. Should be:
```json
"lint:fix": "eslint --ext .ts --ext .tsx ./src --fix"
```

### 7.3 Medium: Add Test Coverage to CI

- [ ] Add `jest --coverage` with minimum thresholds to the release workflow.
- [ ] Fail the build if coverage drops below the threshold.
- [ ] Add a coverage badge to the README.

### 7.4 Medium: Pin GitHub Actions to Commit SHAs

Currently using `actions/checkout@v4` and `actions/setup-node@v4` (major version tags). For maximum supply chain security:

- [ ] Pin to specific commit SHAs.

### 7.5 Low: Remove Legacy Files

- [ ] Delete `deploy-gh-pages.sh` — Travis CI script, no longer used.
- [ ] Delete or update `.babelrc` — may be unused since the Vite migration (only needed for Jest).
- [ ] Clean up `examples/README.md` or update the links.

### 7.6 Low: Convert Test Files to TypeScript

All test files are `.js`. Converting to `.ts`/`.tsx` would:
- Catch type errors in test assertions.
- Ensure test fixtures match actual prop types.
- Align with the TypeScript source.

---

## 8. Community & Project Health

### 8.1 High: Triage Open Issues

20 open issues with **zero labels applied**. Users cannot filter by bug/feature/help-wanted:

- [ ] Add labels (`bug`, `enhancement`, `question`, `good first issue`, `breaking change`, `documentation`) to all 20 open issues.
- [ ] Close stale issues that are no longer reproducible.
- [ ] Respond to issues with known workarounds.

Key issue themes to address:
- **Build/bundling** (#974, #971, #947, #939) — CSS import paths, Webpack compatibility.
- **Scroll/zoom** (#975, #955, #929, #918, #907) — scroll speed, Safari, drag-scroll.
- **Date/time** (#983, #969, #949, #956) — timezone, month offset, infinite loop.
- **Events** (#970, #900) — custom renderer breaking event propagation.

### 8.2 High: Review Stale Pull Requests

8 community PRs open from 2022-2025 with no review activity:

- [ ] Review and merge, request changes, or close with explanation.
- [ ] Notable: PR #961 (custom timescale) and PR #898 (item collision event) add real value.
- [ ] PR #896 (parentNode null check) fixes a reported bug (#900).

### 8.3 Medium: Fix CONTRIBUTING.md Branch Reference

CONTRIBUTING.md line 16 says to target `master` branch, but the default branch is `main`:

- [ ] Update to reference `main`.

### 8.4 Medium: Fill CHANGELOG Gaps

Package is at `beta.6` but the CHANGELOG jumps from `beta` to `beta.4`. Intermediate releases are undocumented:

- [ ] Backfill changelog entries for all published beta versions.
- [ ] Consider adopting Conventional Commits for automated changelog generation.

### 8.5 Low: Set Up a Deployed Demo

- [ ] Deploy the Vite demo app to GitHub Pages, Vercel, or Netlify.
- [ ] Link from the README so users can try the library without installing.

---

## Priority Summary

### P0 — Blocking for Production

| # | Item | Section |
|---|------|---------|
| 1 | **Migrate test files from `moment` to `dayjs`** (9 files, blocks all test improvements) | 0.1 |
| 2 | **Migrate test files from Enzyme to React Testing Library** (7 files, blocks re-enabling tests) | 0.2 |
| 3 | Fix interact.js memory leak (Item unmount cleanup) | 4.2 |
| 4 | Fix `composeEvents` unconditional `preventDefault` | 4.3 |
| 5 | Add zero-division guards in coordinate calculations | 3.6 |
| 6 | Fix selected item color contrast (WCAG AA fail) | 2.6 |
| 7 | Update README for v0.30 (moment→dayjs, CSS paths, React 18) | 6.1 |

### P1 — High Impact

| # | Item | Section |
|---|------|---------|
| 8 | Update README/docs/examples `moment` references to `dayjs` | 0.4 |
| 9 | Add Item.tsx tests (most complex component, zero tests) | 1.2 |
| 10 | Re-enable disabled test suites | 1.1 |
| 11 | Fix TypeScript types (optional props, remove `any`) | 3.1 |
| 12 | Add basic ARIA attributes to interactive elements | 2.1 |
| 13 | Add keyboard navigation | 2.2 |
| 14 | Write v0.28→v0.30 migration guide | 6.2 |
| 15 | Standardize callback parameter order | 3.3 |
| 16 | Triage open issues and stale PRs | 8.1, 8.2 |
| 17 | Memoize expensive calculations during drag | 5.1 |

### P2 — Medium Impact

| # | Item | Section |
|---|------|---------|
| 18 | Migrate class components to function components | 4.1 |
| 19 | Replace `element-resize-detector` with `ResizeObserver` | 4.4 |
| 20 | Add screen reader announcements | 2.5 |
| 21 | Add E2E tests | 1.5 |
| 22 | Support generic item/group types | 3.2 |
| 23 | Throttle drag/resize state updates | 5.2 |
| 24 | Upgrade Vite to resolve advisory | 7.1 |
| 25 | Add Storybook | 6.6 |
| 26 | Add RTL support | 2.7 |
| 27 | Fix `lint:fix` script | 7.2 |
| 28 | Add test coverage to CI | 7.3 |

### P3 — Low Impact / Nice-to-Have

| # | Item | Section |
|---|------|---------|
| 29 | Add `readOnly`, `disableZoom` props | 3.5 |
| 30 | Extract custom hooks | 4.6 |
| 31 | Virtual scrolling for large datasets | 5.4 |
| 32 | Remove legacy files | 7.5 |
| 33 | Convert tests to TypeScript | 7.6 |
| 34 | Deploy demo site | 8.5 |
| 35 | Reduced motion support | 2.8 |
