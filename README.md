# ng-charts
[![npm version](https://badge.fury.io/js/%40yarz-tech%2Fng-charts.svg)](https://badge.fury.io/js/%40yarz-tech%2Fng-charts)

Excel quality charts integrated with Angular!

All the Excel Chart properties you're used to fully integrated with Angular.  We looked at some of the most popular features in customizing an Excel chart and put them into action.  If you're familiar with Excel Charts, this should be a piece of cake (we even used the same naming convention).  Charts are FULLY customizable.  You can literally change any feature you want!

## Features
### General
- Full Angular Integration
- Uses d3 to display nearly everything
- Strongly typed
- Multiple types of Series on one plot
- Multiple Y Axes
- Customize EVERYTHING!
- Latest version of Angular

### Chart Types
- Area
- Line
- Scatter
- Area/Line/Scatter

For more combinations, just ask!

### Customization
- Color, thickness, and dash are customizable for EVERY object.
- Show/Hide functionality for all objects.
- Custom spacing of all objects.

For more information check out the following sources:
- [Demo](https://yarz-tech.github.io/ng-charts/)
- [GitHub](https://github.com/yarz-tech/ng-charts)
- [npm](https://www.npmjs.com/package/@yarz-tech/ng-charts) 

## Update History

### 0.1.2 (3/18/2019)
- Features Added
  - You can now extend the Point/Scatter Point classes to show additional data in the tooltips.  See docs for more details.
- Bug Fixes
  - [Issue 3](https://github.com/yarz-tech/ng-charts/issues/3)
  - [Issue 4](https://github.com/yarz-tech/ng-charts/issues/4) This is hard to test so hopefully this will fix it.
  - [Issue 5](https://github.com/yarz-tech/ng-charts/issues/5)
  - [Issue 6](https://github.com/yarz-tech/ng-charts/issues/6)


### 0.1.1 (2/28/2019)
- Features Added
  - None
- Bug Fixes
  -[Issue #2](https://github.com/yarz-tech/ng-charts/issues/2)

### 0.1.0 (2/25/2019)
- Features Added
  - Added Hover Overs (customizable)
  - Added ability to reverse axis
  - Added proper updating when inputs change
- Bug Fixes
  - None

### 0.0.10 (2/4/2019)
- Features Added
  - None
- Bug Fixes
  - More error handling for X Scale.

### 0.0.9 (2/4/2019)
Didn't compile...

### 0.0.8 (2/4/2019)
- Features Added
  - None
- Bug Fixes
  - Added some error handling if user passes in series without any data.

### 0.0.7 (2/1/2019)
- Features Added
  - None
- Bug Fixes
  - Fixed Lines becoming path issue.

### 0.0.6 (1/31/2019)
- Features Added
  - None
- Bug Fixes
  - Removed Browser Module import from library.

### 0.0.5 (1/31/2019)
- Features Added
  - None
- Bug Fixes
  - Changed type of Min and Max in Axis class from number to any.  Y Axis should only be number, X Axis can be any.

### 0.0.4 (1/31/2019)
Added Area-Line-Scatter Chart.  Fixed some legend issues.
