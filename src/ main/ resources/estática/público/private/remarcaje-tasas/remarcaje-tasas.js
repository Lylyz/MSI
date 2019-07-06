app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal,authService,ModalSolicitudService, toastr,$filter){
	
	$rootScope.authService = authService;
	
	$rootScope.recursos = {
			observacion			:	{	url: getMeta("_ctx")+"rest/CatObservacion"	},
			pagoIntereses		:	{	url: getMeta("_ctx")+"rest/CatPagoIntereses"	},
			pagoCapital			:	{	url: getMeta("_ctx")+"rest/CatPagoCapital"	},
			tipoTasa			:	{	url: getMeta("_ctx")+"rest/CatTipoTasa"		},
			tipoCredito 		:	{ 	url: getMeta("_ctx")+"rest/CatTipoCredito"	},
			estado 				:	{ 	url: getMeta("_ctx")+"rest/Estado", field:{id:'id',descripcion:'alias'}	},
			estadoP1 			:	{ 	url: getMeta("_ctx")+"rest/Estado/search/findEstadosProceso?proceso=1", field:{id:'id',descripcion:'alias'}	},
			estadoP41 			:	{ 	url: getMeta("_ctx")+"rest/Estado/search/findEstadosProceso?proceso=41", field:{id:'id',descripcion:'alias'}	},
			evento 				:	{ 	url: getMeta("_ctx")+"rest/Evento", field:{id:'id',descripcion:'alias'}	},
			estatus 			:	{options: {true:"Activo",false:"Inactivo"}}
	};
	
	angular.forEach($rootScope.recursos, function(recurso, key) {
		if(recurso.url){
			$http.get(recurso.url).then(
					function success(response){
						var coleccion = (recurso.coleccion)?recurso.coleccion:'records';
						var records = response.data._embedded[coleccion];
						var id = (recurso.field && recurso.field.id)?recurso.field.id:'id';
						var descripcion = (recurso.field && recurso.field.descripcion)?recurso.field.descripcion:'descripcion';
						var options = {};
						angular.forEach(records, function(record, key) {
							options[record[id]] = record[descripcion];
						});
						recurso.records = records;
						recurso.options = options;
						}, 
						function failure(response){
							
						}
				);
			}
	});
	
	$scope.templates = [
		getMeta("_ctx")+"private/remarcaje-tasas/remarcaje-tasas.html",
	];
	
	$scope.initView = true;
	
	$scope.isActiveToggle = false;
	$scope.toggleSidebarMenu = function(escopeta){
		$scope.isActiveToggle = escopeta;
	};
	
    $scope.isActive = false;
    $scope.toggleMenu = function(){
        $scope.isActive =  !$scope.isActive;
    };
    
    $scope.getTemplate = function(index){
    	return $scope.templates[index];
    };
});

app.controller("RemarcajeTasasController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','SolicitudFormModal', remarcajeTasasController]);
function remarcajeTasasController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay, SolicitudFormModal) {
	var rt = this;
	
	rt.authService=$rootScope.authService;
	
	rt.recursos = $rootScope.recursos;
	
	rt.tipoBusqueda = "id";
	rt.campoPlaceHolder = "Busqueda por Folio";
	
	rt.busquedaChanged = function(){
		if(rt.campoBusqueda.length > 4){
			rt.buscarSolicitudes();
		}
	};
	
	rt.buscarSolicitudes = function(){
		var url = getMeta('_ctx')+"rest/SolicitudTasa?"+rt.tipoBusqueda+"="+rt.campoBusqueda;
		$http.get(url).then(function success(response){
			 rt.solicitudes = response.data._embedded.records;
		});
	};
	
	rt.tipoBusquedaChanged = function(){
		if(rt.tipoBusqueda == "id"){
			rt.campoPlaceHolder = "Busqueda por Folio";
		} else {
			rt.campoPlaceHolder = "Busqueda por No. Credito";
		}
		if(rt.campoBusqueda && rt.campoBusqueda.length > 4){
			rt.buscarSolicitudes();
		}
	};
	
	
	rt.showFormulario = function (solicitud){
		  var params = {
				  solicitud	:	solicitud,
				  recursos	: 	$rootScope.recursos,
				  userInfo	: 	rt.authService.userInfo,
				  modo		: "EDIT",
				  rt : rt
		  };
		  SolicitudFormModal.showModal({}, params).then(function (result) {
			  
			  var url = getMeta('_ctx')+"rest/TasaCalculada/"+result.solicitud.id+"/remarcar-tasa";
			  var _csrf = getMeta('_csrf');
			  var _csrf_header = getMeta('_csrf_header');
			  var header = {};
			  header[_csrf_header]=_csrf;
			  var config = {
        			  headers : header
        	  };
        	  $http.post(url, result.solicitud,config).then(function(response) {
        		  toastr.success('Se remarcó la tasa', 'Acción Éxitosa');
        	  });
			  
//			  
//			  $http({
//				  method : 'POST',
//				  url : url,
//				  headers: header,
//				  params: {solicitud: result.solicitud}
//			  }).then(function(response) {
//				  toastr.success('Se remarcó la tasa', 'Acción Éxitosa');
//			  });
			  
			  
		  }, function () {
			  
		  });
	};
	
	
	
};

app.service('SolicitudFormModal', ['$uibModal','$http','$rootScope',
	function ($uibModal,$http,$rootScope) {
		var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta('_ctx')+'private/remarcaje-tasas/solicitud-form-modal.html',
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
	            tempModalDefaults.controller = function ($scope, $uibModalInstance, $http,$rootScope,$window,toastr) {
	            	
	            	
	            	$scope.authService=$rootScope.authService;
	            	$rootScope.solicitud= tempModalOptions.solicitud;
	            	$rootScope.indicesForm={};
	            	$scope.modo	=	tempModalOptions.modo;
	            	$scope.index=0;
	            	$scope.recursos = tempModalOptions.recursos;
	            	$scope.userInfo = tempModalOptions.userInfo;
	            	$scope.roles = [];
	            	
	            	angular.forEach($scope.userInfo.authorities, function(authority, key) {
	            		$scope.roles.push(authority.authority);
	            	});
	            	
	            	$scope.solicitud.nombreCompleto = "Espere...";
	            	
	            	
	            	var odsf = '10014'+$scope.solicitud.buc;
	            	$http.get(getMeta('_ctx')+"rest/Ms0DtPersona/search/findByIdfPersOds?idfPersOds="+odsf).then(function(response) {
	    		        if(response.data && response.data._embedded && response.data._embedded.records && response.data._embedded.records.length > 0){
	    		        	var cliente = response.data._embedded.records[0];
	    		        	$scope.solicitud.nombreCompleto = cliente.nomNombre+((cliente.nomApellido1)?(" "+cliente.nomApellido1):"")+((cliente.nomApellido2)?(" "+cliente.nomApellido2):"");
	    		        	
	    		        } else { 
	    		        	$scope.solicitud.nombreCompleto = "No se encontró el cliente";
	    		        }
	            	});
	            	
	            	
	            	$scope.remarcarTasa = function(result){
	            		var result = {};
	                	result.solicitud = $scope.solicitud;
	                	result.opcion="REMARCAR_TASA";
	                	$uibModalInstance.close(result);
	            	};
	            	
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
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);