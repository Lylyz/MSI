app.controller("SolicitudesEspecialesController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','$window','SolicitudEspecialModalService','SolicitudFormModal', seController]);
function seController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay, $window,SolicitudEspecialModalService,SolicitudFormModal) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	var se = this;
	se.authService=$rootScope.authService;
	se.today = new Date();
  
	se.filtroEstado = {
			CONTRALORIA: [25,62]
	};
	
	se.recursos = $rootScope.recursos;
	
  
	$scope.$watch('se.authService.userInfo', function(n,o){
		  var estados = [];
		  if(se.authService.userInfo.authorities){
			  angular.forEach(se.authService.userInfo.authorities, function(value, key) {
				  if(se.filtroEstado[value.authority]){
					  if(Array.isArray(se.filtroEstado[value.authority])){
						  estados = se.filtroEstado[value.authority];
					  } else{
						  estados.push(se.filtroEstado[value.authority]);
					  }
				  }
			  });
			  se.table.page.params.usuario = se.authService.userInfo.userInfo.sAMAccountName;
		  }
		  
		  se.table.page.params.estado = estados;
		  
	  },true);
	
  se.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{fecha:encodeURI(se.today), estado:[21]}},
		  records:[],
		  model:[
			  {fieldName:'id', fieldLabel:'Folio',colStyle:{'text-align':'right'}},
			  {fieldName:'buc', fieldLabel:'BUC / Cliente',colStyle:{'text-align':'right'}},
			  {fieldName:'monto', fieldLabel:'Monto',colStyle:{'text-align':'right'}, formatter:'currency'},
			  {fieldName:'ejecutivo', fieldLabel:'Ejecutivo',colStyle:{'text-align':'right'}},
			  {fieldName:'estado', fieldLabel:'Estado', recurso:'estadoP41'},
			  {fieldName:'fecha', fieldLabel:'Hora Solicitud', colStyle:{'text-align':'right'}, formatter:'date: HH:mm:ss'},
		  ],
		  sortBy:{fieldName:'fechaCurvas',order:'asc'},
		  filter:{
			  'id':{ type:'text'},
			  'buc':{ type:'text'},
			  'ejecutivo':{ type:'text'},
			  'monto':{ type:'text'},
			  'estado':{ type:'select', recurso:'estadoP41'}
		  }
  };
  
  se.filtrar = function(field,minlength){
	  var min = (minlength)?minlength:4;
	  if(se.table.filter[field].value){
		  min = (se.table.filter[field].type == 'select')?0:min;
		  if(se.table.filter[field].value.toString().length >= min)
			  se.table.page.params[field]=se.table.filter[field].value;
	  } else {
		  delete se.table.page.params[field]; 
	  } 
  };
  
  se.sort = function(field){
	  var sort = "asc";
	  if(se.table.sortBy.fieldName == field.fieldName){
		  sort = se.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  se.table.sortBy = sortBy;
	  se.table.page.sort = [];
	  se.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('se.table.page', function(n,o){
	  	if(se.authService.userInfo.authorities){
	  		se.loadTable();
	  	}
  },true);
  
  se.servicioCurvas = CRUDService.setUrl(getMeta('_ctx')+"rest/SolicitudEspecial");
  se.loadTable = function(){
	  se.servicioCurvas.getElements(se.table.page.params,se.table.page.number,se.table.page.size,se.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = se.table.page.params;
				  dataPage.sort = se.table.page.sort; 
				  se.table.page = dataPage;
				  se.table.records = response.data._embedded.records;
			  },
			  function error(response){
			  }
	  );
  };
  
  se.viewSolicitudEspecial = function(solicitudEspecial){
	  var url = getMeta('_ctx')+"rest/SolicitudEspecial/"+solicitudEspecial;
	  $http.get(url).then(function success(response){
		  se.versolicitudEspecialModal(response.data,se.authService.userInfo,41,"EDIT");
	  });
  };
  
  se.versolicitudEspecialModal = function(solicitudEspecial, auth, proceso, modo){
	  var params = {
			  solicitudEspecial		:	solicitudEspecial,
			  recursos				: $rootScope.recursos,
			  userInfo				: auth,
			  proceso 				: proceso,
			  modo					: modo,
			  se : se
	  };
	  SolicitudEspecialModalService.showModal({}, params).then(function (result) {
		  let resultado = result;
		  if(resultado.opcion === "VALIDAR"){
			 console.log(resultado);
			 if(resultado.selectedEvento.id == 83){
				 se.showFormulario(resultado);
			 } else {
				 se.confirmarDialog(resultado);
			 }
		  }
	  }, function () {
		  if(se && typeof se.loadTable === "function") se.loadTable();
	  });
  };
  
  se.showFormulario = function (resultado){
	  var params = {
			  solicitudEspecial		:	resultado.solicitudEspecial,
			  recursos				: $rootScope.recursos,
			  userInfo				: se.authService.userInfo,
			  proceso 				: 41,
			  modo					: "EDIT",
			  se : se
	  };
	  SolicitudFormModal.showModal({}, params).then(function (result) {
		  var _csrf = getMeta('_csrf');
		  var _csrf_header = getMeta('_csrf_header');
		  var header = {};
		  header[_csrf_header]=_csrf;
		  let url = getMeta('_ctx')+"SolicitudEspecial/"+result.solicitudEspecial.id+"/"+resultado.selectedEvento.id+"/crear-solicitud";
		  console.log(url);
		  $http({
		  	method 	: 'POST',
		  	url 	: url,
		  	headers	: header,
		  	params: {'infoClient' : result.solicitud}
		  }).then(function(response) {
			  toastr.success('Se atendió la solicitud especial', 'Acción Éxitosa');
			  se.loadTable();
		  });
		  
	  }, function () {
		  if(se && typeof se.loadTable === "function") se.loadTable();
	  });
  };
  
  se.confirmarDialog = function(resultado){
	  var modalOptions = {
			  closeButtonText: 'Cancelar',
			  actionButtonText: resultado.selectedEvento.alias,
			  headerText: 'Confirmar '+resultado.selectedEvento.alias,
			  bodyText: '¿Desea '+resultado.selectedEvento.alias+' de la solicitud '+resultado.solicitudEspecial.id+'?',
			  requiresDesc : resultado.selectedEvento.requiereDesc,
			  requiresArchivo : resultado.selectedEvento.requiereAdjunto,
			  tasa: resultado.tasa,
			  asignarDato : resultado.selectedEvento.asignarDato,
			  asignarResponsable : resultado.selectedEvento.asignarResponsable,
			  urlMotivos: 'rest/Motivo',
	  };
	  ModalSolicitudService.showModal({}, modalOptions).then(function (result) {
		  var url = "rest/SolicitudEspecial/"+resultado.solicitudEspecial.id+"/"+resultado.selectedEvento.id;
		  var _csrf = getMeta('_csrf');
		  var _csrf_header = getMeta('_csrf_header');
		  var header = {};
		  header[_csrf_header]=_csrf;
		  $http({
			  method : 'POST',
			  url : url,
			  headers: header,
			  params: {motivo: result.motivoAccion}
		  }).then(function(response) {
			  toastr.success('Se realizó la accion', 'Acción Éxitosa');
			  if(se) se.loadTable();
		  });
	  }, function(){
		  if(se) se.loadTable();
	  });
  };
  
  
};

app.service('SolicitudFormModal', ['$uibModal','$http','$rootScope',
	function ($uibModal,$http,$rootScope) {
		var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta('_ctx')+'private/validacion-tasas/solicitudesEspeciales/solicitud-form-modal.html',
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
	            	$rootScope.solicitud={};
	            	$rootScope.indicesForm={};
	            	$scope.modo	=	tempModalOptions.modo;
	            	$scope.index=0;
	            	$scope.solicitud.monto = tempModalOptions.solicitudEspecial.monto;
	            	$scope.solicitud.buc = tempModalOptions.solicitudEspecial.buc;
	            	$scope.proceso = tempModalOptions.proceso;
	            	$scope.solicitudEspecial = tempModalOptions.solicitudEspecial;
	            	$rootScope.solicitudEspecial = tempModalOptions.solicitudEspecial;
	            	$scope.recursos = tempModalOptions.recursos;
	            	$scope.userInfo = tempModalOptions.userInfo;
	            	$scope.roles = [];
	            	
	            	console.log($scope.recursos);
	            	
	            	angular.forEach($scope.userInfo.authorities, function(authority, key) {
	            		$scope.roles.push(authority.authority);
	            	});
	            	
	            	$scope.solicitud.nombreCompleto = "Espere...";
	            	
	            	
	            	var odsf = '10014'+$scope.solicitudEspecial.buc;
	            	$http.get(getMeta('_ctx')+"rest/Ms0DtPersona/search/findByIdfPersOds?idfPersOds="+odsf).then(function(response) {
	    		        if(response.data && response.data._embedded && response.data._embedded.records && response.data._embedded.records.length > 0){
	    		        	var cliente = response.data._embedded.records[0];
	    		        	$scope.solicitud.nombreCompleto = cliente.nomNombre+((cliente.nomApellido1)?(" "+cliente.nomApellido1):"")+((cliente.nomApellido2)?(" "+cliente.nomApellido2):"");
	    		        	
	    		        } else { 
	    		        	$scope.solicitud.nombreCompleto = "No se encontró el cliente";
	    		        }
	            	});
	            	
	            	
	            	$scope.crearSolicitud = function(result){
	            		var result = {};
	                	result.solicitud = $scope.solicitud;
	                	result.solicitudEspecial = $scope.solicitudEspecial;
	                	result.opcion="CREAR_SOLICITUD";
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

app.service('SolicitudEspecialModalService', ['$uibModal','$http','$rootScope',
	function ($uibModal,$http,$rootScope) {
		var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta('_ctx')+'private/validacion-tasas/solicitudesEspeciales/solicitud-especial-modal.html',
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
	            	$rootScope.solicitud={};
	            	$rootScope.indicesForm={};
	            	$scope.modo	=	tempModalOptions.modo;
	            	$scope.index=0;
	            	$scope.proceso = tempModalOptions.proceso;
	            	$scope.solicitudEspecial = tempModalOptions.solicitudEspecial;
	            	$rootScope.solicitudEspecial = tempModalOptions.solicitudEspecial;
	            	$scope.recursos = tempModalOptions.recursos;
	            	$scope.userInfo = tempModalOptions.userInfo;
	            	$scope.roles = [];
	            	
	            	angular.forEach($scope.userInfo.authorities, function(authority, key) {
	            		$scope.roles.push(authority.authority);
	            	});
	            	
	            	$scope.solicitudEspecial.nombreCliente = "Espere...";
	            	
	            	var odsf = '10014'+$scope.solicitudEspecial.buc;
	            	$http.get(getMeta('_ctx')+"rest/Ms0DtPersona/search/findByIdfPersOds?idfPersOds="+odsf).then(function(response) {
	    		        if(response.data && response.data._embedded && response.data._embedded.records && response.data._embedded.records.length > 0){
	    		        	var cliente = response.data._embedded.records[0];
	    		        	$scope.solicitudEspecial.nombreCliente = cliente.nomNombre+((cliente.nomApellido1)?(" "+cliente.nomApellido1):"")+((cliente.nomApellido2)?(" "+cliente.nomApellido2):"");
	    		        	
	    		        } else {
	    		        	$scope.solicitudEspecial.nombreCliente = "No se encontró el cliente";
	    		        }
	            	});
	            	
	            	$scope.clickHistorico = function(){
	            		var _csrf = getMeta('_csrf');
		            	var _csrf_header = getMeta('_csrf_header');
		            	var header = {};
		            	var url = getMeta('_ctx')+"rest/DetalleProceso/search/findByLlaveAndProceso";
		            	header[_csrf_header]=_csrf;
		            	$http({
		            	  method : 'GET',
		            	  url : url,
		            	  headers: header,
		            	  params: {llave: $scope.solicitudEspecial.id, proceso:41}
		            	}).then(function(response) {
		            		$scope.historico = response.data._embedded.records;
		            		var urlArchivos = getMeta('_ctx')+"rest/ArchivoEvento";
		            		$http({
				            	  method : 'GET',
				            	  url : urlArchivos,
				            	  headers: header,
				            	  params: {folio: $scope.solicitudEspecial.id}
				            	}).then(function(response) {
				            		var archivos = response.data._embedded.records;
				            		
				            		angular.forEach(archivos, function(archivo, key){
				            			angular.forEach($scope.historico, function(h, key){
					            		      if(h.id == archivo.idDetalleProceso){
					            		    	  h.idArchivo = archivo.idArchivo;
					            		      }
					            		      
					            		});
				            		});				            		
				            });		            		
		            	});
	            	};
	            	
	            	$scope.getEstadosAvance = function(){
	            		var _csrf = getMeta('_csrf');
		            	var _csrf_header = getMeta('_csrf_header');
		            	var header = {};
		            	header[_csrf_header]=_csrf;
		            	var url = getMeta('_ctx')+"rest/Evento/search/findEventosByEstadoAndRole";
		            	$http({
		            	  method : 'GET',
		            	  url : url,
		            	  headers: header,
		            	  params: {estado: $scope.solicitudEspecial.estado, role:$scope.roles, proceso:$scope.proceso}
		            	}).then(function(response) {
		            		$scope.eventosPosibles = response.data._embedded.records;
		            	});
	            	};
	            	
	            	$scope.getEstadosAvance();
	            	
	            	$scope.template=[
	            		"private/validacion-tasas/solicitudesEspeciales/detalle-solicitud-especial.html",
	            		"private/validacion-tasas/historico-tasa.html",
	            		"private/validacion-tasas/formulario-tasa.html",
	            		"private/validacion-tasas/remarcaje/remarcaje.html",
	            	];
	            	
	            	$scope.changeTemplate = function(index){
	            		$scope.index = index;
	            	};
	            	
	            	$scope.getTemplate = function(){
	            		return $scope.template[$scope.index];
	            	};
	            	
	            	$scope.tiies = [{id:1, clave:'SF43783', descripcion: 'TIIE 28d+'},{id:3, clave:'SF43878', descripcion: 'TIIE 91d+'},{id:6, clave:'SF111916', descripcion: 'TIIE 182d+'}];
	            	$scope.getEtiquetaTIIE = function(plazoTiie){
	            		let etiqueta = '';
	            		angular.forEach($scope.tiies, function(value){
	            			if(plazoTiie == value.clave){
	            				etiqueta = value.descripcion;
	            				return;
	            			}
	            		});
	            		return etiqueta;
	            	};
	            	
	                $scope.modalOptions = tempModalOptions;
	                $scope.modalOptions.ok = function (result) {
	                	$uibModalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                	$uibModalInstance.dismiss('cancel');
	                };
	                
	                $scope.ejecutarEvento = function(){
	                	var result = {};
	                	result.solicitudEspecial = $scope.solicitudEspecial;
	                	result.selectedEvento = $scope.selectedEvento;
	                	result.opcion="VALIDAR";
	                	$uibModalInstance.close(result);
	                };
	            };
	        }

	        return $uibModal.open(tempModalDefaults).result;
	    };

	}]);