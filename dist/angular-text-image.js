(function () {
	'use strict';
	
	angular
		.module('textToImage', [])
		.directive('textToImage', function ($compile, $timeout) {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					options: '=?'
				},
				link: function (scope, element, attrs) {
					var options = {
						text: '',
						textAlign: 'center',
						textLeft: 50,
						textTop: 50,
						fontSize: 30,
						width: 100,
						height: 100,
						fontFamily: 'sans-serif'
					};
					var canvas = angular.element('<canvas />');
					var context = canvas[0].getContext('2d');
					var imgEmpty = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAADcCAQAAADXNhPAAAACIklEQVR42u3UIQEAAAzDsM+/6UsYG0okFDQHMBIJAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcCQADAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDkQAwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAegeayZAN3dLgwnAAAAAElFTkSuQmCC';
					
					scope.updateDataUrl = updateDataUrl;
					scope.getData = getData;
					scope.init = init;
					
					scope.options = angular.extend(options, scope.options);
					scope.options.getData = scope.getData;
					canvas[0].width = parseInt(scope.options.width, 10);
					canvas[0].height = parseInt(scope.options.height, 10);
					
					scope.$watch('options', function (data) {
						if (data) {
							$timeout(function () {
								init();
							});
						}
					});
					
					function updateDataUrl(dataUrl) {
						$timeout(function () {
							scope.options.dataUrl = !scope.options.text ? imgEmpty : dataUrl;
						});
					}
					
					function getData() {
						return {
							isEmpty: scope.options.text === '' || !scope.options.text,
							data: scope.options.dataUrl
						}
					}
					function init() {
						context.font = scope.options.fontSize + 'px ' + scope.options.fontFamily;
						context.textAlign = scope.options.textAlign;
						canvas.textBaseline = 'middle';
						context.fillStyle = 'black';
						context.lineWidth = 2;
						
						context.translate(100, 50);
						context.fillText(scope.options.text, scope.options.textLeft, scope.options.textTop);
						
						//scope.options.dataUrl = canvas[0].toDataURL('image/png');
						scope.updateDataUrl(canvas[0].toDataURL('image/png'));
						
						element.append(canvas);
						$compile(canvas)(scope);
					}
				}
			};
		});
	
}());