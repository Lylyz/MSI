app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal){
	
	$scope.templates = [
		 "../private/gestion-financiera/carga-tasas/tabla-cargas.html",
		 "../private/gestion-financiera/carga-tasas/datos-banxico.html"
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
app.controller("DatosBaxicoController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalService','$rootScope', 'toastr', '$loadingOverlay', banxicoController]);
function banxicoController($scope, $http,$uibModal,$filter,CRUDService,ModalService,$rootScope, toastr, $loadingOverlay) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	//$scope.authService = authService;
	var db = this;
	db.table = {
			  sizes:[10,20,25,50,100],
			  page:{size:10,number:0,sort:[{fieldName:'fechaInsert',order:'desc'}],params:{}},
			  records:[],
			  model:[
				  {fieldName:'idSerie', fieldLabel:'Id Serie', colStyle:{'text-align':'right'}},
				  {fieldName:'titulo', fieldLabel:'Titulo',colStyle:{'text-align':'right'}},
				  {fieldName:'dato', fieldLabel:'Dato',colStyle:{'text-align':'right'}, formatter:'number:5'},
				  {fieldName:'fecha', fieldLabel:'Fecha Banxico', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy'},
				  {fieldName:'fechaInsert', fieldLabel:'Fecha de Descarga',colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH.mm.ss'},
			  ],
			  sortBy:{fieldName:'fechaInsert',order:'asc'}
	};
	db.sort = function(field){
		  var sort = "asc";
		  if(db.table.sortBy.fieldName == field.fieldName){
			  sort = db.table.sortBy.order;
			  if(sort == "asc"){
				  sort = "desc";
			  } else if(sort == "desc"){
				  sort = undefined;
			  } else {
				  sort="asc"
			  }
		  }
		  var sortBy = {fieldName : field.fieldName, order:sort};
		  db.table.sortBy = sortBy;
		  db.table.page.sort = [];
		  db.table.page.sort.push(sortBy);
	  };
	  
	  $scope.$watch('db.table.page', function(n,o){
		  db.loadTable();
	  },true);
	  
	  db.servicioBanxico = CRUDService.setUrl("../rest/DatoBanxico/");
	  db.loadTable = function(){
		  db.servicioBanxico.getElements(db.table.page.params,db.table.page.number,db.table.page.size,db.table.page.sort).then (
				  function success(response){
					  var dataPage = response.data.page;
					  dataPage.params = db.table.page.params;
					  dataPage.sort = db.table.page.sort; 
					  db.table.page = dataPage;
					  db.table.records = response.data._embedded.records;
				  },
				  function error(response){
				  }
		  );
	  };
	  //db.loadTable();
	  
	  db.extraerDatosBanxico = function(){
		  var header = {};
		  var _csrf = getMeta('_csrf');
		  var _csrf_header = getMeta('_csrf_header');
	      header[_csrf_header]=_csrf;
		  $http({
		        url: 'extrae-datos-banxico',
		        method: "POST",
		        headers : header
		    })
		    .then(function(response) {
		    	if(response.data.message){
		    		$rootScope.toastr.success(response.data.message, 'Se descargó información');
		    	} else {
		    		$rootScope.toastr.info('No hay informacion nueva de Banxico', 'No hay información');
		    	}
		    	db.loadTable();
		    }, 
		    function(response) { // optional
		            // failed
		    });
	  };
}

app.controller("CargaTasasController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalService','$rootScope', 'toastr', '$loadingOverlay', wizardController]);
function wizardController($scope, $http,$uibModal,$filter,CRUDService,ModalService,$rootScope, toastr, $loadingOverlay) {
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;
	//$scope.authService = authService;
  var vm = this;
//  model:[
//	  {fieldName:'fechaCurvas', fieldLabel:'Fecha de Curvas', headerStyle:{'width': '62px'}, colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy'},
//	  {fieldName:'fechaCarga', fieldLabel:'Fecha de Carga', headerStyle:{'width': '95px'},colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH.mm.ss'},
//	  {fieldName:'usuario', fieldLabel:'Usuario Carga', headerStyle:{width: '95px'},colStyle:{'text-align':'right'}},
//  ],
  vm.table = {
		  sizes:[10,20,25,50,100],
		  page:{size:10,number:0,sort:[{fieldName:'fechaCurvas',order:'desc'}],params:{}},
		  records:[],
		  model:[
			  {fieldName:'fechaCurvas', fieldLabel:'Fecha de Curvas', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy'},
			  {fieldName:'fechaCarga', fieldLabel:'Fecha de Carga',colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH.mm.ss'},
			  {fieldName:'usuario', fieldLabel:'Usuario Carga',colStyle:{'text-align':'right'}},
		  ],
		  sortBy:{fieldName:'fechaCurvas',order:'asc'}
  };
  
  vm.sort = function(field){
	  var sort = "asc";
	  if(vm.table.sortBy.fieldName == field.fieldName){
		  sort = vm.table.sortBy.order;
		  if(sort == "asc"){
			  sort = "desc";
		  } else if(sort == "desc"){
			  sort = undefined;
		  } else {
			  sort="asc"
		  }
	  }
	  var sortBy = {fieldName : field.fieldName, order:sort};
	  vm.table.sortBy = sortBy;
	  vm.table.page.sort = [];
	  vm.table.page.sort.push(sortBy);
  };
  
  $scope.$watch('vm.table.page', function(n,o){
	  vm.loadTable();
  },true);
  
  vm.servicioCurvas = CRUDService.setUrl("../rest/CargaCurvas/");
  vm.loadTable = function(){
	  vm.servicioCurvas.getElements(vm.table.page.params,vm.table.page.number,vm.table.page.size,vm.table.page.sort).then (
			  function success(response){
				  var dataPage = response.data.page;
				  dataPage.params = vm.table.page.params;
				  dataPage.sort = vm.table.page.sort; 
				  vm.table.page = dataPage;
				  vm.table.records = response.data._embedded.records;
			  },
			  function error(response){
			  }
	  );
  };
  vm.loadTable();
  
  vm.verCurvas = function(elemento){
	  var href= elemento._links.self.href;
	  $uibModal.open({
		  size: 'lg',
	      templateUrl: '../private/gestion-financiera/carga-tasas/curvas-view.html',
	      controller: ['elemento','$scope','$uibModalInstance','$http', function (elemento,$scope, $uibModalInstance,$http) {
	    	  $scope.elemento = elemento;
	    	  $http.get(elemento._links.curvas.href).then(function(response) {
	    		  $scope.curvas = response.data._embedded.records;
			  });
	    	  
	    	  $scope.ok = function () {
	    		  $uibModalInstance.close();
	    	  };
	      
	    	  $scope.cancel = function () {
	    		  $uibModalInstance.dismiss('cancel');
	    	  };
	      }],
	      resolve:{
	    	  elemento: function(){
	    		  return elemento;
	    	  }
	      }
	   });
  };
  
  vm.borrarElemento = function(elemento){
	  var href= elemento._links.self.href;
	  var modalOptions = {
		closeButtonText: 'Cancelar',
		actionButtonText: 'Borrar Curvas',
		headerText: '¿Borrar curvas del ' +$filter('date')(elemento.fechaCurvas,'dd/MM/yyyy') + '?',
		bodyText: '¿Esta seguro quiere borrar las curvas de esta fecha?'
	  };
	  ModalService.showModal({}, modalOptions).then(function (result) {
		  vm.servicioCurvas.deleteElementByUrl(href).then (
	    	function success(response){
	    	  $rootScope.toastr.success("Se eliminaron las curvas de "+$filter('date')(elemento.fechaCurvas,'dd/MM/yyyy'), 'Se borró el elemento');
	    	  vm.loadTable();
	    	},
	    	function error(response){
	    	}
    	  );
      });
  };
  
  vm.canDeleteCurvas = function(carga){
	  var hoy = new Date();
	  hoy = hoy.setHours(0,0,0,0);
	  var fechaCarga = new Date(carga.fechaCurvas);
	  fechaCarga = fechaCarga.setHours(0,0,0,0);
	  return hoy==fechaCarga;
  };
  
  vm.cargarArchivo = function(){
	  $rootScope.interceptor.loading=true;
	  $scope.$apply();
	var uploadUrl="carga-curvas-archivo"
	var _csrf = getMeta('_csrf');
	var _csrf_header = getMeta('_csrf_header');
	var formData=new FormData();
	formData.append('infoClient',angular.toJson(vm.user,true));
	var archivos = document.getElementById("tablaAmortizacion");
	var file = archivos.files[0]; 
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
		        	$rootScope.toastr.success("Se cargaron las curvas", 'Exitoso');
		        } else{
		        	$rootScope.toastr.error(response.error, 'Ocurrio un error');
		        } 
		    } else {
		    	$rootScope.toastr.error("Intente de nuevo mas tarde", 'Ocurrio un error');
		    }
			document.getElementById("tablaAmortizacion").value = "";
			vm.loadTable();
			$scope.$apply();
		};
  };
  
};

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);
