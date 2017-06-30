(function () {
	'use strict';
	
	TextToImageDirective.$inject = ["$timeout"];
	angular
		.module('jmp.textToImage', [])
		.directive('textToImage', TextToImageDirective);
	
	/* @ngInject */
	function TextToImageDirective($timeout) {
		return {
			restrict: 'E',
			replace: true,
			require: 'ngModel',
			template: [
				'<div class="text-to-image-directive" ng-style="{\'font-family\': options.fontFamily }">',
					'<canvas class="text-to-image"></canvas>',
				'</div>'
			].join('\r\n'),
			scope: {
				options: '=?',
				output: '=?'
			},
			link: function (scope, element, attrs, ngModel) {
				if (!ngModel) {
					return;
				}
				var options = {
					text: '',
					textColor: 'black',
					textAlign: 'center',
					textLeft: 50,
					textTop: 50,
					fontSize: 30,
					width: 100,
					height: 100,
					fontFamily: 'sans-serif'
				};

				var canvas = element.find('canvas');
				var context = canvas[0].getContext('2d');
				var imgEmpty = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAADcCAQAAADXNhPAAAACIklEQVR42u3UIQEAAAzDsM+/6UsYG0okFDQHMBIJAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcCQADAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDkQAwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAegeayZAN3dLgwnAAAAAElFTkSuQmCC';
				
				scope.updateDataUrl = updateDataUrl;
				scope.output = output;
				scope.init = init;
				
				scope.options = angular.extend(options, scope.options);
				
				scope.$watch('options', function (data) {
					if (data) {
						$timeout(function () {
							init();
						});
					}
				});
				
				scope.$on('$destroy', destroy);
				
				function destroy() {
					element.find('canvas').remove();
					canvas = null;
				}
				function updateDataUrl(dataUrl) {
					scope.$apply(function () {
						scope.dataUrl = !scope.options.text ? imgEmpty : dataUrl;
						ngModel.$setViewValue(scope.dataUrl);
					});
				}
				
				function output() {
					return {
						isEmpty: scope.options.text === '' || !scope.options.text,
						dataUrl: scope.dataUrl
					}
				}
				function init() {
					canvas[0].width = parseInt(scope.options.width, 10);
					canvas[0].height = parseInt(scope.options.height, 10);
					
					context.font = scope.options.fontSize + 'px ' + scope.options.fontFamily;
					context.textAlign = scope.options.textAlign;
					canvas.textBaseline = 'middle';
					context.fillStyle = scope.options.textColor;
					context.lineWidth = 2;
					
					context.clearRect(0, 0, canvas[0].width, canvas[0].height);
					context.translate(100, 50);
					context.fillText(scope.options.text, scope.options.textLeft, scope.options.textTop);
					
					scope.updateDataUrl(canvas[0].toDataURL('image/png'));
					
					//var img = new Image();
					//
					//img.onload = function () {
					//	element.append(img);
					//};
					//
					//img.src = canvas[0].toDataURL('image/png');
					
					//$compile(canvas)(scope);
					//element.append(canvas);
				}
			}
		};
	}
}());
