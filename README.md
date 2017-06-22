# Introduction
[![Build Status](https://travis-ci.org/dashawk/angular-text-to-image.svg?branch=master)](https://travis-ci.org/dashawk/angular-text-to-image)

Angular directive to convert any text into an image.

*Need Contributors.*

## Installation

To install, run:
```cli
bower install angular-text-to-image --save
```
then add `jmp.textToImage` as dependency:
```javascript
(function () {
    'use strict';

    angular.module('mgApp', ['jmp.textToImage']);
    ...
```

## Usage

You can use this directive like this:

```html
<div class="container">
    <text-to-image options="options"></text-to-image>

    <button class="btn" ng-click="getOutput()">Get Data</button>
</div>
```

and in your controller:
```javascript
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('testController', function ($scope) {
            $scope.options = {
                text: 'The Quick Brown Fox',
                fontSize: 37,
                width: 200,
                height: 100,
                textLeft: 0,
                textTop: 0,
                fontFamily: 'Mr De Haviland, cursive'
            };
            $scope.getOutput = function () {
                var output = $scope.options.getData();

                console.log('Output', output);
            };
        });
}());
```
## License

This project is licensed under the terms of the MIT license.
