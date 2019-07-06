app.service('ClienteModalService', ['$uibModal','$http',
	function ($uibModal,$http) {
		var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta('_ctx')+'private/validacion-tasas/cliente-modal.html',
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
	            	$scope.buc = tempModalOptions.buc;
	            	
	            	$scope.template=[
	            		"private/validacion-tasas/info-basica-cliente.html",
	            		"private/validacion-tasas/info-avanzada-cliente.html",
	            	];
	            	
	            	$scope.getTemplate = function(index){
	            		return $scope.template[index];
	            	};
	            	
	            	$scope.getInfoBasicaCliente = function(){
	            		var _csrf = getMeta('_csrf');
		            	var _csrf_header = getMeta('_csrf_header');
		            	var header = {};
		            	var url = getMeta('_ctx')+"rest/Ms0DtPersona/search/findByIdfPersOds?idfPersOds=10014"+$scope.buc;
		            	header[_csrf_header]=_csrf;
		            	$http({
		            	  method : 'GET',
		            	  url : url,
		            	  headers: header
		            	}).then(function(response) {
		            		$scope.basica = response.data._embedded.records[0];
		            	});
	            	};
	            	
	            	$scope.getInfoAvanzadaCliente = function(){
	            		var _csrf = getMeta('_csrf');
		            	var _csrf_header = getMeta('_csrf_header');
		            	var header = {};
		            	var url = getMeta('_ctx')+"rest/FacAdPersonas/search/findByNumCliente?numCliente="+$scope.buc;
		            	header[_csrf_header]=_csrf;
		            	$http({
		            	  method : 'GET',
		            	  url : url,
		            	  headers: header,
		            	  ignoreLoadingScreed: true
		            	}).then(function(response) {
		            		$scope.avanzada = response.data._embedded.records[0];
		            	});
	            	};
	            	
	            	$scope.regresar = function(result){
	            		var result = {};
	            		result.opcion="VIEW_TASA";
	            		$uibModalInstance.close(result);
	            	};
	            	
	            	$scope.getInfoBasicaCliente();
	            	
	            	$scope.getInfoAvanzadaCliente();
	            	
	                $scope.modalOptions = tempModalOptions;
	                
	                $scope.modalOptions.ok = function (result) {
	                	$uibModalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                	$uibModalInstance.dismiss('cancel');
	                };
	            };
	        }

	        return $uibModal.open(tempModalDefaults).result;
	    };

	}]);