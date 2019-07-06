app.controller("ValidaTasasMesaOperacionController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalSolicitudService','$rootScope', 'toastr', '$loadingOverlay','TasaModalService', moController]);
function moController($scope, $http,$uibModal,$filter,CRUDService,ModalSolicitudService,$rootScope, toastr, $loadingOverlay,TasaModalService) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	var mo = this;
	mo.authService=$rootScope.authService;
	mo.today = new Date();
  
	mo.filtroEstado = {
			MESA_OPERACION:[41]
	};
	
	mo.recursos = $rootScope.recursos;
	
  
	$scope.$watch('mo.authService.userInfo', function(n,o){
		  var estados = [];
		  if(mo.authService.userInfo.authorities){
			  angular.forEach(mo.authService.userInfo.authorities, function(value, key) {
				  if(mo.filtroEstado[value.authority]){
					  if(Array.isArray(mo.filtroEstado[value.authority])){
						  estados = mo.filtroEstado[value.authority];
					  } else{
						  estados.push(mo.filtroEstado[value.authority]);
					  }
				  }
			  });
		  }
		  mo.table.page.params.estado = estados;
	  },true);
	
  mo.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{fecha:encodeURI(mo.today), estado:[21]}},
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
  
  mo.filtrar = function(field,minlength){
	  var min = (minlength)?minlength:4;
	  if(mo.table.filter[field].value){
		  min = (mo.table.filter[field].type == 'select')?0:min;
		  if(mo.table.filter[field].value.toString().length >= min)
			  mo.table.page.params[field]=mo.table.filter[field].value;
	  } else {
		  delete mo.table.page.params[field]; 
	  } 
  };
  
  mo.sort = function(field){
	  var sort = "asc";
	  if(mo.table.sortBy.fieldName == field.fieldName){
		  sort = mo.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  mo.table.sortBy = sortBy;
	  mo.table.page.sort = [];
	  mo.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('mo.table.page', function(n,o){
	  if(mo.authService.userInfo.authorities)
		  mo.loadTable();
  },true);
  
  mo.servicioCurvas = CRUDService.setUrl(getMeta('_ctx')+"rest/SolicitudTasa");
  mo.loadTable = function(){
	  mo.servicioCurvas.getElements(mo.table.page.params,mo.table.page.number,mo.table.page.size,mo.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = mo.table.page.params;
				  dataPage.sort = mo.table.page.sort; 
				  mo.table.page = dataPage;
				  mo.table.records = response.data._embedded.records;
			  },
			  function error(response){
				  
			  }
	  );
  };
  
  mo.viewTasa = function(tasa){
	  var url = getMeta('_ctx')+"rest/SolicitudTasa/"+tasa;
	  $http.get(url).then(function success(response){
		  $rootScope.verTasaModal(response.data,mo.authService.userInfo,1,"EDIT",mo);
	  });
  };
  
}