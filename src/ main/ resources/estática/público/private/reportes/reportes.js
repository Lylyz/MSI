app.controller('myCtrl', function($scope, $http, $uibModal, $rootScope, $timeout, authService, toastr, $loadingOverlay, $resource, CRUDService){
    $rootScope.toastr = toastr;
    $rootScope.$loadingOverlay = $loadingOverlay;
    $scope.authService = authService;

    $scope.initView = true;
    
    $scope.isActiveToggle = false;
    $scope.toggleSidebarMenu = function(escopeta){
    	$scope.isActiveToggle = escopeta;
    };
    
	$scope.defaultDateOptions = {
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(2000, 1, 1),
	};
	
	var vt = this;
	
	$scope.dateChanged = function(){
		inicio = vt.today.getFullYear()+'-'+(("0" + (vt.today.getMonth() + 1)).slice(-2)) + '-' + (("0" + vt.today.getDate()).slice(-2));
	    fin = vt.tomorrow.getFullYear()+'-'+(("0" + (vt.tomorrow.getMonth() + 1)).slice(-2)) + '-' + (("0" + vt.tomorrow.getDate()).slice(-2));
	    $http.get('formatos/reportes/'+inicio+'/'+fin).then(function success(response) {
			$scope.tablaReportes = response.data;
			
			$http.get('formatos/reportes_totales/'+inicio+'/'+fin).then(function success(response) {
				$scope.tablaReportesTotales = response.data;
		    }, function error(response){
		    });
			
			vt.loadTable();
	    }, function error(response){
	    });
	};
	
	vt.tomorrow = new Date();
	vt.today = new Date(vt.tomorrow.getFullYear()+'-'+(("0" + (vt.tomorrow.getMonth() + 1)).slice(-2))+'-'+'1');
	
    $scope.tablaReportes = [];
    $scope.tablaReportesTotales = {};
    
    var inicio = vt.today.getFullYear()+'-'+(("0" + (vt.today.getMonth() + 1)).slice(-2)) + '-' + (("0" + vt.today.getDate()).slice(-2));
    var fin = vt.tomorrow.getFullYear()+'-'+(("0" + (vt.tomorrow.getMonth() + 1)).slice(-2)) + '-' + (("0" + vt.tomorrow.getDate()).slice(-2));
    $http.get('formatos/reportes/'+inicio+'/'+fin).then(function success(response) {
		$scope.tablaReportes = response.data;
		
		$http.get('formatos/reportes_totales/'+inicio+'/'+fin).then(function success(response) {
			$scope.tablaReportesTotales = response.data;
	    }, function error(response){
	    });
		
    }, function error(response){
    });
    
    vt.table = {
			  sizes:[10,20,25,50,100],
			  page:{size:100000,number:0,sort:[{fieldName:'fecha',order:'desc'}],params:{'estados': '61,25,41,81,24,26,62,21,22,23,83', 'inicio': inicio, 'fin': fin}},
			  records:[],
			  model:[
				  {fieldName:'folio', fieldLabel:'Folio',colStyle:{'text-align':'left'}},
				  {fieldName:'buc', fieldLabel:'BUC',colStyle:{'text-align':'left'}},
				  {fieldName:'observacion', fieldLabel:'Observación',colStyle:{'text-align':'left'}},
				  {fieldName:'monto', fieldLabel:'Monto', colStyle:{'text-align':'right'}, formatter: 'currency'},
				  {fieldName:'spread', fieldLabel:'Spread', colStyle:{'text-align':'right'}, formatter: 'number:2'},
				  {fieldName:'cof', fieldLabel:'CoF', colStyle:{'text-align':'right'}},
				  {fieldName:'pagoInteres', fieldLabel:'Pago Intereses', colStyle:{'text-align':'left'}},
				  {fieldName:'tipoTasa', fieldLabel:'Tipo de tasa', colStyle:{'text-align':'left'}},
				  {fieldName:'plazos', fieldLabel:'Plazos', colStyle:{'text-align':'left'}},
				  {fieldName:'disposiciones', fieldLabel:'Disposiciones', colStyle:{'text-align':'left'}},
				  {fieldName:'tipoCredito', fieldLabel:'Tipo de Crédito', colStyle:{'text-align':'left'}},
				  {fieldName:'pagoCapital', fieldLabel:'Pago Capital', colStyle:{'text-align':'left'}},
				  {fieldName:'gracia', fieldLabel:'Gracia', colStyle:{'text-align':'left'}}
			  ],
			  sortBy:{fieldName:'fecha',order:'asc'}
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
  
  vt.servicioBanxico = CRUDService.setUrl("rest/SolicitudTasa/search/getTasasByDate/");
  vt.loadTable = function(){
	  vt.servicioBanxico.getElements(vt.table.page.params,vt.table.page.number,vt.table.page.size,vt.table.page.sort).then (
		  function success(response){
			  var dataPage = response.data.page;
			  dataPage.params = vt.table.page.params;
			  dataPage.sort = vt.table.page.sort; 
			  vt.table.page = dataPage;
			  vt.table.records = response.data._embedded.records;
		  },
		  function error(response){
			  console.log(response);
		  }
	  );
  };
  vt.loadTable();
  
  vt.downloadExcel = function(){
  	var blob = new Blob([document.getElementById('exportable').innerHTML], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
      saveAs(blob, "detalle.xls");
  }
  
    $scope.getDetalle = function(row, tipo){
    	$uibModal.open({
            templateUrl: 'private/reportes/detalleModal.html',
            size: 'lg',
            keyboard: false,
            backdrop: 'static',
            controller: 'DetalleController',
            controllerAs: 'vt',
            resolve: {
            	row: function () {
                  return row;
            	},
            	tipo: function () {
                    return tipo;
              	}
            }
        });
    };
});