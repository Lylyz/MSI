app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal,$timeout){
	
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
    
    $scope.graficar = function(){
    	mermaid.init({noteMargin: 10,curve: 'basis'}, ".mermaid");
    };
    
    $scope.style = {
    		inicial : "style $estado fill:#f9f,stroke:#333,stroke-width:4px",
    		final : "style $estado fill:#b3ffb3",
    		actual : "style $estado fill:#f9f,stroke:#333,stroke-width:4px",	
    };
    
    $scope.recursos = {
    		estados : {url:'rest/Estado/search/findEstadosProceso?proceso=1'},
    		eventos : {url:'rest/Evento/search/findEventosProceso?proceso=1'},
    		transiciones : {url:'rest/Transicion?proceso=1&estatus=true'},
    		transicionRoles :{url:'rest/TransicionRole/search/getTransicionRoleProceso?proceso=1'} 
    };
    
    $scope.graficoText="graph LR\n";
    
    var _csrf = getMeta('_csrf');
	var _csrf_header = getMeta('_csrf_header');
	var header = {};
	header[_csrf_header]=_csrf;
	
	$scope.catalogosListos = 0;
    
    angular.forEach($scope.recursos, function(recurso, key) {
    	$http({
    		method : 'GET',
    		url : recurso.url,
    		headers: header
    		}).then(function(response) {
    			$scope.catalogosListos++;
    			$scope.recursos[key].elementos = response.data._embedded.records;
    		});
    });
    
    $scope.$watch('recursos', function(n,o){
    	if($scope.catalogosListos == 4){
    		$scope.armarGrafico();
    	}
    },true);
    
    $scope.roles={
    		SYSTEM:{icono:"fa-unlock-alt",label:"Sistema"},
    		EJECUTIVO:{icono:"fa-user-tie",label:"Ejecutivo"},
    		GEST_FIN:{icono:"fa-user",label:"Gestion Financiera"},
    		CONTRALORIA:{icono:"fa-user-circle",label:"Contraloria"},
    		OPERACION_CRED:{icono:"fa-users-cog",label:"Operación Crédito"},
    		MESA_OPERACION:{icono:"fa-user-clock",label:"Mesa Control Operacion Credito"},
    };
    
    $scope.prepararCatalogos= function (){
    	var options = [];
    	$scope.graficoText="graph LR\n";
    	
    	angular.forEach($scope.recursos.estados.elementos, function(elemento, key) {
    		options[elemento.id] = elemento.alias;
    		$scope.graficoText = $scope.graficoText+elemento.id+"["+elemento.alias+"]\n";
    	});
    	$scope.recursos.estados.options = options;
    	options = [];
    	angular.forEach($scope.recursos.eventos.elementos, function(eventos, key) {
    		options[eventos.id] = eventos.alias;
    	});
    	$scope.recursos.eventos.options = options;
    	
    	options = [];
    	angular.forEach($scope.recursos.transicionRoles.elementos, function(transicionRole, key) {
    		if(!options[transicionRole.transicion])options[transicionRole.transicion] = [];
    		options[transicionRole.transicion].push( transicionRole.role);
    	});
    	$scope.recursos.transicionRoles.options = options;
    };
    
    $scope.armarGrafico = function(){
    	$scope.prepararCatalogos();
    	$scope.graficoText = $scope.graficoText+"\n";
    	var finales = [];
    	var actual;
    	var inicial;
    	angular.forEach($scope.recursos.transiciones.elementos, function(transicion, key) {
    		var content = "";
    		//<i class='fas fa-unlock-alt'></i>
    		if($scope.recursos.transicionRoles.options[transicion.id]){
    			var opciones = $scope.recursos.transicionRoles.options[transicion.id];
    			for (var i=0; i < opciones.length; i++){
    				if($scope.roles[opciones[i]]){
    					content = content+"<i class='fas "+$scope.roles[opciones[i]].icono+"'></i>&nbsp;";
    				}
    			}
    		}
    		
    		$scope.graficoText = $scope.graficoText+transicion.estadoFrom+"-->|\""+$scope.recursos.eventos.options[transicion.evento]+"</br><center>"+content+"</center>\"|"+transicion.estadoTo+"\n";
    		if(transicion.esFinal) finales.push(transicion.estadoTo);
    	});
    	for(var i = 0; i < finales.length ; i++){
    		var finalStyle = $scope.style.final.replace("$estado",finales[i]);
    		$scope.graficoText = $scope.graficoText+finalStyle+"\n";
    	}
    	//mermaid.init({noteMargin: 10,curve: 'basis'}, ".mermaid");
    	console.log($scope.graficoText);
    };
    
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);
