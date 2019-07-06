app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal){
	
	$rootScope.idSolicitud=1;
	
	$scope.templates = [
		 "formatos/-1",
		 "formatos/-1"
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
    	return getMeta('_ctx')+$scope.templates[index];
    };
});

app.directive('campoSolicitud', ['$http','$compile','$rootScope', function($http,$compile,$rootScope) {
	return {
	    restrict: 'E',
	    transclude: true,
	    replace: true,     
	    scope:{
	        idCampo:"=",
	        tipoCampo:"="
	    },
	    controller:function($scope){
	        if($scope.tipoCampo === "CHECK" || $scope.tipoCampo === "COMBO"){
	        	$scope.src = getMeta('_ctx')+"rest/FormatosCatalogos?idSolicitud="+$rootScope.idSolicitud+"&idCampo="+$scope.idCampo;
	        	$http({method: 'GET', url:$scope.src}).
	        	then(function (result) {
	        		$scope.options = result.data._embedded.records;                      
	        	}, function (result) {
	        		alert("Error: No data returned");
	        	});
	        }
	    },
	    link: function(scope, element, attrs) {
	    	var template = "";
	    	if(scope.tipoCampo === "COMBO"){
	    		template="<select class='form-control form-control-sm' ng-model='f"+scope.idCampo+"' ng-options='option.descripcion as option.descripcion for option in options'></select>"
	    	} else if(scope.tipoCampo === "CHECK"){
	    		template= "<div class='form-check form-check-inline' ng-repeat='option in options'> <input class='form-check-input' type='checkbox' id='inlineCheckbox1' ng-model='f"+scope.idCampo+"' value='{{option.descripcion}}'> <label class='form-check-label'>{{option.descripcion}}</label></div>";
	    	} else {
	    		template="<input ng-model='f"+scope.idCampo+"' type='text' class='form-control'/>";
	    	}
	    	element.replaceWith($compile(template)(scope));
	    } 
	}
}]);