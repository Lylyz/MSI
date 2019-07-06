app.service('TasaModalService', ['$uibModal','$http','$rootScope',
	function ($uibModal,$http,$rootScope) {
		var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta('_ctx')+'private/validacion-tasas/tasa-modal.html',
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
	            	
	            	//console.log($rootScope.authService);
	            	$scope.authService=$rootScope.authService;
	            	$rootScope.solicitud={};
	            	$rootScope.indicesForm={};
	            	$scope.modo	=	tempModalOptions.modo;
	            	$scope.index=0;
	            	$scope.proceso = tempModalOptions.proceso;
	            	$scope.tasa = tempModalOptions.tasa;
	            	$rootScope.tasa = tempModalOptions.tasa;
	            	$scope.recursos = tempModalOptions.recursos;
	            	$scope.userInfo = tempModalOptions.userInfo;
	            	$scope.roles = [];
	            	
	            	angular.forEach($scope.userInfo.authorities, function(authority, key) {
	            		$scope.roles.push(authority.authority);
	            	});
	            	
	            	$scope.getEstadosAvance = function(){
	            		var _csrf = getMeta('_csrf');
		            	var _csrf_header = getMeta('_csrf_header');
		            	var header = {};
		            	var url = getMeta('_ctx')+"rest/Evento/search/findEventosByEstadoAndRole";
		            	header[_csrf_header]=_csrf;
		            	$http({
		            	  method : 'GET',
		            	  url : url,
		            	  headers: header,
		            	  params: {estado: $scope.tasa.estado, role:$scope.roles, proceso:$scope.proceso}
		            	}).then(function(response) {
		            		$scope.eventosPosibles = response.data._embedded.records;
		            	});
	            	};
	            	
	            	$scope.getEstadosAvance();
	            	
	            	$scope.template=[
	            		"private/validacion-tasas/detalle-tasa.html",
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
	            	
	            	$scope.clickSolicitudFormato = function(){
	            		var _csrf = getMeta('_csrf');
		            	var _csrf_header = getMeta('_csrf_header');
		            	var header = {};
		            	var url = getMeta('_ctx')+"rest/FormatoValores/search/findByIdSolicitudAndFolio";
		            	header[_csrf_header]=_csrf;
		            	$http({
		            		method : 'GET',
		            		url : url,
		            		headers: header,
			            	params: {folio: $scope.tasa.id, idSolicitud:1}
			            }).then(function(response) {
			            	var valores = response.data._embedded.records;
			            	angular.forEach(valores, function(value, key){
			            		var t = "";
			            		if(value.tipoCampo == "COMBO"){
			            			t="c";
			            		} else if(value.tipoCampo == "CHECK"){
			            			t="o";
			            		} else {
			            			t="t";
			            		}
			            		$rootScope.solicitud[t+value.indice+"_"+value.idCampo]=value.valor;
			            	});
			            	//$scope.historico = response.data._embedded.records;
			            });
	            	}
	            	
	            	$scope.dowloadFile = function(){
	            		var url = getMeta('_ctx')+"formatos/"+1+"/generar-formato/"+$scope.tasa.id;
            			$window.open(url);
	            	}
	            	
	            	$scope.saveForm = function(){
	            	  	var _csrf = getMeta('_csrf');
	  	  				var _csrf_header = getMeta('_csrf_header');
	  	  				var header = {};
	            		header[_csrf_header]=_csrf;
	            		var config = {
	                            headers : header
	                        };
	            		var errors = 0;
	            		
	            		angular.forEach($rootScope.forms, function(value, key) {
	            			  value.innerForm.$submitted = true;
	            			  if(value.innerForm.$invalid) errors++;
	            		});
	            		if(errors == 0){
		            		var url = getMeta('_ctx')+"formatos/"+1+"/guardar-solicitud/"+$scope.tasa.id;
		            		$http.post(url, $rootScope.solicitud,config).then(function(response) {
		            			$rootScope.toastr.success('Se guardó el formato de la solicitud','Formato Solicitud guardado');
		            		});
	            		} else {
	            			toastr.error('Verifique los campos marcados.', 'Error');
	            		}
	            	};
	            	
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
		            	  params: {llave: $scope.tasa.id, proceso:1}
		            	}).then(function(response) {
		            		$scope.historico = response.data._embedded.records;
		            		var urlArchivos = getMeta('_ctx')+"rest/ArchivoEvento";
		            		$http({
				            	  method : 'GET',
				            	  url : urlArchivos,
				            	  headers: header,
				            	  params: {folio: $scope.tasa.id}
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
	            	
	            	$scope.getEquivalentePlazos = function(plazo,pagosInteres,plazosCupon){
	            		return plazosCupon == 'dias' ? "Días" : "Meses"
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
	                $scope.verInfoCliente = function(result){
	                	var result = {};
	                	result.tasa = $scope.tasa;
	                	result.opcion="VIEW_INFO_CLIENTE";
	                	$uibModalInstance.close(result);
	                };
	                $scope.verTablaCalculo = function(result){
	                	var result = {};
	                	result.tasa = $scope.tasa;
	                	result.opcion="VIEW_TABLA_CALCULO";
	                	$uibModalInstance.close(result);
	                };
	                $scope.verTabla = function (result) {
	                	var result = {};
	                	result.tasa = $scope.tasa;
	                	result.opcion="VIEW_AMORTIZACION";
	                	$uibModalInstance.close(result);
	                };
	                $scope.modalOptions.ok = function (result) {
	                	$uibModalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                	$uibModalInstance.dismiss('cancel');
	                };
	                
	                $scope.ejecutarEvento = function(){
	                	var result = {};
	                	result.tasa = $scope.tasa;
	                	result.selectedEvento = $scope.selectedEvento;
	                	result.opcion="VALIDAR";
	                	$uibModalInstance.close(result);
	                };
	            };
	        }

	        return $uibModal.open(tempModalDefaults).result;
	    };

	}]);

app.directive('campoSolicitud', ['$http','$compile','$rootScope','$filter', function($http,$compile,$rootScope,$filter) {
	return {
	    restrict: 'E',
	    transclude: true,
	    replace: true,     
	    scope:{
	        campoId:"=",
	        campoTipo:"=",
	        urlOptions:"=",
	        optionsId:"=",
	        optionsDesc:"="
	    },
	    controller:function($scope){
	    	$scope.solicitud = $rootScope.solicitud;
	    	
	    	$scope.setValue = function(fieldToPut, valueToTake){
	    		var value = $scope.solicitud[$scope.nombreCampo];
	    		var id = ($scope.optionsId)?$scope.optionsId:"descripcion";
	    		var desc = ($scope.optionsDesc)? $scope.optionsDesc : "descripcion";
	    		var find = false;
	    		angular.forEach($scope.options, function(option, key) {
	    			if(option[id] == value){
	    				$scope.solicitud[fieldToPut] = option[valueToTake];
	    				find = true;
	    			}
	    		});
	    		if(!find) $scope.solicitud[fieldToPut] = "";
	    		
	    		
	    		
	    	}
	    	
	    	$scope.numeroALetras = function( numero ){
            	return $filter('number')(numero,2)+" ("+numeroALetras(numero)+")";
            }
	    	
	        if($scope.campoTipo === "COMBO" || $scope.campoTipo === "CHECK"){
	        	if(!$scope.urlOptions){
	        		$scope.src = getMeta('_ctx')+"rest/FormatosCatalogos?idSolicitud="+$rootScope.idSolicitud+"&idCampo="+$scope.campoId+"&size=1000";
	        		$http({method: 'GET', url:$scope.src}).
	        		then(function (result) {
	        			$scope.options = result.data._embedded.records;                      
	        		}, function (result) {
	        			alert("Error: No data returned");
	        		});
	        	} else {
	        		$scope.src = $scope.urlOptions;
	        		$http({method: 'GET', url:$scope.src}).
	        		then(function (result) {
	        			$scope.options = result.data._embedded.records;                      
	        		}, function (result) {
	        			alert("Error: No data returned");
	        		});
	        	}
	        }
	    },
	    link: function(scope, element, attrs) {
	    	var template = "";
	    	
	    	$rootScope.indicesForm[scope.campoId] = ($rootScope.indicesForm[scope.campoId] >= 0)?$rootScope.indicesForm[scope.campoId]+1:0;
	    	
	    	scope.initialValues = $rootScope.initialValues;
	    	
	    	var nombreCampo = ""; 
	    	
	    	
	    	if(scope.campoTipo === "COMBO"){
	    		nombreCampo= "c"+$rootScope.indicesForm[scope.campoId]+"_"+scope.campoId;
	    	} else if(scope.campoTipo === "CHECK"){
	    		nombreCampo= "o"+$rootScope.indicesForm[scope.campoId]+"_"+scope.campoId;
	    	} else {
	    		nombreCampo= "t"+$rootScope.indicesForm[scope.campoId]+"_"+scope.campoId;
	    	}
	    	
	    	scope.nombreCampo = nombreCampo;
	    	
	    	var valorCampo = "";
	    	var disabled = "";
	    	var required = "";
	    	var ngChange = "";
	    	if($rootScope.formRules[nombreCampo]){
	    		if($rootScope.formRules[nombreCampo].value && ! $rootScope.formRules[nombreCampo].traducion){
	    			scope.solicitud[nombreCampo] = scope.initialValues[$rootScope.formRules[nombreCampo].value];
	    		} else if($rootScope.formRules[nombreCampo].value && $rootScope.formRules[nombreCampo].traducion){
	    			scope.traduccion = $rootScope.formRules[nombreCampo].traducion;
	    			scope.solicitud[nombreCampo] = scope.traduccion[scope.initialValues[$rootScope.formRules[nombreCampo].value]];
	    			
	    			if($rootScope.formRules[nombreCampo].dependencia && scope.solicitud[nombreCampo] == $rootScope.formRules[nombreCampo].dependencia.valorDependencia){
	    				scope.initialValues[$rootScope.formRules[nombreCampo].dependencia.valorSet] = scope.initialValues[$rootScope.formRules[nombreCampo].dependencia.valorSet].toUpperCase();
	    			} else if($rootScope.formRules[nombreCampo].dependencia){
	    				scope.initialValues[$rootScope.formRules[nombreCampo].dependencia.valorSet] = "";
	    			}
	    			
	    		}
	    		
	    		if($rootScope.formRules[nombreCampo].setValue){
	    			var value = "";
	    			if(Array.isArray($rootScope.formRules[nombreCampo].setValue)){
	    				ngChange = "ng-change='";
	    				angular.forEach($rootScope.formRules[nombreCampo].setValue, function(value, key) {
	    					var callFuncion = "setValue(\""+$rootScope.formRules[nombreCampo].setValue[key]+"\",\""+$rootScope.formRules[nombreCampo].setValueId[key]+"\")";
	    					if(key < $rootScope.formRules[nombreCampo].setValue.length-1 ){
	    						callFuncion = callFuncion +"; "
	    					}
	    					ngChange = ngChange +callFuncion;
        	    		});
	    				ngChange = ngChange+"'";
	    			} else {
	    				ngChange = "ng-change='setValue(\""+$rootScope.formRules[nombreCampo].setValue+"\",\""+$rootScope.formRules[nombreCampo].setValueId+"\")' ";
	    			}
	    		}
	    		
	    		if($rootScope.formRules[nombreCampo].required){
	    			required = " ng-required='true' ";
	    		}
	    		
	    		if($rootScope.formRules[nombreCampo].disabled){
	    			disabled = " ng-disabled='true' ";
	    		}
	    		$rootScope.forms.push(scope);
	    	}
	    	if(scope.campoTipo === "COMBO"){
	    		var id = (scope.optionsId)?scope.optionsId:"descripcion";
	    		var desc = (scope.optionsDesc)? scope.optionsDesc : "descripcion";
	    		template="<ng-form name='innerForm'><select class='form-control form-control-sm' name='"+nombreCampo+"' ng-model='solicitud."+nombreCampo+"' ng-options='option."+id+" as option."+desc+" for option in options' "+valorCampo+disabled+required+ngChange+"><option value=''>SELECCIONE</option></select><div ng-show='innerForm."+nombreCampo+".$touched || innerForm.$submitted'><small id='"+nombreCampo+"RequiredError' 	class='form-text alert-danger' 	ng-show='innerForm."+nombreCampo+".$error.required'>El campo es requerido</small></div></div></ng-form>";
	    	} else if(scope.campoTipo === "CHECK"){
	    		template = "<ng-form name='innerForm'><div class='form-check-inline' ng-repeat='option in options'> <label class='form-check-label'> <input type='radio' class='form-check-input' name='"+nombreCampo+"' value='{{option.descripcion}}' ng-model='solicitud."+nombreCampo+"' "+disabled+required+">{{option.descripcion}}</label> </div><div ng-show='innerForm."+nombreCampo+".$touched || innerForm.$submitted'><small id='"+nombreCampo+"RequiredError' 	class='form-text alert-danger' 	ng-show='innerForm."+nombreCampo+".$error.required'>Seleccione un valor</small></div></div></ng-form>";
	    	} else if(scope.campoTipo === "DATE"){
	    		scope.defaultAltInputFormats = $rootScope.defaultAltInputFormats;
	    		scope.defaultDateOptions = $rootScope.defaultDateOptions;
	    		scope.opened=false;
	    		template = "<ng-form name='innerForm'><div class='form-group'><p class='input-group'><input type='text' class='form-control' name='"+nombreCampo+"' uib-datepicker-popup='dd/MM/yyyy' ng-model='solicitud."+nombreCampo+"' ng-click='opened=!opened' is-open='opened' datepicker-options='defaultDateOptions' "+required+" close-text='Cerrar' clear-text='Limpiar' current-text='Hoy' alt-input-formats='defaultAltInputFormats' /><span class='input-group-btn'><button type='button' class='btn btn-secondary' ng-click='opened = true'><i class='far fa-calendar-alt'></i></button></span></p></div><div ng-show='innerForm."+nombreCampo+".$touched || innerForm.$submitted'><small id='"+nombreCampo+"RequiredError' 	class='form-text alert-danger' 	ng-show='innerForm."+nombreCampo+".$error.required'>Seleccione un valor</small></div></div></ng-form>";
	    	} else  {
	    		template="<ng-form name='innerForm'><div class='form-group'><input ng-model='solicitud."+nombreCampo+"' name='"+nombreCampo+"' type='text' class='form-control form-control-sm' "+valorCampo+disabled+required+"/><div ng-show='innerForm."+nombreCampo+".$touched || innerForm.$submitted'><small id='"+nombreCampo+"RequiredError' 	class='form-text alert-danger' 	ng-show='innerForm."+nombreCampo+".$error.required'>El campo es requerido</small></div></div></ng-form>";
	    	}
	    	element.replaceWith($compile(template)(scope));
	    } 
	}
}]);