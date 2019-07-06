app.controller("ValidaTasasOperacionCreditoController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','TasaModalService', ocController]);
function ocController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay,TasaModalService) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	var oc = this;
	oc.authService=$rootScope.authService;
	oc.today = new Date();
  
	oc.filtroEstado = {
			OPERACION_CRED:[81]
	};
	
	oc.recursos = $rootScope.recursos;
	
  
	$scope.$watch('oc.authService.userInfo', function(n,o){
		  var estados = [];
		  if(oc.authService.userInfo.authorities){
			  angular.forEach(oc.authService.userInfo.authorities, function(value, key) {
				  if(oc.filtroEstado[value.authority]){
					  if(Array.isArray(oc.filtroEstado[value.authority])){
						  estados = oc.filtroEstado[value.authority];
					  } else{
						  estados.push(oc.filtroEstado[value.authority]);
					  }
				  }
			  });
			  oc.table.page.params.usuario = oc.authService.userInfo.userInfo.sAMAccountName;
		  }
		  oc.table.page.params.estado = estados;
	  },true);
	
  oc.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{fecha:encodeURI(oc.today), estado:[21]}},
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
  
  oc.filtrar = function(field,minlength){
	  var min = (minlength)?minlength:4;
	  if(oc.table.filter[field].value){
		  min = (oc.table.filter[field].type == 'select')?0:min;
		  if(oc.table.filter[field].value.toString().length >= min)
			  oc.table.page.params[field]=oc.table.filter[field].value;
	  } else {
		  delete oc.table.page.params[field]; 
	  } 
  };
  
  oc.sort = function(field){
	  var sort = "asc";
	  if(oc.table.sortBy.fieldName == field.fieldName){
		  sort = oc.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  oc.table.sortBy = sortBy;
	  oc.table.page.sort = [];
	  oc.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('oc.table.page', function(n,o){
	  if(oc.authService.userInfo.authorities)
		  oc.loadTable();
  },true);
  
  oc.servicioCurvas = CRUDService.setUrl(getMeta('_ctx')+"rest/SolicitudTasa/search/getTodayTasasAsignadas");
  oc.loadTable = function(){
	  oc.servicioCurvas.getElements(oc.table.page.params,oc.table.page.number,oc.table.page.size,oc.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = oc.table.page.params;
				  dataPage.sort = oc.table.page.sort; 
				  oc.table.page = dataPage;
				  oc.table.records = response.data._embedded.records;
			  },
			  function error(response){
			  }
	  );
  };
  
  oc.viewTasa = function(tasa){
	  var url = getMeta('_ctx')+"rest/SolicitudTasa/"+tasa;
	  $http.get(url).then(function success(response){
		  $rootScope.verTasaModal(response.data,oc.authService.userInfo,1,"EDIT",oc);
	  });
  };
  
}