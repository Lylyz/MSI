function getMeta(metaName) {
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content');
    }
  }
  return '';
}

app.service('CRUDService', [ '$http', function($http) {
	var resourceUrl = this.resourceUrl;
	
	this._csrf = getMeta('_csrf');
	this._csrf_header = getMeta('_csrf_header');
	
	this.setUrl = function setUrl(url){
		return angular.extend({resourceUrl: url}, this);
	}
	
    this.getById = function getById(id) {
        return $http({
            method : 'GET',
            url : resourceUrl + id
        });
    }
    
    this.getByURl = function getByURl(urlToGet) {
        return $http({
            method : 'GET',
            url : urlToGet
        });
    }
    
    this.addElement = function addElement(element) {
    	var header = {};
    	header[this._csrf_header]=this._csrf;
        return $http({
            method : 'POST',
            url : this.resourceUrl,
            data : element,
            headers: header
        });
    }
    
    this.updateElement = function updateElement(id,element){
    	return $http({
            method : 'PATCH',
            url : resourceUrl + id,
            data : element
        });
    }
    
    this.updateElementByUrl = function updateElementByUrl(urlToUpdate,element){
    	var header = {};
    	header[this._csrf_header]=this._csrf;
    	return $http({
            method : 'PATCH',
            url : urlToUpdate,
            data : element,
            headers: header
        });
    }
    
    this.deleteElement = function deleteElement(id) {
        return $http({
            method : 'DELETE',
            url : resourceUrl + id
        })
    }
    
    this.deleteElementByUrl = function deleteElementByUrl(urlToDelete) {
    	var header = {};
    	header[this._csrf_header]=this._csrf;
        return $http({
            method : 'DELETE',
            url : urlToDelete,
            headers: header
        })
    }
    /**
     * params is an object {}, the fields to search
     * page is a number, the page number
     * size is a number, the page size
     * sort is an array of objects in format [{fieldName: value,order: asc} , {fieldName: value,order: asc} ]
     */
    this.getElements = function getElements(params,page,size,sort) {
    	var urlArmada = this.resourceUrl;
    	var parameters = 0;
    	angular.forEach(params, function(value, key) {
    			if(Array.isArray(value)){
    				angular.forEach(value, function(value1, key1) {
    					urlArmada = urlArmada+((parameters == 0)?'?':'&')+key+"="+value1;
    					parameters++;
    				});
    			} else {
    				urlArmada = urlArmada+((parameters == 0)?'?':'&')+key+"="+value;
    			}
    		  
    		  parameters++;
    	});
    	
    	if(page == 0 || page){
    		urlArmada = urlArmada+((parameters == 0)?'?':'&')+"page="+page;
    		if(size){
    			urlArmada = urlArmada + "&size="+size;
    			if(sort && sort.length && sort.length > 0){
    				for(var i = 0; i < sort.length; i++){
    					urlArmada = urlArmada+"&sort="+sort[i].fieldName+","+sort[i].order;
    				}
    			}
    		}
    	}
    	return $http({
            method : 'GET',
            url : urlArmada,
            ignoreLoadingScreed : params.ignoreLoadingScreed
        });
    }
    
} ]);
app.filter('metafilter', function($filter) {
	  return function(value, filterSpec) {
	    var args = filterSpec.split(':');
	    if(args.length <= 2){
	    	var filter = $filter(args.shift());
	    	args.unshift(value);
	    	return filter.apply(null, args);
	    } else {
	    	var filter = $filter(args.shift());
	    	var valorFiltro = filterSpec.substring(filterSpec.indexOf(":")+1, filterSpec.length).trim();
	    	args = [];
	    	args[0] = value;
	    	args[1] = valorFiltro;
	    	return filter.apply(null, args);
	    }
	  };
});

app.service('ModalService', ['$uibModal','$http',
	// NB: For Angular-bootstrap 0.14.0 or later, use $uibModal above instead of $modal
	function ($uibModal,$http) {

	    var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta("_ctx")+"public/utils/modal.html"
	    };

	    var modalOptions = {
	        closeButtonText: 'Cancelar',
	        actionButtonText: 'Continuar',
	        headerText: 'Confirmar',
	        bodyText: 'Confirme la accion?'
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
	            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
	            	console.log(tempModalOptions);
	                $scope.modalOptions = tempModalOptions;
	                if($scope.modalOptions.urlMotivos){
	    	        	var _csrf = getMeta('_csrf');
	                	var _csrf_header = getMeta('_csrf_header');
	                	var header = {};
	                	header[_csrf_header]=_csrf;
	                	$http({
	                	  method : 'GET',
	                	  url : $scope.modalOptions.urlMotivos,
	                	  headers: header
	                	}).then(function(response) {
	                		$scope.motivos = response.data._embedded.records;
	                		$scope.motivos.push({alias:'Otro'});
	                	});
	    	        }
	                $scope.modalOptions.ok = function (result) {
	                	result = {};
	                	result.motivoAccion = ($scope.motivoAccion == 'Otro')?$scope.motivoAccionText:$scope.motivoAccion;
	                	$uibModalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                	$uibModalInstance.dismiss('cancel');
	                };
	            };
	        }

	        return $uibModal.open(tempModalDefaults).result;
	    };

	}]);

app.service('ModalSolicitudService', ['$uibModal','$http',
	// NB: For Angular-bootstrap 0.14.0 or later, use $uibModal above instead of $modal
	function ($uibModal,$http) {

	    var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: getMeta("_ctx")+"public/utils/modalSolicitud.html"
	    };

	    var modalOptions = {
	        closeButtonText: 'Cancelar',
	        actionButtonText: 'Continuar',
	        headerText: 'Confirmar',
	        bodyText: 'Confirme la accion?'
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
	            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
	            	$scope.fileName = "Seleccione un Archivo";
	            	//console.log(tempModalOptions);
	            	
	            	$scope.cargaArchivo = function(){
	            		var archivos = document.getElementById("tablaAmortizacion");
	            		console.log(archivos);
	            		if(archivos.files.length > 0){
	            			var file = archivos.files[0]; 
	            			$scope.fileName = file.name;
	            			$scope.archivo = file;
	            			$scope.$apply();
	            		} else {
	            			$scope.fileName = "Seleccione un Archivo";
	            			$scope.archivo = undefined;
	            		}
						
	            	}
	            	
	                $scope.modalOptions = tempModalOptions;
	                
	                if($scope.modalOptions.responsable){
	                	console.log("se debe asignar responsable")
	                }
	                
	                if($scope.modalOptions.urlMotivos){
	    	        	var _csrf = getMeta('_csrf');
	                	var _csrf_header = getMeta('_csrf_header');
	                	var header = {};
	                	header[_csrf_header]=_csrf;
	                	$http({
	                	  method : 'GET',
	                	  url : $scope.modalOptions.urlMotivos,
	                	  headers: header
	                	}).then(function(response) {
	                		$scope.motivos = response.data._embedded.records;
	                		$scope.motivos.push({alias:'Otro'});
	                	});
	    	        }
	                
	                if($scope.modalOptions.asignarResponsable){
	                	var _csrf = getMeta('_csrf');
	                	var _csrf_header = getMeta('_csrf_header');
	                	var header = {};
	                	header[_csrf_header]=_csrf;
	                	$http({
		                	  method : 'GET',
		                	  url : getMeta('_ctx')+"bridge-rest?url=UsuarioDatosAdicionales/search/findByRolesAndApp&app=calculadoraTasas&page=0&size=1000&roles="+$scope.modalOptions.asignarResponsable,
		                	  headers: header
		                	}).then(function(response) {
		                		$scope.responsables = response.data._embedded.records
		                	});
	                }
	                
	                $scope.modalOptions.ok = function (result) {
	                	result = {};
	                	result.motivoAccion = $scope.motivoAccion == undefined ? '' : ($scope.motivoAccion == 'Otro')?$scope.motivoAccionText:$scope.motivoAccion;
	                	if($scope.archivo){
	                		var archivos = document.getElementById("tablaAmortizacion");
	                		var file = archivos.files[0]; 
	                		result.file = file;
	                	}
	                	if($scope.modalOptions.asignarDato){
	                		result.datoAsignado = $scope.datoAsignado;
	                		result.asignarDato = $scope.modalOptions.asignarDato;
	                	}
	                	if($scope.modalOptions.asignarResponsable){
	                		result.responsable = $scope.responsable;
	                		result.asignarResponsable = $scope.modalOptions.asignarResponsable;
	                	}
	                	$uibModalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                	$uibModalInstance.dismiss('cancel');
	                };
	            };
	        }

	        return $uibModal.open(tempModalDefaults).result;
	    };

	}]);

app.directive('currencyMask', function() {
    				  return {
    					    restrict: 'A',
    					    require: 'ngModel',
    					    link: function(scope, element, attrs, ngModelController) {
    					      
    					      var formatNumber = function(value) {
    					     
    					        value = value.toString();
    					        value = value.replace(/[^0-9\.]/g, "");
    					        var parts = value.split('.');
    					        parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
    					        if (parts[1] && parts[1].length > 2) {
    					          parts[1] = parts[1].substring(0, 2);
    					        }
    					       
    					        return parts.join(".");
    					      };
    					      var applyFormatting = function() {
    					        var value = element.val();
    					        var original = value;
    					        if (!value || value.length == 0) {
    					          return
    					        }
    					        value = formatNumber(value);
    					        if (value != original) {
    					          element.val(value);
    					          element.triggerHandler('input')
    					        }
    					      };
    					      element.bind('keyup', function(e) {
    					        var keycode = e.keyCode;
    					        var isTextInputKey =
    					          (keycode > 47 && keycode < 58) || // number keys
    					          keycode == 32 || keycode == 8 || // spacebar or
    																// backspace
    					          (keycode > 64 && keycode < 91) || // letter keys
    					          (keycode > 95 && keycode < 112) || // numpad
    																	// keys
    					          (keycode > 185 && keycode < 193) || // ;=,-./`
    																	// (in
    																	// order)
    					          (keycode > 218 && keycode < 223); // [\]' (in
    																// order)
    					        if (isTextInputKey) {
    					          applyFormatting();
    					        }
    					      });
    					      element.bind('blur', function(evt) {
    					        if (angular.isDefined(ngModelController.$modelValue)) {
    					          var val = ngModelController.$modelValue.split('.');
    					          if (val && val.length == 1) {
    					            if (val != "") {
    					              ngModelController.$setViewValue(val + '.00');
    					              ngModelController.$render();
    					              applyFormatting();
    					            }
    					          } else if (val && val.length == 2) {
    					            if (val[1] && val[1].length == 1) {
    					              ngModelController.$setViewValue(val[0] + '.' + val[1] + '0');
    					              ngModelController.$render();
    					            } else if (val[1].length == 0) {
    					              ngModelController.$setViewValue(val[0] + '.00');
    					              ngModelController.$render();
    					            }
    					            applyFormatting();
    					          }
    					        }
    					      })
    					      ngModelController.$parsers.push(function(value) {
    					        if (!value || value.length == 0) {
    					          return value;
    					        }
    					        value = value.toString();
    					        value = value.replace(/[^0-9\.]/g, "");
    					        return value;
    					      });
    					      ngModelController.$formatters.push(function(value) {
    					        if (!value || value.length == 0) {
    					          return value;
    					        }
    					        value = formatNumber(value);
    					        return value;
    					      });
    					    }
    					  };
    					});
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});