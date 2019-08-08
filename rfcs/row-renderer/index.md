# Summary

Brief explanation of the feature.

# Basic example

If the proposal involves a new or changed API, include a basic code example.
Omit this section if it's not applicable.

# Motivation

- get rid of extra of the whole calendar when we move an item
- add custom layers like unavailable slots, drag and drop into the calendar and gantt.
- get rid of the top postion of the item be based on the whole calendar part not per row
- enable row virtual scrolling
- hide implementation details
- remove plugin system (undocumented)
- more test coverage 
- inversion of control (solve a lot of issues with examples rather than adding code into the library)
- maybe? move to faster transofrm posioning instead of absolute positioning which is faster and can be animated

# Detailed design

<!-- This is the bulk of the RFC. Explain the design in enough detail for somebody
familiar with React to understand, and for somebody familiar with the
implementation to implement. This should get into specifics and corner-cases,
and include examples of how the feature is used. Any new terminology should be
defined here. -->

This RFC will change how we render the *calendar* part of the component.

_*Old approach*_

The old apporach deals with The calendar part as a group of layers postioned on top of each other using absolute positioning to place items, rows and rows using `top` and `left` properties with relative to the whole calendar `div`

```
<Calendar>
    <Columns/>
    <Rows/>
    <Items/>
</Calendar>
```

_*New approach*_

The new approach with `rowRenderers` here would split the Calendar part to rows instead of layers and each row here would consist of an item layer, colums layer and any other layer the user would like to add. This will make the postining of the layers relative to the row `div` and not the whole calendar `div`.

```
<Calendar>
    <FirstRow>
        <RowItems/>
        <Columns/>
    </FirstRow>
</Calendar>
```

## API

I will be presenting different approaches here of how would we implement the `rowRendererProp`

_please not that both approaches would give helper methods for calculating postions like `getXPostionFromTime`, `getTimeFromXPostion` and `getItemAbslouteLocation`_

### Prop getters

```
<Timeline
    rowRenderer={({getRootProps, itemLayer, columnLayer, getXPostionFromTime, getTimeFromXPostion, getItemAbslouteLocation})=>{
        <div {...getRootProps()}>
            {itemLayer}
            {columnLayer}
            <div>
                droppable layer
            </div>
        </div>
    }}
/>
```

### Compostion

```
<Timeline
    rowRenderer={({getRootProps, getItemsLayerProps, getColumnsLayerProps, getXPostionFromTime, getTimeFromXPostion, getItemAbslouteLocation})=>{
        <div {...getRootProps()}>
            <Items {...getItemsLayerProps()}>
            <Columns {...getColumnsLayerProps()}>
            <Layer getLayerProps>droppable aread</Layer>
        </div>
    }}
/>
```

## Use cases 
- Drag and drop from outside to the calendar to inside (specific target or anywhere in the row).
- Placeholder Items thought the scheduler.
- Gantt.

# Drawbacks

- huge code change
- changes the mental image of how the library renders
- need a lot of testing
- removes plugins
- might have some issues aligning everything espically vertical lines
- remove some props (TODO: get the props which will change)
- add complixity to library usage for custom changes
- render vertical components that could cover more than 1 row
- added layers might block some actions

There are tradeoffs to choosing any path. Attempt to identify them here.

# Alternatives

- keep the plugin system (undocumented)

# Adoption strategy

<!-- If we implement this proposal, how will existing React developers adopt it? Is
this a breaking change? Can we write a codemod? Should we coordinate with
other projects or libraries? -->

- Documentation on the new features
- Codesandox examples
- Migration guide

<!-- # How we teach this

What names and terminology work best for these concepts and why? How is this
idea best presented? As a continuation of existing React patterns?

- Documentation on the new features
- Codesandox examples
- Migration guide -->

# Issues to be resolved

- [#623](https://github.com/namespace-ee/react-calendar-timeline/issues/623)
- [#338](https://github.com/namespace-ee/react-calendar-timeline/issues/338)
- [#156](https://github.com/namespace-ee/react-calendar-timeline/issues/156)

# Unresolved questions

Optional, but suggested for first drafts. What parts of the design are still
TBD?