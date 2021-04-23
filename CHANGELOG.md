# Change Log

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

<!-- Template
## [1.0.0] - Title

Description

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

-------------------------------------------------
The format is based on [Keep a Changelog](http://keepachangelog.com/)
-->
