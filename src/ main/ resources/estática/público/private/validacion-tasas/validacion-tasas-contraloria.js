app.controller("ValidaTasasContraloriaController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','TasaModalService', coController]);
function coController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay,TasaModalService) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	var co = this;
	co.authService=$rootScope.authService;
	co.today = new Date();
  
	co.filtroEstado = {
			CONTRALORIA: [25,62]
	};
	
	co.recursos = $rootScope.recursos;
	
  
	$scope.$watch('co.authService.userInfo', function(n,o){
		  var estados = [];
		  if(co.authService.userInfo.authorities){
			  angular.forEach(co.authService.userInfo.authorities, function(value, key) {
				  if(co.filtroEstado[value.authority]){
					  if(Array.isArray(co.filtroEstado[value.authority])){
						  estados = co.filtroEstado[value.authority];
					  } else{
						  estados.push(co.filtroEstado[value.authority]);
					  }
				  }
			  });
			  co.table.page.params.usuario = co.authService.userInfo.userInfo.sAMAccountName;
		  }
		  
		  co.table.page.params.estado = estados;
		  
	  },true);
	
  co.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{fecha:encodeURI(co.today), estado:[21]}},
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
  
  co.filtrar = function(field,minlength){
	  var min = (minlength)?minlength:4;
	  if(co.table.filter[field].value){
		  min = (co.table.filter[field].type == 'select')?0:min;
		  if(co.table.filter[field].value.toString().length >= min)
			  co.table.page.params[field]=co.table.filter[field].value;
	  } else {
		  delete co.table.page.params[field]; 
	  } 
  };
  
  co.sort = function(field){
	  var sort = "asc";
	  if(co.table.sortBy.fieldName == field.fieldName){
		  sort = co.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  co.table.sortBy = sortBy;
	  co.table.page.sort = [];
	  co.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('co.table.page', function(n,o){
	  	if(co.authService.userInfo.authorities){
	  		co.loadTable();
	  	}
  },true);
  
  co.servicioCurvas = CRUDService.setUrl(getMeta('_ctx')+"rest/SolicitudTasa/search/getTodayTasasAsignadas");
  co.loadTable = function(){
	  co.servicioCurvas.getElements(co.table.page.params,co.table.page.number,co.table.page.size,co.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = co.table.page.params;
				  dataPage.sort = co.table.page.sort; 
				  co.table.page = dataPage;
				  co.table.records = response.data._embedded.records;
			  },
			  function error(response){
			  }
	  );
  };
  
  co.viewTasa = function(tasa){
	  var url = getMeta('_ctx')+"rest/SolicitudTasa/"+tasa;
	  $http.get(url).then(function success(response){
		  $rootScope.verTasaModal(response.data,co.authService.userInfo,1,"EDIT",co);
	  });
  };
  
}