String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}%]/g, '\\$&amp;'), 'g'), replace);
};


function getMeta(metaName) {
        	  const metas = document.getElementsByTagName('meta');

        	  for (let i = 0; i < metas.length; i++) {
        	    if (metas[i].getAttribute('name') === metaName) {
        	      return metas[i].getAttribute('content');
        	    }
        	  }

        	  return '';
        	}
        
            var app = angular.module('myApp', ['ui.bootstrap','ngAnimate','ngResource','loader','authModule','toastr','ngLoadingOverlay']);
            app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal,$rootScope, toastr, $loadingOverlay,$filter,authService){
            	
            	$rootScope.defaultDateOptions = {
            			maxDate: new Date(2020, 5, 22),
            			minDate: new Date(2000, 1, 1),
            	};
            	$rootScope.defaultAltInputFormats = ['d!/M!/yyyy'];
            	
            	$rootScope.toastr = toastr;
            	$rootScope.$loadingOverlay = $loadingOverlay;
            	$rootScope.authService = authService;
            	
            	$rootScope.idSolicitud=1;
            	
            	$scope.initView = true;
            	
            	$scope.isActiveToggle = false;
            	$scope.toggleSidebarMenu = function(escopeta){
            		$scope.isActiveToggle = escopeta;
            	};
            	
                $scope.isActive = false;
                $scope.toggleMenu = function(){
                    $scope.isActive =  !$scope.isActive;
                };
                
                
                $rootScope.indicesForm = {};
                
                $rootScope.forms = [];
                
                $rootScope.initialValues = {
                };
                
                $rootScope.formRules = {
                		t0_20E6D31A : {
                			value: "nombreCliente",
                			disabled:true
                		},
                		t0_3C3216B1 : {
                			value: "diaHoy",
                			disabled:true
                		},
                		t0_4972BD29 : {
                			value: "mesActual",
                			disabled:true
                		},
                		t0_0E202B6A : {
                			value: "anioActual",
                			disabled:true
                		},
                		t0_31AE82D5 : {
                			value: "diaHoy",
                			disabled:true
                		},
                		t0_0EDDE84B : {
                			value: "mesActual",
                			disabled:true
                		},
                		t0_72254096 : {
                			value: "anioActual",
                			disabled:true
                		},
                		t0_36862117 :{
                			value: "buc",
                			disabled:true
                		},
                		c0_0EA8E248 :{ // tipo credito
                			value:	"tipoCredito",
                			traducion: {
                				1:"SIMPLE",
                				2:"QUIROGRAFARIO",
                				3:"OTROS (DESCRIBIR)",
                				4:"REFACCIONARIO",
                				5:"HABILITACIÓN O AVÍO",
                				6:"OTROS (DESCRIBIR)",
                				7:"CUENTA CORRIENTE"
                			},
                			dependencia:{
                				valorDependencia:"OTROS (DESCRIBIR)",
                				valorSet: "tipoCreditoDesc"
                			},
                			disabled:true
                		},
                		t1_0EA8E248:{
                			value: "tipoCreditoDesc",
                			disabled:true
                		},
                		t0_655EEF63 : {
                			value: "montoNumero",
                			disabled:true
                		},
                		t1_655EEF63 :{
                			value: "montoEnLetra",
                			disabled:true
                		},
                		c0_393B43FE : {
                			value: "tipoMoneda",
                			disabled:true
                		},
                		t1_393B43FE :{
                			disabled:true
                		},
                		c0_74E13211: {
                			value:	"tipoTasa",
                			traducion: {
                				1:"FIJA",
                				2:"VARIABLE"
                			},
                			disabled:true
                		},
                		t1_74E13211 : {
                			value: "tasa",
                			disabled:true
                		},
                		t1_37E62BBC : {
                			value: "plazoNo",
                			disabled:true
                		},
                		c0_37E62BBC : {
                			value: "plazoTipo",
                			disabled:true
                		},
                		c0_41F82EA1 : {
                			value:	"tiie",
                			traducion: {
                				1:"TIIE 28",
                				3:"TIIE 91",
                				6:"TIIE 182"
                			},
                			disabled:true
                		},
                		t0_27098D68 : {
                			value: "tiieDato",
                			disabled:true
                		},
                		t0_7C5B53DD: {
                			value: "puntosAdicionales",
                			disabled:true
                		},
                		c0_0EC59A74 : {
                			value:	"pagoIntereses",
                			traducion: {
                				1:"MENSUAL",
                				3:"TRIMESTRAL",
                				6:"SEMESTRAL"
                			},
                			disabled:true
                		},
                		c0_4DC30751: {
                			value:	"pagoCapital",
                			traducion: {
                				1:"MENSUAL",
                				2:"TRIMESTRAL",
                				3:"SEMESTRAL",
                				4:"AL VENCIMIENTO"
                			},
                			disabled:true
                		},
                		t1_0EC59A74:{
                			disabled:true
                		},
                		t1_4DC30751:{
                			disabled:true
                		},
                		t0_19325CFA:{
                			value: "nombreUsuario",
                			disabled:true
                		},
                		t0_3C259C4A:{
                			value: "emailUsuario",
                			disabled:true
                		},
                		t0_4DFC8A96:{
                			value: "fechaPagoInteres",
                			disabled:true
                		},
                		t0_6C5D865D:{
                			value: "fechaPagoCapital",
                			disabled:true
                		},
                		t0_5AF890E0:{
                			value: "fechaVencimientoCredito",
                			disabled:true
                		},
                		c0_6C02A45F:{
                			required:true
                		},
                		t0_1B7515BB:{
                			required:true
                		},
                		t1_1B7515BB:{
                			required:true
                		},
                		t0_3119854E:{
                			required:true
                		},
                		c0_58059F6C:{
                			required:true
                		},
                		c0_36224A92:{
                			required:true
                		},
                		c0_58059F6C:{
                			required:true
                		},
                		c0_2A577E67:{
                			required:true
                		},
                		c0_44CED57E:{
                			required:true
                		},
                		t0_681C15A1:{
                			value: "claveTesoreria",
                			disabled:true
                		},
                		t0_1F0E33AF:{
                			required:true
                		},
                		o0_523D3FFF:{
                			required:true
                		},
                		t0_4C63A05A:{
                			value: "tasaIntegrada",
                			disabled:true
                		},
                		c0_79F2866E: {
                			value:	"revisionTasa",
                			traducion: {
                				1:"MENSUAL",
                				3:"TRIMESTRAL",
                				6:"SEMESTRAL"
                			},
                			disabled:true
                		},
                		t0_6402C1CC:{
                			required:true
                		},
                		t0_3A24D1E1:{
                			required:true
                		},
                		c0_3A24D1E1:{
                			required:true,
                			setValue: ["t0_3194822D","usuarioResponsable"],
                			setValueId:["mail","usuario"]
                		},
                		t0_3194822D:{
                			value: "correoContraloria",
                			disabled:true
                		},usuarioResponsable:{}
                };
                
                $rootScope.dataTooltips = {
                    	buc: '"Bussines Unique Code".- Es el código único por usuario con longitud de 8 dígitos.',
                    	tipoCredito: 'Financiación básica en la cartera de productos disponibles.',
                    	periodoPagoCapital: 'Método de amortización.',
                    	pagoCapital: 'Frecuencias de pagos al capital',
                    	pagoIntereses: 'Frecuencia de pagos de intereses',
                    	plazos: 'Número total de plazos en los que se liquidará el crédito.',
                    	disposiciones: '',
                    	gracia: '',
                    	spread: ''
                    }
            });
            
            app.controller("WizardController", ['$scope', '$http','$uibModal','$rootScope','$window','$filter', wizardController]);
            function wizardController($scope, $http,$uibModal,$rootScope,$window,$filter) {
            	
              var vm = this;
              vm.today = Date.now();
              
              vm.defaultDateOptions = {
          			maxDate: new Date(2020, 5, 22),
          			minDate: new Date(2000, 1, 1)
              };
              
              vm.validFechaTiie = true;
    		  vm.validFechaCurvas = true;
              
              vm.openededDates = [];
              
              vm.dateTiieChanged = function (){
            	  if(vm.user.fechaTiie && vm.user.pagoIntereses){
            		  //var tiees = {1:'SF43783',3:'SF43878',6:'SF111916'};
            		  var _csrf = getMeta('_csrf');
	            	  var _csrf_header = getMeta('_csrf_header');
	            	  var header = {};
	            	  header[_csrf_header]=_csrf;
            		  var url = getMeta('_ctx')+"rest/DatoBanxico/search/findDatoBanxicoByIdSeriesAndFechaList?fecha="+vm.user.fechaTiie+"&idSerie="+vm.user.claveTiie;
            		  $http({
	            		  method : 'GET',
	            		  url : url,
	            		  headers: header
	            	  }).then(function(response) {
	            		  if(response.data._embedded.records.length > 0){
	            			  vm.validFechaTiie = true;
	            			  vm.user.idTiie = response.data._embedded.records[0].id;
	            		  } else {
	            			  vm.validFechaTiie = false;
	            			  $rootScope.toastr.error("No hay curvas TIIEs para la fecha seleccionada y el pago de interes", 'No hay curvas');
	            		  }
	            	  });
            	  } else if(!vm.user.fechaTiie){
            		  vm.validFechaTiie = true;
            	  }
              };
              
              vm.authService = $rootScope.authService;
              
              vm.fechaCurvasChanged = function (){
            	  if(vm.user.fechaCurvas){
	            	  var _csrf = getMeta('_csrf');
	            	  var _csrf_header = getMeta('_csrf_header');
	            	  var header = {};
	            	  header[_csrf_header]=_csrf;
	            	  var url = getMeta('_ctx')+"rest/CargaCurvas/search/findByFecha?fecha="+vm.user.fechaCurvas;
	            	  $http({
	            		  method : 'GET',
	            		  url : url,
	            		  headers: header
	            	  }).then(function(response) {
	            		  if(response.data._embedded.records.length > 0){
	            			  vm.validFechaCurvas = true;
	            			  vm.user.idCurvas = response.data._embedded.records[0].id;
	            		  } else {
	            			  vm.validFechaCurvas = false;
	            			  $rootScope.toastr.error("No hay curvas cargadas para la fecha seleccionada", 'No hay curvas');
	            		  }
	            	  });
            	  } else if(!vm.user.fechaCurvas){
            		  vm.validFechaCurvas = true;
            	  }
              }
              
              vm.catalogos = {
            		  pagoCapital:{
            			  url:"rest/CatPagoCapital?estatus=true"
            		  },
            		  tipoCredito:{
            			  url:"rest/CatTipoCredito?estatus=true"
            		  },
            		  tipoTasa:{
            			  url:"rest/CatTipoTasa?estatus=true"
            		  },
            		  pagoIntereses:{
            			  url:"rest/CatPagoIntereses?estatus=true"
            		  },
            		  observacion:{
            			  url:"rest/CatObservacion?estatus=true"
            		  }
              };
              
              angular.forEach(vm.catalogos, function(value, key) {
            	  var _csrf = getMeta('_csrf');
            	  var _csrf_header = getMeta('_csrf_header');
            	  var header = {};
            	  header[_csrf_header]=_csrf;
            	  $http({
            		  method : 'GET',
            		  url : value.url,
            		  headers: header
            	  }).then(function(response) {
            		  vm.catalogos[key].records = response.data._embedded.records;
            		  vm.catalogos[key].bk = response.data._embedded.records;
            	  });
            	  
              });
              // Model
              vm.currentStep = 1;
              vm.steps = [
                {
                step: 1,
                name: "COMERCIO",
                template: "private/comercio.html",
                //COMLILIhideSteps:true
                },
                {
                step: 2,
                name: "AFILIACION",
                template: "private/ejecutivo/parametria/afiliacion.html"
                },
                {
                	step: 3,
                	name: "CAMPAÑAS",
                    template: "formatos/"//COMLILI+$rootScope.idSolicitud
                }, 
              ];
              /*
              if(newVal.pagoIntereses == 1) {
    			  vm.user.etiqueta = "TIIE 28d+"
    		  } else if(newVal.pagoIntereses == 3){
    			  vm.user.etiqueta = "TIIE 91d+"
    		  } else if(newVal.pagoIntereses == 6){
    			  vm.user.etiqueta = "TIIE 182d+"
    		  } else {
    			  vm.user.etiqueta = "TIIE 28d+"
    		  }
              */
              vm.tiies = [{id:1, clave:'SF43783', descripcion: 'TIIE 28d+'},{id:3, clave:'SF43878', descripcion: 'TIIE 91d+'},{id:6, clave:'SF111916', descripcion: 'TIIE 182d+'}];
              vm.user = {gracia:0, monto:0, plazosCupon:'meses'};
              vm.solicitud = {};
              
              // Functions
              vm.limpiar = function() {
            	  var esCliente = vm.user.esCliente;
            	  vm.user = {gracia:0, monto:0, esCliente:esCliente};
              }
              
              vm.gotoStep = function(newStep) {
                vm.currentStep = newStep;
                $rootScope.indicesForm = {};
              }
              
              vm.getStepTemplate = function(){
                for (var i = 0; i < vm.steps.length; i++) {
                  if (vm.currentStep == vm.steps[i].step) {
                    return vm.steps[i].template;
                  }
                }
              }
              
              vm.controlVisible = function(){
            	  var actualStep = {};
            	  for (var i = 0; i < vm.steps.length; i++) {
                      if (vm.currentStep == vm.steps[i].step) {
                    	  actualStep = vm.steps[i].template;
                      }
                  }
            	  return actualStep.hideSteps;
              }
              
              vm.clickCliente = function(esCliente) {
            	  vm.user.esCliente = esCliente;
            	  vm.gotoStep(vm.currentStep + 1);
              }
              
              vm.save = function() {
                // todo: save data...
              }
              
              vm.cargarArchivo = function(){
            	  $rootScope.interceptor.loading=true;
            	  $scope.$apply();
					var uploadUrl="cargarArchivo"
					var _csrf = getMeta('_csrf');
					var _csrf_header = getMeta('_csrf_header');
					var formData=new FormData();
					formData.append('infoClient',angular.toJson(vm.user,true));
					var archivos = document.getElementById("tablaAmortizacion");
					var file= archivos.files[0]; 
					formData.append('file',file);	            	  
					var request = new XMLHttpRequest();
					request.open('POST', uploadUrl);
					request.setRequestHeader(_csrf_header,_csrf);
					request.send(formData);
					request.onload  = function() {
						$rootScope.interceptor.loading=false;
						$scope.$apply();
						if (request.readyState == XMLHttpRequest.DONE) {
					        var response = JSON.parse(request.responseText);
					        console.log(response);
					        if(response.success){
					        	$rootScope.toastr.success("Se cargo la tabla de amortización", 'Exitoso');
					        } else{
					        	$rootScope.toastr.error(response.error, 'Ocurrio un error');
					        } 
					    } else {
					    	$rootScope.toastr.error("Intente de nuevo mas tarde", 'Ocurrio un error');
					    }
						vm.user.archivo = JSON.parse(request.responseText);
						vm.user.idArchivo = vm.user.archivo.idArchivo;
						vm.user.rutaArchivo = vm.user.archivo.rutaArchivo;
						vm.user.monto = vm.user.archivo.monto;
						vm.user.pagoIntereses = vm.user.archivo.pagoIntereses+"";
						vm.user.dispocisiones = vm.user.archivo.noDisposiciones;
						vm.user.plazos = vm.user.archivo.noPlazos;
						$scope.$apply()
					};
              }
              
              vm.verTablaCalculo = function(){
            	  $uibModal.open({
            		  size: 'lg',
            	      templateUrl: 'private/ejecutivo/parametria/tablaCalculo.html',
            	      controller: ['tasa','tipoTasa','$scope','$uibModalInstance',function (tasa,tipoTasa,$scope, $uibModalInstance) {
            	    	  $scope.tasa = tasa;
            	    	  $scope.tipoTasa = tipoTasa;
            	        $scope.ok = function () {
            	          $uibModalInstance.close();
            	        };
            	      
            	        $scope.cancel = function () {
            	          $uibModalInstance.dismiss('cancel');
            	        };
            	      }],
            	      resolve: {
            	    	  tasa: function() {
            	    	       return vm.user.tasa
            	    	   },
            	    	   tipoTasa: function() {
            	    	       return vm.user.tipoTasa
            	    	   }
            	    	}
            	    })
              }
              
              vm.verArchivo=function(){
            	  $uibModal.open({
            		  size: 'lg',
            	      templateUrl: 'private/ejecutivo/parametria/archivo.html',
            	      controller: ['archivo','$scope','$uibModalInstance',function (archivo,$scope, $uibModalInstance) {
            	    	  $scope.archivo = archivo;
            	        $scope.ok = function () {
            	          $uibModalInstance.close();
            	        };
            	      
            	        $scope.cancel = function () {
            	          $uibModalInstance.dismiss('cancel');
            	        };
            	      }],
            	      resolve: {
            	    	  archivo: function() {
            	    	       return vm.user.archivo
            	    	   }
            	    	}
            	    });
              }
              
              vm.verTablaAmortizacion = function(){
            	  $uibModal.open({
            		  size: 'lg',
            	      templateUrl: 'private/ejecutivo/parametria/tabla-amortizacion.html',
            	      controller: ['observacion','$scope','$uibModalInstance',function (observacion,$scope, $uibModalInstance) {
            	    	  $scope.observacion = observacion;
            	    	  vm.user.tasa = null;
                    	  vm.user.amortizacion = null;
                    	  
            	    	  var uploadUrl="calcular-tabla";
      					var _csrf = getMeta('_csrf');
      					var _csrf_header = getMeta('_csrf_header');
      					var formData=new FormData();
      					formData.append('infoClient',angular.toJson(vm.user));
      					var request = new XMLHttpRequest();
      					request.open('POST', uploadUrl);
      					  request.setRequestHeader(_csrf_header,_csrf);
      					  request.send(formData);
      					  request.onload  = function() {
      						$scope.data = JSON.parse(request.responseText);
      						$scope.amortizacion = $scope.data.amortizacion;
      						$scope.$apply();
      							
      					};
            	    	  
            	    	  
            	        $scope.ok = function () {
            	          $uibModalInstance.close();
            	        };
            	      
            	        $scope.cancel = function () {
            	          $uibModalInstance.dismiss('cancel');
            	        };
            	      }],
            	      resolve: {
            	    	  observacion: function() {
            	    	       return vm.user.observacion
            	    	   }
            	    	}
            	    });
            	  
              }
              
              vm.calcularTasa = function (){
            	  vm.user.tasa = null;
            	  vm.user.amortizacion = null;
            	  var _csrf = getMeta('_csrf');
            	  var _csrf_header = getMeta('_csrf_header');
            	  var header = {};
            	  header[_csrf_header]=_csrf;
            	  $http({
            		  method : 'POST',
            		  url : 'calcular-tasa',
            		  headers: header,
            		  params: {'infoClient' : vm.user}
            	  }).then(function(response) {
            		  vm.user.tasa = response.data;
            		  if(vm.user.tasa.tiee && vm.user.tipoTasa == '2'){
            			  vm.tiie = response.data.tiee;
            			  vm.user.valorTiie = response.data.tiee.dato;
            			  vm.user.fechaTiie = response.data.tiee.fecha;
            			  if(response.data.tiee.idSerie == "SF43783") {
                			  vm.user.etiqueta = "TIIE 28d+";
                		  } else if(response.data.tiee.idSerie == "SF43878"){
                			  vm.user.etiqueta = "TIIE 91d+";
                		  } else if(response.data.tiee.idSerie == "SF111916"){
                			  vm.user.etiqueta = "TIIE 182d+";
                		  } else {
                			  vm.user.etiqueta = undefined;
                		  }
            		  }
            		  if(vm.user.tasa.curvas){
            			  vm.user.fechaCurvas = vm.user.tasa.curvas.fechaCurvas;
            			  vm.user.tasa.curvas = undefined;
            		  }
            		  $rootScope.initialValues.tipoCredito = vm.user.tipoCredito;
            		  $rootScope.initialValues.tipoMoneda = "M.N";
            		  $rootScope.initialValues.montoEnLetra = "("+numeroALetras(vm.user.monto)+")";
            		  $rootScope.initialValues.diaHoy = new Date().getDate();
            		  $rootScope.initialValues.mesActual = new Date().getMonth()+1;
            		  $rootScope.initialValues.anioActual = new Date().getFullYear();
            		  $rootScope.initialValues.tipoTasa = vm.user.tipoTasa;
            		  $rootScope.initialValues.tasaIntegrada = $filter('number')(Number(vm.user.tasa.tti)+Number(vm.user.spread)+Number(vm.user.tasa.cof),2) ;
            		  
            		  $rootScope.initialValues.revisionTasa = vm.user.pagoIntereses;
            		  $rootScope.initialValues.montoNumero = $filter('currency')(vm.user.monto,"");
            		  console.log(vm.user.plazosCupon);
            		  if(vm.user.plazosCupon == 'dias'){
            			  $rootScope.initialValues.plazoTipo = "DÍAS";
            			  $rootScope.initialValues.plazoNo = vm.user.plazos;
            		  } else {
            			  $rootScope.initialValues.plazoTipo = "MESES";
            			  $rootScope.initialValues.plazoNo = vm.user.plazos * $rootScope.initialValues.pagoIntereses;
            		  }
            		  if(vm.user.tasa.tiee.dato && $rootScope.initialValues.tipoTasa == 2){
            			  $rootScope.initialValues.tiieDato = $filter('number')(vm.user.tasa.tiee.dato, 2) ;
            			  $rootScope.initialValues.tiie = vm.user.pagoIntereses;
            		  }
            		  $rootScope.initialValues.puntosAdicionales = $filter('number')(vm.user.spread+vm.user.tasa.cof, 2);
            		  $rootScope.initialValues.pagoIntereses = vm.user.pagoIntereses;
            		  $rootScope.initialValues.pagoCapital = vm.user.pagoCapital;
            		  
            		  $rootScope.initialValues.nombreUsuario = $rootScope.authService.userInfo.userInfo.displayName;
            		  $rootScope.initialValues.emailUsuario = $rootScope.authService.userInfo.userInfo.mail;
            		  
            		  $rootScope.initialValues.fechaPagoInteres = $filter('date')(vm.user.tasa.amortizacion[0].fecha,'dd/MM/yyyy');
            		  if(vm.user.pagoCapital == 4){
            			  $rootScope.initialValues.fechaPagoCapital = $filter('date')(vm.user.tasa.amortizacion[vm.user.tasa.amortizacion.length-1].fecha,'dd/MM/yyyy');
            		  } else {
            			  $rootScope.initialValues.fechaPagoCapital = $filter('date')(vm.user.tasa.amortizacion[0].fecha,'dd/MM/yyyy');
            		  }
            		  
            		  $rootScope.initialValues.fechaVencimientoCredito = $filter('date')(vm.user.tasa.amortizacion[vm.user.tasa.amortizacion.length-1].fecha,'dd/MM/yyyy');
            		  
            		  $rootScope.initialValues.claveTesoreria = vm.user.tasa.clave;
            		  
            		  angular.forEach(vm.catalogos.tipoCredito.records, function(value, key) {
            			  if(value.id == vm.user.tipoCredito){
            				  $rootScope.initialValues.tipoCreditoDesc = value.descripcion;
            			  }
            		  });
            	  });
              }
              
              
              vm.solicitarOtros = function(){
            	  let solicitudEspecial = {};
            	  solicitudEspecial.idArchivo = vm.user.idArchivo;
            	  solicitudEspecial.monto = vm.user.monto;
            	  solicitudEspecial.buc = vm.user.buc;
            	  solicitudEspecial.condiciones = vm.user.condiciones;
            	  var _csrf = getMeta('_csrf');
            	  var _csrf_header = getMeta('_csrf_header');
            	  var header = {};
            	  header[_csrf_header]=_csrf;
            	  var url = "rest/SolicitudEspecial/crear";
            	  var config = {
            			  headers : header
            	  };
            	  $http.post(url, solicitudEspecial,config).then(function(response) {
            		  console.log(response);
            		  $rootScope.toastr.success('Solicitud Especial Realizada','Se realizó la solicitud especial');
            	  });
              }
              
              vm.solicitarVoBo = function (){
            	  vm.user.tasa.amortizacion = null;
            	  	var _csrf = getMeta('_csrf');
    	  			var _csrf_header = getMeta('_csrf_header');
            	  	var header = {};
              		header[_csrf_header]=_csrf;
              		
              		vm.user.tasa.tabla = null;
              		
              		var url = "solicitarVoBo/"+vm.user.tasa.clave;
              		$http({
              			method : 'POST',
              			url : url,
              			headers: header,
              			params: {'infoClient' : vm.user.tasa}
              		}).then(function(response) {
              			$rootScope.initialValues.monto = vm.user.monto;
              			$rootScope.toastr.success('Se mandó a solicitar el Vo. Bo.','Solicitud creada');
              			vm.gotoStep(vm.currentStep + 1);
              		});
              }	
              
              vm.changeTipoTasa = function(){
            	vm.tiie = '';
              }
              
              vm.observacionChanged = function(){
            	  vm.user.tasa = undefined;
            	  
            	  vm.user.rutaArchivo = undefined;
            	  vm.user.idArchivo = undefined;
            	  vm.user.archivo = undefined;
            	  vm.user.cargado = false;
            	  vm.user.excel = undefined;
            	  vm.user.tipoTasa = '';
        		  vm.canTipoTasa = true;
        		  vm.user.plazosCupon = 'meses';
        		  if(vm.user.observacion == 4){
        			  vm.user.pagoIntereses = undefined;
        			  vm.user.pagoCapital = undefined;
        		  } 
        		  
        		  //quitar interes con id 21
        		  if(vm.user.observacion == 1 || vm.user.observacion == 2 || vm.user.observacion == 3){
        			  vm.user.pagoIntereses = undefined;
        			  vm.catalogos.pagoInteresesBk = [];
        			  var interesesRecords = [];
        			  angular.forEach(vm.catalogos.pagoIntereses.records, function(value, key) {
        				  if(value.id != 21) interesesRecords.push(value);
        				  vm.catalogos.pagoInteresesBk.push(value);
        			  });
        			  vm.catalogos.pagoIntereses.records = interesesRecords;
        		  } else {
        			  vm.catalogos.pagoIntereses.records = vm.catalogos.pagoIntereses.bk;
        		  }
        		  
        		//quitar capital con id 4
        		  if(vm.user.observacion == 1 || vm.user.observacion == 3){
        			  console.log(vm.catalogos.pagoCapital.records);
        			  //vm.catalogos.pagoCapital.records
        			  vm.user.pagoCapital = undefined;
        			  vm.catalogos.pagoCapitalBk = [];
        			  var capitalRecords = [];
        			  angular.forEach(vm.catalogos.pagoCapital.records, function(value, key) {
        				  if(value.id != 4) capitalRecords.push(value);
        				  vm.catalogos.pagoCapitalBk.push(value);
        			  });
        			  vm.catalogos.pagoCapital.records = capitalRecords;
        		  } else {
        			  vm.catalogos.pagoCapital.records = vm.catalogos.pagoCapital.bk;
        		  }
        		  
            	  if(vm.user.observacion == 5){
            		  vm.user.tipoTasa = '1';
            		  vm.user.pagoIntereses = '21';
            		  vm.user.pagoCapital = '4';
            		  vm.canTipoTasa = false;
            		  vm.canPagoIntereses = false;
          	   		  vm.canDisposiciones = false;
          	   		  vm.canPagoCapital = false;
          	   		  vm.canGracia = false;
          	   		  vm.canPlazosCupon = true;
            	  }else{
            		  vm.canPagoIntereses = true;
          	   		  vm.canDisposiciones = true;
          	   		  vm.canPagoCapital = true;
          	   		  vm.canGracia = true;
          	   		  vm.canPlazosCupon = false;
            	  }
            	  
            	  if(vm.user.tipoCredito == 3 || vm.user.tipoCredito == 7){
            		  vm.canTipoTasa = false;
            		  vm.user.tipoTasa = '2';
            	  }
            	  
            	  if(vm.user.observacion == 2){
            		  vm.user.pagoCapital = '4';
            		  vm.canPagoCapital = false;
            		  vm.canPlazosCupon = true;
            	  }
              };
              
              vm.changeProduct = function(){
            	  vm.user.tasa = undefined;
            	  
            	  vm.canObservacion = true;
            	  vm.canPagoIntereses = true;
            	  vm.canTipoTasa = true;
            	  vm.canPlazos = true;
            	  vm.canDisposiciones = true;
            	  vm.canPagoCapital = true;
            	  vm.canGracia = true;
            	  vm.canPlazosCupon = false;
            	  vm.observaciones = [];
            	  vm.user.tipoTasa = '';
            	  vm.user.observacion = '';
            	  
            	  if(vm.user.tipoCredito == 2){
            		  vm.observaciones.push({id:2, nombre: 'Bullet'},{id:5, nombre: 'Cupón Cero'});
            	  }else if(vm.user.tipoCredito == 3 || vm.user.tipoCredito == 7){
            		  vm.observaciones.push({id:2, nombre: 'Bullet'});
            		  vm.user.observacion = '2';
            		  vm.observacionChanged();
            		  vm.canObservacion = false;
            	  }else if(vm.user.tipoCredito == 6){
            		  vm.observaciones.push({id:5, nombre: 'Cupón Cero'});
            		  vm.user.observacion = '5';
            		  vm.observacionChanged();
            		  vm.canObservacion = false;
            	  }else{
            		  vm.observaciones.push({id:1, nombre: 'Lineal'}, {id:2, nombre: 'Bullet'}, {id:3, nombre: 'Frances'}, {id:4, nombre: 'Irregular'},{id:5, nombre: 'Cupón Cero'});
            	  }
              };
              
              vm.observaciones = [];
              
              vm.bucChanged = function(){
            	  if(vm.user.esCliente){
            		  var buc = vm.user.buc.trim();
            		  if(buc.length === 8){
            			  var odsf = '10014'+buc;
            			  $http.get("rest/Ms0DtPersona/search/findByIdfPersOds?idfPersOds="+odsf).then(function(response) {
            			        if(response.data && response.data._embedded && response.data._embedded.records && response.data._embedded.records.length > 0){
            			        	var cliente = response.data._embedded.records[0];
            			        	vm.user.nombreCompleto = cliente.nomNombre+((cliente.nomApellido1)?(" "+cliente.nomApellido1):"")+((cliente.nomApellido2)?(" "+cliente.nomApellido2):"");
            			        	$rootScope.initialValues.nombreCliente = vm.user.nombreCompleto;
            			        	$rootScope.initialValues.buc = buc;
            			        	vm.user.cliente = cliente;
            			        	vm.user.codSegmentoGest = cliente.codSegmentoGest;
            			        	$http.get("rest/FacAdPersonas/search/findByNumCliente?numCliente="+buc,{ignoreLoadingScreed:true}).then(function(response) {
            			        		if(response.data && response.data._embedded && response.data._embedded.records && response.data._embedded.records.length > 0){
            			        			vm.user.direccion = response.data._embedded.records[0];
            			        		}
            			        	});
            			        	
            			        } else {
            			        	vm.user.nombreCompleto = "No se encontró el cliente";
            			        }
            			  });
            		  } else {
            			  vm.user.nombreCompleto = "";
            			  vm.user.cliente = undefined;
            		  }
            	  }
              }
              
              $scope.$watch('vm.user', function(newVal, oldVal){
            	  //vm.user.tasa = undefined;
            	  $rootScope.initialValues.pagoIntereses = newVal.pagoIntereses;
            	  if(newVal.pagoIntereses && newVal.pagoIntereses != ''){
            		  if(newVal.pagoIntereses == 1) {
            			  vm.user.etiqueta = "TIIE 28d+";
            		  } else if(newVal.pagoIntereses == 3){
            			  vm.user.etiqueta = "TIIE 91d+";
            		  } else if(newVal.pagoIntereses == 6){
            			  vm.user.etiqueta = "TIIE 182d+";
            		  } else {
            			  vm.user.etiqueta = "TIIE 28d+";
            		  }
            	  }
            	   	if(newVal.observacion && newVal.tipoSpread && newVal.spread && newVal.observacion != '' && newVal.monto && newVal.monto > 0 && newVal.pagoIntereses && newVal.pagoIntereses != '' && newVal.plazos && newVal.plazos > 0 && newVal.dispocisiones && newVal.dispocisiones > 0){
            	   		var meses = newVal.plazosCupon == 'dias' ? newVal.plazos : newVal.pagoIntereses*newVal.plazos;
            	   		if(newVal.plazosCupon == 'dias' ? meses >= 10950 : meses >= 360){
            	   			vm.user.message = "Un credito no puede superar los 30 años";
            	   		} else {
            	   			vm.user.message = "";
            	   		}
            	   		if(newVal.observacion == 2){
            	   			vm.canAmortizar = (vm.user.message == "");
//            	   			if(newVal.tasaCliente > 0){
//            	   				vm.canAmortizar = (vm.user.message == "");
//            	   			} else {
//            	   				vm.canAmortizar = false;
//            	   			}
            	   		} else {
            	   			vm.canAmortizar = (vm.user.message == "");
            	   		}
            	   	} else {
            	   		vm.canAmortizar = false;
            	   	}
            	   	
            	   	if(newVal.observacion && newVal.tipoSpread  && newVal.spread && newVal.observacion != '' && newVal.monto && newVal.monto > 0 && newVal.pagoIntereses && newVal.pagoIntereses != '' && newVal.plazos && newVal.plazos > 0 && newVal.dispocisiones && newVal.dispocisiones > 0 &&
            	   			newVal.tipoTasa && newVal.tipoTasa != ''){
            	   		var meses = newVal.plazosCupon == 'dias' ? newVal.plazos : newVal.pagoIntereses*newVal.plazos;
            	   		if(newVal.plazosCupon == 'dias' ? meses >= 10950 : meses >= 360){
            	   			vm.user.message = "Un credito no puede superar los 30 años";
            	   		} else {
            	   			vm.user.message = "";
            	   		}
            	   		if(newVal.observacion == 3){
            	   			vm.canCalcular = (vm.user.message == "");
//            	   			if(newVal.tasaCliente && newVal.tasaCliente > 0){
//            	   				vm.canCalcular = (vm.user.message == "");
//            	   			} else {
//            	   				vm.canCalcular = false;
//            	   			}
            	   		} else if(newVal.observacion == 4){
            	   			if(newVal.archivo && newVal.archivo.cargado){
            	   				vm.canCalcular = (vm.user.message == "");
            	   			} else {
            	   				vm.canCalcular = false;
            	   			}
            	   		} else {
            	   			vm.canCalcular = (vm.user.message == "");
            	   		}
            	   	} else {
            	   		vm.canCalcular = false;
            	   	}
            	   	
//            	   	if(vm.user.tipoTasa == 2){
//            	   		vm.canCalcular = vm.canCalcular;
//            	   	} else {
//            	   		vm.tiie = undefined;
//            	   	}
            	   	
            	   	if(newVal.observacion && newVal.tipoSpread  && newVal.observacion == 5 && newVal.spread) {
            	   		if(newVal.monto && newVal.monto > 0 && newVal.plazos && newVal.plazos > 0){
            	   			vm.canCalcular = true;
            	   		}else{
            	   			vm.canCalcular = false;
            	   		}
            	   	}
            	   	if(newVal.spread >= 100) vm.canCalcular=false;
            	   	vm.canAmortizar = vm.canCalcular;
              }, true);
              
              
              vm.saveForm = function(){
            	  	var _csrf = getMeta('_csrf');
  	  				var _csrf_header = getMeta('_csrf_header');
  	  				var header = {};
            		header[_csrf_header]=_csrf;
            		var config = {
                            headers : header
                        };
            		var url = getMeta('_ctx')+"formatos/"+1+"/guardar-solicitud/"+vm.user.tasa.clave;
            		
            		var errors = 0;
            		
            		angular.forEach($rootScope.forms, function(value, key) {
            			if(value.innerForm){
            			  value.innerForm.$submitted = true;
            			  if(value.innerForm.$invalid) errors++;
            			}
            		});
            		if(errors == 0){
            			$http.post(url, vm.solicitud,config).then(function(response) {
            				$rootScope.toastr.success('Se guardó el formato de la solicitud','Formato Solicitud guardado');
            			});
            		} else {
            			$rootScope.toastr.error('Verifique los campos marcados.', 'Error');
            		}
              };
              
              vm.downloadForm = function(){
            	  var url = getMeta('_ctx')+"formatos/"+1+"/generar-formato/"+vm.user.tasa.clave;
            	  $window.open(url);
              };
              
              vm.uploadForm = function(){
            	  console.log("upload form");
              };
              
            };
           