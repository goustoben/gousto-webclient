# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# Template (please copy this)

Keep in mind that new releases go at the top of the changelog file.

## [x.x.x] - YYYY-MM-DD

### Added

-

### Changed

-

### Removed

-

### Fixed

-

# Releases

## [11.7.7] - 2021-11-05
### Changed
- Replaced AxiForma fonts `.otf` extensions with `.woff2`

## [11.7.6] - 2021-09-29
### Fixed
- fixed disabled style for InputCheck
- fixed padding for InfoTip

## [11.7.5] - 2021-09-21
### Changed
- Extended InfoTip component to add lightGrey style

## [11.7.4] - 2021-09-13
### Added
- Added a className prop to the Card component. So the borders can be removed when necessary if this is something that only the client of this component (in this case Webclient) knows.

## [11.7.3] - 2021-09-03
### Changed
- Changed the breakpoint used in Card and LayoutPageWrapper so it is not a legacy one

## [11.7.2] - 2021-08-19
### Fixed
- Hidden the default dropdown arrow on the legacyDropdown component
## [11.7.1] - 2021-07-19
### Fixed
- Use `visibility` css property instead of `hidden` html attribute in order to allow animations work correctly
## [11.7.0] - 2021-07-19
### Fixed
- Add `hidden` attribute to the Expandable section when it's not visible to improve accessibility with screen readers
## [11.6.0] - 2021-06-22
### Fixed
- `OrderDetails` and `ModalStoryWrapper`: use Fragment instead of shorthand ( in order to be supported in webclient)
## [11.5.0] - 2021-05-10

### Added

- Add the `OrderDetails` component

## [11.4.2] - 2021-05-07

### Fixed

- Fix usage of utils CSS variables by decoupling them from the file importing normalize.css ( in order to be supported in webclient)

## [11.4.1] - 2021-05-07

### Fixed

- Remove the usage of `?.` ( in order to be supported in webclient)

## [11.4.0] - 2021-05-07
### Fixed
- Use Fragment instead of shorthand for fragments ( in order to be supported in webclient)
## [11.3.3] - 2021-05-07

### Changed

- Extend the <InputRadio> component so
  - it gets ariaLabel property to improve accessibility

## [11.3.1] - 2021-05-05

### Changed

- Extend the `<Card>` component so
  - it has a border by default
  - we can remove the lelft and right border in small screens
  - we can remove the vertical padding

### Fixed

- Default flag prop `isLinkStyled` in `<Item>` to `true` instead of `false` so it is retrocompatible.

## [11.3.1] - 2021-05-04

### Changed

- Extend the `<Item>` component we can
  - style the text as is not a link (black instead of blue)
  - add a subtext
  - add an icon
  - use an href prop so it renders like an `<a>` instead of as a `<div>`
- Remove the `<Item>` component from Legacy folder in the docs

## [11.3.0] - 2021-04-30

### Added

- Add the `ListItem` component, which allow us to have a standard way of wrapping Items.

## [11.2.8] - 2021-04-28

### Added

- `Header` and `Footer` now track click in the Help link when a flag prop is passed

## [11.2.7] - 2021-04-27

### Added

- Typography: introduce new classes for buttons

## [11.2.6] - 2021-04-22

### Fixed

- Package-lock version mismatch

## [11.2.5] - 2021-04-22

### Added

- `Button` now passes the data-testing prop through to the spinner, using the format `${dataTesting}Spinner`

## [11.2.4] - 2021-04-21

### Fixed

- `Footer` was pointing to the same place for Terms of Website and Terms of Sales. A new link has been added that points to the missing page.

## [11.2.3] - 2021-02-23

### Added

- `CookieBanner` has the prop `onCookieBannerDismissed` that's invoked when the
  user clicks "Agree". Useful to trigger an app-specific behavior in response.
- `RecipeCard`: `rating` is now optional

## [11.2.2] - 2021-02-01

### Added

- Animation for `InputCheck` component
- Animation for `InputRadio` component

## [11.2.1] - 2020-12-21

### Fixed

- `RecipeCard` hover state: shadow is now softer, matching the one in the menu

## [11.2.0] - 2020-12-16

### Added

- `Breadcrumbs` has the prop `renderLinkItem` that's used to render a link
  item. Useful for rendering a react-router `Link` to avoid page refresh on
  navigation.
- `RecipeCard` has the prop `fitHeight`: when true, the card fills the
  container's height. Useful to align the bottoms of cards when they're placed
  in a row.
- `RecipeCard` has the prop `hasMargin`: when off, then the default margin is
  not applied. Useful to control the layout from outside.
- `RecipeCard` has the prop `hasRectangularImageOnMobile`: when true, on the
  mobile-size screens the image has the rectangular aspect ratio. Useful to
  ease the stress on the scrolling finger when many cards are placed
  vertically.

### Fixed

- `ExpandableSections`'s chevron is now blue
- `Breadcrumbs`' links are now bold
- `TimeIndicator`'s numbers are now vertically centered within the circle
- `MetaInfo`'s icon is now vertically centered with the text
- `RecipeCard`'s hover effect now underlines the recipe title in addition to
  setting border and shadow
- `RecipeCard`'s resizable behavior is more predictable: it doesn't assume any
  sizes and fills the parent's width
- `Dropdown`'s current value font size is defined explicitly so that when
  included in certain consumers, the text doesn't become smaller

## [11.1.1] - 2020-12-11
### Fixed

- Fix `Modal` z-index and click outside bug

## [11.1.0] - 2020-11-30

### Added

- `NavDropdown`: visually a `Dropdown`, but renders a list of links so that
  search engines have an easier time crawling them

### Changed

- `Dropdown` always renders the items (hiding via `display: none` when
  collapsed). This allows contents to be crawled better.  A bonus user-visible
  change is that the mobile `Dropdown` now animates the modal on expanding.
- The options in the mobile `Dropdown`'s modal now take the whole screen height
  (the `max-height` is now for the desktop `Dropdown` instead of applied on
  `BreakpointFromMedium` media query); this looks better on the tablet screen
  sizes.
- Technical: when a story requires a `js` file, this file should be named
  `Foo.storyContainer.js` because the naming `Foo.story.js` leads to displaying
  a non-actionable warning.

### Fixed

- `Modal` now adds the global event listener only when needed (i.e. on
  opening), and cleans up after itself: this prevents crashes after clicking on
  pages that include a `Modal` in certain circumstances.
- Technical: when running Jest after a local build, Jest doesn't look into the
  `dist` directory and doesn't crash as a result.

## [11.0.1] - 2020-11-25

### Fixed

- `Dropdown` and `ExpandableSection` can now be imported in the client apps
  correctly, because
  - the referenced `svg` files are bundled by the build system, *and*
  - a value is no longer referenced with a relative path that breaks due to
    flattening of the directory structure

## [11.0.0] - 2020-11-24

### Changed

- BREAKING: the `media` prop of `RecipeCard` is now an array of `{ url, width
  }` instead of an array of `{ src, width }`
- An `imageUtils` module is exported at `dist`, that has `transformSrcSet`
  utility to convert from an array of `{ url, width }` to a string suitable for
  passing to `<img srcset={...} />`
- `RecipeCard`:
  - When a recipe has no reviews then `Rating` component won't be rendered
  - Add option `hasHoverEffect`: when true, the card will have a gray border
    and shadow when hovered: useful for embedding in links

## [10.7.2] - 2020-11-24

### Fixed

- Reinstated erroneously removed `normalize.css` - needed for projects other than webclient

## [10.7.1] - 2020-11-25

### Changed

- Updated `MetaInfo` styles and icons

## [10.7.0] - 2020-11-24

### Added

- Added `allowOverflow` prop to `ExpandableSection`

### Fixed

- Fixed build error in webclient - removed css import of non-existent `normalize.css`


## [10.6.0] - 2020-11-20

### Added

- Create canary git tag on pull request creation

## [10.5.0] - 2020-11-20

### Added

- Add option `small-screen-only` to `isFullscreen` prop of `CTA` component

### Changed

- Make `MetaInfo` component inline
- Make `Rating` component inline

## [10.4.0] - 2020-11-20

### Added

- Add `ExpandingText` component

## [10.3.0] - 2020-11-19

### Added

- Optional `paddingSize` prop for `Card` - to switch padding between 1rem
  (`"large"` - default) to 1rem on mobile / 2rem on tablet and up
  (`"large/xlarge"`)
- Additional value `large/xlarge` to the `paddingHorizontalSize` and
  `paddingVerticalSize` props of `LayoutContentWrapper` - to set paddings in
  the same way


## [10.2.0] - 2020-11-18

### Added

- Optional `withOverlay` prop for `Modal` - renders translucent overlay


## [10.1.0] - 2020-11-18

### Added

- Add `MetaInfo` component
- Add `Cuisine` component

### Changed

- `CookingTime` is now HOC of `MetaInfo`

## [10.0.0] - 2020-11-12

### Added

- Add `Dropdown` component
- Add `useClickOutside` hook and `renderHook` testing util (not currently exported pending discussion)

### Deprecated

- BREAKING - Deprecated legacy `Dropdown`, re-exported as `LegacyDropdown`

## [9.11.0] - 2020-11-17

### Added

- Add `RadioGroup` component

### Changed

- `InputRadio` now has disabled & variant fields

## [9.10.0] - 2020-11-16

### Added

- Added optional `onExpand` callback to `ExpandableSection`
- Optionally pass function as child of `ExpandableSection`, allows collapse from child component
- `aria-hidden` attribute to child container of `ExpandableSection`

### Fixed

- Removed focus outline from `ExpandableSection` button

## [9.9.0] - 2020-11-13

### Added
- Add `ScrollCarousel` component

## [9.8.0] - 2020-11-13

### Added
- add `ExpandableSection` component

## [9.7.0] - 2020-11-11

### Added
- Add `Breadcrumbs` component

## [9.6.4] - 2020-11-13

### Fixed

- Fix class name padding for Column component

## [9.6.3] - 2020-11-12

### Changed

- Add extra classes for padding for each screen size for Column component

## [9.6.2] - 2020-11-12

### Fixed

- Fix opening Storybook

## [9.6.1] - 2020-11-11

### Fixed

- Add testingSelector prop for LayoutPageWrapper
- Fix medium and large style for LayoutPageWrapper

## [9.6.0] - 2020-11-10

### Added

- Add `Grid` and `Column` components
- Add size prop (one of large or medium with default to large) for LayoutPageWrapper

## [9.5.0] - 2020-11-10

### Added

- Add `RecipeCard` component

## [9.4.0] - 2020-11-09

### Added

- `bottomSheet` variant for `Modal` component

## [9.3.0] - 2020-11-09

### Added

- Add `TimeIndicator` component

## [9.2.0] - 2020-11-03

### Added

- Add `Rating` component

## [9.1.0] - 2020-11-02

### Added

- add `CookingTime` component

## [9.0.8] - 2020-10-28

### Fixed

- `Modal` - floating variant container breakpoint for tablet

## [9.0.7] - 2020-10-23

### Changed

- `InputCheck` padding adjustment

## [9.0.6] - 2020-10-23

### Fixed

- ModalBody.module.css was importing a value from a different CSS file that was not part of styles or design-language. When building the distribution, the path would fail as the directories get flatten

## [9.0.5] - 2020-10-19

### Fixed

- `CTA` disabled hover state

## [9.0.4] - 2020-10-16

### Changed

- `Modal` - adjusted styles of close icon to accommodate background image
- `CTA` - adjust `disabled` styles to align with new design system

## [9.0.3] - 2020-10-16

### Fixed

- `InputCheck` - Font weight improvements
- `InputCheck` - Fix testing selector

## [9.0.2] - 2020-10-15

### Fixed

- `InputCheck` - `!important` font weight to override bootstrap

## [9.0.1] - 2020-10-15

### Added

- `InputCheck` testingSelector prop

### Fixed

- `InputCheck` style inconsistency when implemented in webclient. Caused by difference in body font size

## [9.0.0] - 2020-10-14

### Added

- `InputCheck` disabled flag - we can now disable the checkboxes from the parent app. Automatically unchecks the box when disabling dynamically.
- `InputCheck` type flag - we now have a default and a tile type to choose from

### Changed

- `InputCheck` isChecked - now called defaultValue
- `InputCheck` design changes - small design changes to be more inline with our new design system
- `InputCheck` legacy state - moved out of legacy state as now inline with design system

## [8.3.0] - 2020-09-30

### Added

- New "floating" variant to `Modal`

### Changed

- `Modal` story - added more knobs

### Fixed

- _Hopefully_ fixes svg import issue with `Modal`

## [8.2.3] - 2020-09-28

### Changed

- `<InputField>` - validation now occurs on `onChange` as opposed to `onBlur` - this is an **interim fix** to resolve issues with submitting forms on keypress not invoking `onBlur` which skips validation

### Fixed

- `<InputField>` - remove Firefox native form styles (was implementing a red box shadow for invalid inputs)
- `<InputField>` - resolve alignment issue with phone number prefix

## [8.2.2] - 2020-09-28

### Added

- `<InputRadio>` - the whole component is now rendered as a `<label>`, allowing
  the clicks in the padding to register as an intent to select this radio
  button. Leads to better experience when the radio button is a child of a
  bordered component, and improves accessibility by making a button's clickable
  area larger.

## [8.2.1] - 2020-09-14

### Fixed

- `<Modal>` - use `<img>` tag as opposed to direct `<svg>` render

## [8.2.0] - 2020-09-07

### Added

- add `value` as part of the `<InputField />` prop

## [8.1.0] - 2020-09-07

### Added

- `<Modal>`, `<ModalHeader>` and `<ModalBody>`

## [8.0.3] - 2020-09-07

### Added

- add lint-stage file to prevent linting errors being commited

## [8.0.2] - 2020-09-07

### Added

- add CHANGELOG.md file to GitHub pages when Zest is deployed

## [8.0.1] - 2020-09-07

### Added

- add DangerJS rule for PR to throw a warning when the versions are not bumped incrementally (e.g. 1.2.3 to 1.2.5 instead of 1.2.4)

## [8.0.0] - 2020-09-04

### Changed

- Rename onChange prop name to onUpdate `<InputField />`
- Move input validation to happen on blur event
- Add isValid parameter as part of onUpdate callback

## [7.4.0] - 2020-09-03

### Added

- Add data-testing prop to `<InputField />`

## [7.3.0] - 2020-09-03

### Changed

- `<InputField />` now provides the input value + id (once it's passed validation) to the parent

## [7.2.1] - 2020-08-27

### Added

- add DangerJS rule for PR to fail if package.json was not modified

## [7.2.0] - 2020-08-25

### Added

- add `Input` component

## [7.1.6] - 2020-08-17

### Added

- add [DangerJS](https://danger.systems) to the project

## [7.1.5] - 2020-08-13

### Added

- CHANGELOG.md file to track changes to the project
- generate index.js file in `dist` for easier importing of components
