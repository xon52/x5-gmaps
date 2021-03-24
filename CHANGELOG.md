# Change Log
All notable changes to this project will be documented in this file.

## [0.4.0] - Typescript support

### Summary

A major upgrade to include Typescript support. While there should be no noticeable change for anyone not using Typescript, almost every line of the entire library had to be rewritten 😣

- [TYPESCRIPT Support](https://www.typescriptlang.org/)
  Requested by @mheob [here](https://github.com/xon52/x5-gmaps/issues/3)

### Added
- Declaration files and types for Typescript support

### Changed
- Library now uses the `@Component` format of Vue 2 which is needed for Typescript
- Some internal scripts for generating the library and documentation
- Almost every single line of code in the library (good luck tracking changes 😥)

### TODO
- Update [README](https://github.com/xon52/x5-gmaps/blob/master/README.md)

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