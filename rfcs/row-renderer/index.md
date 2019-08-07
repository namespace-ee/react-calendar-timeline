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
- maybe? move to faster transofrm posioning instead of absolute postining which is faster and can be animated

# Detailed design

This is the bulk of the RFC. Explain the design in enough detail for somebody
familiar with React to understand, and for somebody familiar with the
implementation to implement. This should get into specifics and corner-cases,
and include examples of how the feature is used. Any new terminology should be
defined here.

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

- keep the plugin system

# Adoption strategy

If we implement this proposal, how will existing React developers adopt it? Is
this a breaking change? Can we write a codemod? Should we coordinate with
other projects or libraries?

# How we teach this

- examples
- documentations

# issues to be resolved


# Unresolved questions

Optional, but suggested for first drafts. What parts of the design are still
TBD?