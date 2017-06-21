(function () {
	'use strict';
	
	angular
		.module('textToImage', [])
		.directive('textToImage', function ($compile) {
			return {
				restrict: 'E',
				replace: true,
				link: function (scope, element, attrs) {
					var canvas = angular.element('<canvas />');
					var context = canvas[0].getContext('2d');
					var width = canvas.width;
					var height = canvas.height;
					
					context.font = '37px Mr De Haviland, cursive';
					context.textAlign = 'center';
					canvas.textBaseline = 'middle';
					context.fillStyle = 'black';
					context.lineWidth = 2;
					
					context.translate(100, 50);
					context.fillText('Sample text', 0, 0);
					
					element.append(canvas);
					var image = new Image();
					image.onload = function () {
						element.append(image);
					};
					image.src = canvas[0].toDataURL('image/png');
					console.log(image.src);
					$compile(canvas)(scope);
				}
			};
		});
	
}());
