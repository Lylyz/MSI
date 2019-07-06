app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal,$rootScope, toastr, $loadingOverlay){
				var chartDataModel = {
						nodes: [
							{
								name: "Solicitud de Tasa",
								id: 0,
								x: 0,
								y: 0,
								outputConnectors: [
									{
										name: "A",
									},
									{
										name: "B",
									}
								],
							},

							{
								name: "Example Node 2",
								id: 1,
								x: 400,
								y: 200,
								inputConnectors: [
									{
										name: "A",
									},
									{
										name: "B",
									},
									{
										name: "C",
									},
								],
								outputConnectors: [
									{
										name: "A",
									},
									{
										name: "B",
									},
									{
										name: "C",
									},
								],
							},

						],

						connections: [
							{
								source: {
									nodeID: 0,
									connectorIndex: 1,
								},

								dest: {
									nodeID: 1,
									connectorIndex: 2,
								},
							},


						]
					};
				$scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);
			});