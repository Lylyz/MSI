app.service('CalculoModalService', ['$uibModal','$http',
	function ($uibModal,$http) {
		var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta('_ctx')+'private/validacion-tasas/calculo-modal.html',
	        size: 'lg'
	    };
	    
	    var modalOptions = {
	        closeButtonText: 'Cancelar',
	        actionButtonText: 'Continuar',
	        headerText: 'Confirmar',
	        bodyText: 'Confirme la accion?',
	        modo : "VIEW"
	    };
	    
	    this.showModal = function (customModalDefaults, customModalOptions) {
	        if (!customModalDefaults) customModalDefaults = {};
	        customModalDefaults.backdrop = 'static';
	        return this.show(customModalDefaults, customModalOptions);
	    };
	    
	    this.show = function (customModalDefaults, customModalOptions) {
	        //Create temp objects to work with since we're in a singleton service
	        var tempModalDefaults = {};
	        var tempModalOptions = {};

	        //Map angular-ui modal custom defaults to modal defaults defined in service
	        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

	        //Map modal.html $scope custom properties to defaults defined in service
	        angular.extend(tempModalOptions, modalOptions, customModalOptions);

	        if (!tempModalDefaults.controller) {
	            tempModalDefaults.controller = function ($scope, $uibModalInstance, $http) {
	            	$scope.folio = tempModalOptions.folio;
	            	$scope.tasa = tempModalOptions.tasa;
	            	$scope.getTablaCalculo = function(){
	            		var _csrf = getMeta('_csrf');
		            	var _csrf_header = getMeta('_csrf_header');
		            	var header = {};
		            	var url = getMeta('_ctx')+"rest/TasaCalculada/"+$scope.folio+"/tabla-calculo";
		            	header[_csrf_header]=_csrf;
		            	$http({
		            	  method : 'GET',
		            	  url : url,
		            	  headers: header
		            	}).then(function(response) {
		            		$scope.tabla = response.data.tabla;
		            	});
	            	};
	            	
	            	$scope.regresar = function(result){
	            		var result = {};
	            		result.opcion="VIEW_TASA";
	            		$uibModalInstance.close(result);
	            	};
	            	
	            	$scope.getTablaCalculo();
	            	
	                $scope.modalOptions = tempModalOptions;
	                
	                $scope.modalOptions.ok = function (result) {
	                	$uibModalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                	$uibModalInstance.dismiss('cancel');
	                };
	                $scope.downloadExcel = function(){
	                	var blob = new Blob([document.getElementById('exportable').innerHTML], {
	                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
	                    });
	                    saveAs(blob, "Tabla Calculo "+$scope.folio+".xls");
	                }
	                
	            };
	        }

	        return $uibModal.open(tempModalDefaults).result;
	    };

	}]);