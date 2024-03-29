# Change Log

## [0.7.6] - Bug fix for "appropriate loader" error
## [0.7.5] - Package updates
## [0.7.4] - Package updates
## [0.7.3] - Package updates and properly committed package.json changes
## [0.7.2] - Separated repo docs into new branch, and small typo for errors
## [0.7.1] - Package updates and removed optional chaining use
## [0.7.0] - Updated way maps API is loaded and added additional plugin options:
 - version _string_
 - language _string_
 - region _string_
 - callback _() => any_

## [0.6.3] - HOTFIX: extendBounds error
## [0.6.2] - Added drag, dragend, dragstart events to marker component
## [0.6.1] - Added ZoomOnClick property to cluster component
## [0.6.0] - Updated to Webpack ^5 w/ other dev-dependency updates

## [0.5.9]
- Fixed: Cluster zoom wasn't zooming in when was max zoomed out
- Changed: Cluster refresh event from bounds_changed to idle
- Changed: Cluster refresh logic to be more efficient
## [0.5.8] - Added options property for cluster marker, some typescript fixes
## [0.5.7] - Added idle event for map component, some typescript fixes
## [0.5.6] - Enhanced cluster marker options, various typescript related udpates changes
## [0.5.5] - Fixed broken update
## [0.5.4] - Fixed dependencies mistake, polygon changedPath event, cluster component error
## [0.5.3] - Replaced Window with GlobalThis
## [0.5.2] - Added clustering component
## [0.5.1] - Fix for circle center change not registering
## [0.5.0] - Rollup & VuePress
- Replaced: Single README file with [VuePress](https://vuepress.vuejs.org/) docs
- Changed: Build tool from Webpack to Rollup
- Moved (S)CSS for components into each Vue file instead of combining and importing a single CSS file

## [0.4.2] - Fix for map breaking if loaded immediately
## [0.4.1] - Data Component for GeoJSON support
- Added: `GmapsData` and `GmapsDataGeoJson` components to include GeoJSON data
- Added: Demo examples and README section for GeoJSON support
- Added: `sensitivity` prop for `GmapsCircle` and `GmapsRectangle` components
- Fixed: `GmapsMap` error not displaying when a child component had an error
- Changed: Replaced _.vue_ files with _.ts_ where there was no `<template>` to render
## [0.4.0] - Typescript support
- Added: Declaration files and types for Typescript support
- Changed: Library now uses the `@Component` format of Vue 2 which is needed for Typescript
- Changed: Some internal scripts for generating the library and documentation
- Changed: Almost every single line of code in the library (good luck tracking changes 😥)
