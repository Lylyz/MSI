String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}%]/g, '\\$&amp;'), 'g'), replace);
};

app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal,authService, AmortizacionModalService,TasaModalService,ModalSolicitudService,CalculoModalService, toastr,ClienteModalService,$filter){
	
	$rootScope.authService = authService;
	
	$rootScope.recursos = {
			observacion			:	{	url:"rest/CatObservacion"	},
			pagoIntereses		:	{	url:"rest/CatPagoIntereses"	},
			pagoCapital			:	{	url:"rest/CatPagoCapital"	},
			tipoTasa			:	{	url:"rest/CatTipoTasa"		},
			tipoCredito 		:	{ 	url: "rest/CatTipoCredito"	},
			estado 				:	{ 	url: "rest/Estado", field:{id:'id',descripcion:'alias'}	},
			estadoP1 			:	{ 	url: "rest/Estado/search/findEstadosProceso?proceso=1", field:{id:'id',descripcion:'alias'}	},
			estadoP41 			:	{ 	url: "rest/Estado/search/findEstadosProceso?proceso=41", field:{id:'id',descripcion:'alias'}	},
			evento 				:	{ 	url: "rest/Evento", field:{id:'id',descripcion:'alias'}	},
			estatus 			:	{options: {true:"Activo",false:"Inactivo"}}
	};
	
	$rootScope.indicesForm = {};
    
	$rootScope.idSolicitud = 1;
	
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
	
	$rootScope.viewTablaCalculo = function(folio,parameters){
		var params = {
				folio		:	folio,
				tasa		: 	parameters.tasa
		};
		CalculoModalService.showModal({}, params).then(function (result) {
			if(result.opcion == "VIEW_TASA"){
				$rootScope.verTasaModal(parameters.tasa,parameters.userInfo,parameters.proceso,parameters.modo,parameters.vt);
			}
		}, function () {
			
		});
	};
	
	$rootScope.viewInfoCliente = function(buc,parameters){
		var params = {
				buc			:	buc,
				tasa		: 	parameters.tasa
		};
		ClienteModalService.showModal({}, params).then(function (result) {
			if(result.opcion == "VIEW_TASA"){
				$rootScope.verTasaModal(parameters.tasa,parameters.userInfo,parameters.proceso,parameters.modo,parameters.vt);
			}
		}, function () {
			
		});
	};
	
	$rootScope.viewTablaAmortizacion = function(folio,parameters){
		var params = {
				folio		:	folio,
				tasa		: 	parameters.tasa
		};
		AmortizacionModalService.showModal({}, params).then(function (result) {
			if(result.opcion == "VIEW_TASA"){
				$rootScope.verTasaModal(parameters.tasa,parameters.userInfo,parameters.proceso,parameters.modo,parameters.vt);
			}
		}, function () {
			
		});
	};
	
	/**
	 * Recibe un objeto tasa, userinfo del auth, proceso :1 y el modo: "EDIT", "VIEW" y opcional el scope para recargar la tabla
	 * $rootScope.verTasaModal(tasa,vt.authService.userInfo,1,"EDIT",vt);
	 */
	$rootScope.verTasaModal = function(tasa,userInfo,proceso,modo,vt){
		
		  $rootScope.initialValues.buc = tasa.buc;
		  var odsf = '10014'+tasa.buc;
		  $http.get(getMeta('_ctx')+"rest/Ms0DtPersona/search/findByIdfPersOds?idfPersOds="+odsf).then(function(response) {
		        if(response.data && response.data._embedded && response.data._embedded.records && response.data._embedded.records.length > 0){
		        	var cliente = response.data._embedded.records[0];
		        	$rootScope.initialValues.nombreCliente = cliente.nomNombre+((cliente.nomApellido1)?(" "+cliente.nomApellido1):"")+((cliente.nomApellido2)?(" "+cliente.nomApellido2):"");
		        	
		        } else {
		        	$rootScope.initialValues.nombreCliente = "No se encontró el cliente";
		        }
		  });
		  $http.get(getMeta('_ctx')+"TasaCalculada/"+tasa.id+"/tabla-amortizacion").then(function(response) {
		        var amor = response.data.amortizacion;
		        if(amor){
					$rootScope.initialValues.fechaPagoInteres = $filter('date')(amor[0].fecha,'dd/MM/yyyy');
					$rootScope.initialValues.fechaPagoCapital = $filter('date')(amor[0].fecha,'dd/MM/yyyy');
					$rootScope.initialValues.fechaVencimientoCredito = $filter('date')(amor[amor.length-1].fecha,'dd/MM/yyyy');
		        }
		  });
		  
		  $rootScope.initialValues.tipoCredito = tasa.tipoCredito;
		  $rootScope.initialValues.tipoMoneda = "M.N";
		  $rootScope.initialValues.montoEnLetra = numeroALetras(tasa.monto);
		  $rootScope.initialValues.diaHoy = new Date(tasa.fecha).getDate();
		  $rootScope.initialValues.mesActual = new Date(tasa.fecha).getMonth()+1;
		  $rootScope.initialValues.anioActual = new Date(tasa.fecha).getFullYear();
		  $rootScope.initialValues.tipoTasa = tasa.tipoTasa;
		  $rootScope.initialValues.tasaIntegrada = "Tasa: "+$filter('number')(tasa.tasa,2)+"+ Spread: "+$filter('number')(tasa.spread,2)+"+ COF: "+$filter('number')(tasa.cof,2)+"="+$filter('number')(Number(tasa.tasa)+Number(tasa.spread)+Number(tasa.cof),2) ;
		  $rootScope.initialValues.plazoNo = tasa.plazos;
		  $rootScope.initialValues.revisionTasa = tasa.pagoIntereses;
		  $rootScope.initialValues.tiie = tasa.pagoInteres;
		  $rootScope.initialValues.montoNumero = $filter('currency')(tasa.monto,"");
		  if(tasa.observacion == 5 && tasa.plazosCupon == 'dias'){
			  $rootScope.initialValues.plazoTipo = "DÍAS";
		  } else {
			  $rootScope.initialValues.plazoTipo = "MESES";
		  }
		  if(tasa.tiie){
			  $rootScope.initialValues.tiieDato = $filter('number')(tasa.tiie, 2) ;
		  }
		  $rootScope.initialValues.puntosAdicionales = $filter('number')(tasa.spread+tasa.cof, 2);
		  $rootScope.initialValues.pagoIntereses = tasa.pagoIntereses;
		  $rootScope.initialValues.pagoCapital = tasa.pagoCapital;
		  
		  $rootScope.initialValues.nombreUsuario = $rootScope.authService.userInfo.userInfo.displayName;
		  $rootScope.initialValues.emailUsuario = $rootScope.authService.userInfo.userInfo.mail;
		  
		  $rootScope.initialValues.claveTesoreria = tasa.id;
		  
		var params = {
				  tasa		:	tasa,
				  recursos	: $rootScope.recursos,
				  userInfo	: userInfo,
				  proceso 	: proceso,
				  modo	: modo,
				  vt : vt
		  };
		  TasaModalService.showModal({}, params).then(function (result) {
			  var resultado = result;
			  if(resultado.opcion === "VALIDAR"){
				  var modalOptions = {
						  closeButtonText: 'Cancelar',
						  actionButtonText: result.selectedEvento.alias,
						  headerText: 'Confirmar '+result.selectedEvento.alias,
						  bodyText: '¿Desea '+result.selectedEvento.alias+' de la solicitud '+result.tasa.id+'?',
						  requiresDesc : result.selectedEvento.requiereDesc,
						  requiresArchivo : result.selectedEvento.requiereAdjunto,
						  tasa: result.tasa,
						  asignarDato : result.selectedEvento.asignarDato,
						  asignarResponsable : result.selectedEvento.asignarResponsable,
						  urlMotivos: 'rest/Motivo',
				  };
				  ModalSolicitudService.showModal({}, modalOptions).then(function (result) {
				  		var _csrf = getMeta('_csrf');
				  		var _csrf_header = getMeta('_csrf_header');
				  		var header = {};
				  		
				  		header[_csrf_header]=_csrf;
				  		if(result.responsable){
				  			var url = getMeta('_ctx')+"rest/TasaCalculada/"+resultado.tasa.id+"/asignarResponsable/"+result.asignarResponsable+"/"+result.responsable;
				  			$http({
					  			method : 'POST',
				  				url : url,
				  				headers: header,
				  				data: parametros
					  		}).then(function(response) {
					  			toastr.success('Se asignó el responsable', 'Acción Éxitosa');
					  			var url = "rest/TasaCalculada/"+resultado.tasa.id+"/"+resultado.selectedEvento.id;
						  		$http({
						  			method : 'POST',
						  			url : url,
						  			headers: header,
						  			params: {motivo: result.motivoAccion}
						  		}).then(function(response) {
						  			toastr.success('Se realizó la accion', 'Acción Éxitosa');
						  			if(vt) vt.loadTable();
						  		});
					  		});
				  		} else if(result.datoAsignado){
					  		var urlTasa = resultado.tasa._links.self.href;
					  		var parametros = {};
					  		parametros[result.asignarDato] = result.datoAsignado;
					  		$http({
					  			method : 'PATCH',
				  				url : urlTasa,
				  				headers: header,
				  				data: parametros
					  		}).then(function(response) {
					  			toastr.success('Se asignó el dato', 'Acción Éxitosa');
					  			if(!result.file){
						  			var url = "rest/TasaCalculada/"+resultado.tasa.id+"/"+resultado.selectedEvento.id;
							  		$http({
							  			method : 'POST',
							  			url : url,
							  			headers: header,
							  			params: {motivo: result.motivoAccion}
							  		}).then(function(response) {
							  			toastr.success('Se realizó la accion', 'Acción Éxitosa');
							  			if(vt) vt.loadTable();
							  		});
						  		} else {
						  			var url = "rest/TasaCalculada/"+resultado.tasa.id+"/"+resultado.selectedEvento.id+"/con-archivo";
						  			var formData=new FormData();
						  			formData.append('motivo',result.motivoAccion);
						  			var file = result.file;
						  			formData.append('file',file);
						  			var request = new XMLHttpRequest();
						  			request.open('POST', url);
						  			request.setRequestHeader(_csrf_header,_csrf);
						  			request.send(formData);
						  			request.onload  = function() {
						  				$rootScope.interceptor.loading=false;
						  				$scope.$apply();
						  				if (request.readyState == XMLHttpRequest.DONE) {
						  					var response = JSON.parse(request.responseText);
						  					if(response.success){
						  						toastr.success('Se realizó la accion', 'Acción Éxitosa');
						  						if(vt) vt.loadTable();
						  					} else {
						  						toastr.error(response.error, 'Ocurrio un error');
						  					}
						  				} else {
						  					toastr.error("Intente de nuevo mas tarde", 'Ocurrio un error');
						  				}
						  			}
						  		}
					  		});
				  		} else {
				  			if(!result.file){
					  			var url = "rest/TasaCalculada/"+resultado.tasa.id+"/"+resultado.selectedEvento.id;
						  		$http({
						  			method : 'POST',
						  			url : url,
						  			headers: header,
						  			params: {motivo: result.motivoAccion}
						  		}).then(function(response) {
						  			toastr.success('Se realizó la accion', 'Acción Éxitosa');
						  			if(vt) vt.loadTable();
						  		});
					  		} else {
					  			var url = "rest/TasaCalculada/"+resultado.tasa.id+"/"+resultado.selectedEvento.id+"/con-archivo";
					  			var formData=new FormData();
					  			formData.append('motivo',result.motivoAccion);
					  			var file = result.file;
					  			formData.append('file',file);
					  			var request = new XMLHttpRequest();
					  			request.open('POST', url);
					  			request.setRequestHeader(_csrf_header,_csrf);
					  			request.send(formData);
					  			request.onload  = function() {
					  				$rootScope.interceptor.loading=false;
					  				$scope.$apply();
					  				if (request.readyState == XMLHttpRequest.DONE) {
					  					var response = JSON.parse(request.responseText);
					  					if(response.success){
					  						toastr.success('Se realizó la accion', 'Acción Éxitosa');
					  						if(vt) vt.loadTable();
					  					} else {
					  						toastr.error(response.error, 'Ocurrio un error');
					  					}
					  				} else {
					  					toastr.error("Intente de nuevo mas tarde", 'Ocurrio un error');
					  				}
					  			}
					  		}
				  		}
				  }, function(){
					  if(vt) vt.loadTable();
				  });
			  } else if(resultado.opcion === "VIEW_AMORTIZACION"){
				  $rootScope.viewTablaAmortizacion(resultado.tasa.id,params);
			  } else if(resultado.opcion === "VIEW_TABLA_CALCULO"){
				  $rootScope.viewTablaCalculo(resultado.tasa.id,params);
			  } else if(resultado.opcion === "VIEW_INFO_CLIENTE"){
				  $rootScope.viewInfoCliente(resultado.tasa.buc,params);
			  }
			  
		  }, function () {
			  if(vt && typeof vt.loadTable === "function") vt.loadTable();
		  });
	};
	
	$scope.templates = [
		 "private/validacion-tasas/tasas-pendientes.html",
		 "private/validacion-tasas/tasas-validadas.html",
		 "private/validacion-tasas/vista-ejecutivo.html",
		 "private/validacion-tasas/vista-operacion-credito.html",
		 "private/validacion-tasas/vista-contraloria.html",
		 "private/validacion-tasas/vista-mesa-operacion.html",
		 "private/validacion-tasas/solicitudesEspeciales/solicitudesEspeciales.html",
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
app.controller("TasasValidadasController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','TasaModalService', banxicoController]);
function banxicoController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay,TasaModalService) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	var tv = this;
	tv.authService=$rootScope.authService;
  
	tv.filtroEstado = {
			GEST_FIN:1,
			ADMIN:1
	};
	
	tv.recursos = $rootScope.recursos;
	
	tv.defaultDateOptions = {
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(2000, 1, 1),
	};
	
	tv.dateChanged = function(){
		var fecha=[];
		if(!tv.today || !tv.tomorrow){
			delete tv.table.page.params.fecha;
		} else {
			fecha[0] = encodeURI(tv.today);
			fecha[1] = encodeURI(tv.tomorrow);
			tv.table.page.params.fecha=fecha;
		}
	};
	
	tv.today = new Date();
	tv.tomorrow = new Date();
	//tv.tomorrow = tv.tomorrow.setDate(tv.today.getDate()+1);
	
	
	
  tv.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{fecha:[encodeURI(tv.today),encodeURI(tv.tomorrow)]}},
		  records:[],
		  model:[
			  {fieldName:'id', fieldLabel:'Folio',colStyle:{'text-align':'right'}},
			  {fieldName:'buc', fieldLabel:'BUC / Cliente',colStyle:{'text-align':'right'}},
			  {fieldName:'monto', fieldLabel:'Monto',colStyle:{'text-align':'right'}, formatter:'currency'},
			  {fieldName:'ejecutivo', fieldLabel:'Ejecutivo',colStyle:{'text-align':'right'}},
			  {fieldName:'tipoCredito', fieldLabel:'Producto', recurso:'tipoCredito'},
			  {fieldName:'estado', fieldLabel:'Estado', recurso:'estadoP1'},
			  {fieldName:'fecha', fieldLabel:'Fecha Solicitud', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH:mm:ss'},
		  ],
		  sortBy:{fieldName:'fechaCurvas',order:'asc'},
		  filter:{
			  'id':{ type:'text'},
			  'buc':{ type:'text'},
			  'ejecutivo':{ type:'text'},
			  'monto':{ type:'text'},
			  'tipoCredito':{ type:'select', recurso:'tipoCredito'},
			  'estado':{ type:'select', recurso:'estadoP1'}
		  }
  };
  
  tv.filtrar = function(field,minlength){
	  var min = (minlength)?minlength:4;
	  if(tv.table.filter[field].value){
		  min = (tv.table.filter[field].type == 'select')?0:min;
		  if(tv.table.filter[field].value.toString().length >= min)
			  tv.table.page.params[field]=tv.table.filter[field].value;
	  } else {
		  delete tv.table.page.params[field]; 
	  } 
  };
  
  tv.sort = function(field){
	  var sort = "asc";
	  if(tv.table.sortBy.fieldName == field.fieldName){
		  sort = tv.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  tv.table.sortBy = sortBy;
	  tv.table.page.sort = [];
	  tv.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('tv.table.page', function(n,o){
	  tv.loadTable();
  },true);
  
  tv.servicioCurvas = CRUDService.setUrl(getMeta('_ctx')+"rest/SolicitudTasa");
  tv.loadTable = function(){
	  tv.servicioCurvas.getElements(tv.table.page.params,tv.table.page.number,tv.table.page.size,tv.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = tv.table.page.params;
				  dataPage.sort = tv.table.page.sort; 
				  tv.table.page = dataPage;
				  tv.table.records = response.data._embedded.records;
			  },
			  function error(response){
			  }
	  );
  };
  tv.loadTable();
  
  tv.viewTasa = function(tasa){
	  var url = getMeta('_ctx')+"rest/SolicitudTasa/"+tasa;
	  $http.get(url).then(function success(response){
		  $rootScope.verTasaModal(response.data,tv.authService.userInfo,1,"VIEW",tv);
	  });
	  //$rootScope.verTasaModal(tasa,tv.authService.userInfo,1,"VIEW",tv);
  };
  
}

app.controller("ValidaTasasController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','TasaModalService', wizardController]);
function wizardController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay,TasaModalService) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	var vt = this;
	vt.authService=$rootScope.authService;
	vt.today = new Date();
  
	vt.filtroEstado = {
			GEST_FIN:[21,22],
			ADMIN:21
	};
	
	vt.recursos = $rootScope.recursos;
	
  
	$scope.$watch('vt.authService.userInfo', function(n,o){
		  var estados = [];
		  if(vt.authService.userInfo.authorities){
			  angular.forEach(vt.authService.userInfo.authorities, function(value, key) {
				  if(vt.filtroEstado[value.authority]){
					  if(Array.isArray(vt.filtroEstado[value.authority])){
						  estados = vt.filtroEstado[value.authority];
					  } else{
						  estados.push(vt.filtroEstado[value.authority]);
					  }
				  }
			  });
		  }
		  vt.table.page.params.estado = estados;
		  //te.loadTable();
	  },true);
	
  vt.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{fecha:encodeURI(vt.today), estado:[21]}},
		  records:[],
		  model:[
			  {fieldName:'id', fieldLabel:'Folio',colStyle:{'text-align':'right'}},
			  {fieldName:'buc', fieldLabel:'BUC / Cliente',colStyle:{'text-align':'right'}},
			  {fieldName:'monto', fieldLabel:'Monto',colStyle:{'text-align':'right'}, formatter:'currency'},
			  {fieldName:'ejecutivo', fieldLabel:'Ejecutivo',colStyle:{'text-align':'right'}},
			  {fieldName:'tipoCredito', fieldLabel:'Producto', recurso:'tipoCredito'},
			  {fieldName:'fecha', fieldLabel:'Hora Solicitud', colStyle:{'text-align':'right'}, formatter:'date: HH:mm:ss'},
		  ],
		  sortBy:{fieldName:'fechaCurvas',order:'asc'},
		  filter:{
			  'id':{ type:'text'},
			  'buc':{ type:'text'},
			  'ejecutivo':{ type:'text'},
			  'monto':{ type:'text'},
			  'tipoCredito':{ type:'select', recurso:'tipoCredito'}
		  }
  };
  
  vt.filtrar = function(field,minlength){
	  var min = (minlength)?minlength:4;
	  if(vt.table.filter[field].value){
		  min = (vt.table.filter[field].type == 'select')?0:min;
		  if(vt.table.filter[field].value.toString().length >= min)
			  vt.table.page.params[field]=vt.table.filter[field].value;
	  } else {
		  delete vt.table.page.params[field]; 
	  } 
  };
  
  vt.sort = function(field){
	  var sort = "asc";
	  if(vt.table.sortBy.fieldName == field.fieldName){
		  sort = vt.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  vt.table.sortBy = sortBy;
	  vt.table.page.sort = [];
	  vt.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('vt.table.page', function(n,o){
	  if(vt.authService.userInfo.authorities)
		  vt.loadTable();
  },true);
  
  vt.servicioCurvas = CRUDService.setUrl(getMeta('_ctx')+"rest/SolicitudTasa");
  vt.loadTable = function(){
	  vt.servicioCurvas.getElements(vt.table.page.params,vt.table.page.number,vt.table.page.size,vt.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = vt.table.page.params;
				  dataPage.sort = vt.table.page.sort; 
				  vt.table.page = dataPage;
				  vt.table.records = response.data._embedded.records;
			  },
			  function error(response){
			  }
	  );
  };
  //vt.loadTable();
  
  vt.viewTasa = function(tasa){
	  var url = getMeta('_ctx')+"rest/SolicitudTasa/"+tasa;
	  $http.get(url).then(function success(response){
		  $rootScope.verTasaModal(response.data,vt.authService.userInfo,1,"EDIT",vt);
	  });
	 // $rootScope.verTasaModal(tasa,vt.authService.userInfo,1,"EDIT",vt);
  };
  
}

app.controller("TasasEjecutivoController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','TasaModalService', ejecutivoController]);
function ejecutivoController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay,TasaModalService) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	var te = this;
	te.authService=$rootScope.authService;
	te.today = new Date();
  
	te.filtroEstado = {
			GEST_FIN:1,
			ADMIN:1
	};
	
	te.recursos = $rootScope.recursos;
	
	
	
	te.defaultDateOptions = {
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(2000, 1, 1),
	};
	
	te.dateChanged = function(){
		var fecha=[];
		if(!te.today || !te.tomorrow){
			delete te.table.page.params.fecha;
		} else {
			fecha[0] = encodeURI(te.today);
			fecha[1] = encodeURI(te.tomorrow);
			te.table.page.params.fecha=fecha;
		}
	};
	te.today = new Date();
	te.tomorrow = new Date();
  te.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{ejecutivo:te.authService.userInfo.sAMAccountName,fecha:[encodeURI(te.today),encodeURI(te.tomorrow)]}},
		  records:[],
		  model:[
			  {fieldName:'id', fieldLabel:'Folio',colStyle:{'text-align':'right'}},
			  {fieldName:'buc', fieldLabel:'BUC / Cliente',colStyle:{'text-align':'right'}},
			  {fieldName:'monto', fieldLabel:'Monto',colStyle:{'text-align':'right'}, formatter:'currency'},
			  {fieldName:'tipoCredito', fieldLabel:'Producto', recurso:'tipoCredito'},
			  {fieldName:'estado', fieldLabel:'Estado', recurso:'estadoP1'},
			  {fieldName:'fecha', fieldLabel:'Fecha Solicitud', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH:mm:ss'},
		  ],
		  sortBy:{fieldName:'fechaCurvas',order:'asc'},
		  filter:{
			  'id':{ type:'text'},
			  'buc':{ type:'text'},
			  'ejecutivo':{ type:'text'},
			  'monto':{ type:'text'},
			  'tipoCredito':{ type:'select', recurso:'tipoCredito'},
			  'estado':{ type:'select', recurso:'estadoP1'}
		  }
  };
  
  te.filtrar = function(field,minlength){
	  var min = (minlength)?minlength:4;
	  if(te.table.filter[field].value){
		  min = (te.table.filter[field].type == 'select')?0:min;
		  if(te.table.filter[field].value.toString().length >= min)
			  te.table.page.params[field]=te.table.filter[field].value;
	  } else {
		  delete te.table.page.params[field]; 
	  } 
  };
  
  te.sort = function(field){
	  var sort = "asc";
	  if(te.table.sortBy.fieldName == field.fieldName){
		  sort = te.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  te.table.sortBy = sortBy;
	  te.table.page.sort = [];
	  te.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('te.authService.userInfo', function(n,o){
	  if(te.authService.userInfo.userInfo){
		  var usuario = te.authService.userInfo.userInfo.sAMAccountName;
		  te.table.page.params.ejecutivo = usuario;
	  }
	  //te.loadTable();
  },true);
  
  $scope.$watch('te.table.page', function(n,o){
	  te.loadTable();
  },true);
  
  te.servicioCurvas = CRUDService.setUrl(getMeta('_ctx')+"rest/SolicitudTasa");
  te.loadTable = function(){
	  te.servicioCurvas.getElements(te.table.page.params,te.table.page.number,te.table.page.size,te.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = te.table.page.params;
				  dataPage.sort = te.table.page.sort; 
				  te.table.page = dataPage;
				  te.table.records = response.data._embedded.records;
			  },
			  function error(response){
			  }
	  );
  };
  te.loadTable();
  
  te.viewTasa = function(tasa){
	  //$rootScope.verTasaModal(tasa,te.authService.userInfo,1,"EDIT",te);
	  var url = getMeta('_ctx')+"rest/SolicitudTasa/"+tasa;
	  $http.get(url).then(function success(response){
		  $rootScope.verTasaModal(response.data,te.authService.userInfo,1,"EDIT",te);
		  //$rootScope.verTasaModal(response.data,vt.authService.userInfo,1,"EDIT",vt);
	  });
  };
}

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
