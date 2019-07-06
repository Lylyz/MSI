app.controller('myCtrl', function($scope, $http, $rootScope,$uibModal,$rootScope, toastr, $loadingOverlay){
	$rootScope.toastr = toastr;
	$rootScope.$loadingOverlay = $loadingOverlay;

	$scope.selectedConfiguracion=0;
	
	$scope.initView = true;

	$scope.isActiveToggle = false;
	$scope.toggleSidebarMenu = function(escopeta){
		$scope.isActiveToggle = escopeta;
	};

	$scope.isActive = false;
	$scope.toggleMenu = function(){
		$scope.isActive =  !$scope.isActive;
	};

	$scope.parseKey = function(key,value) {
		if(value instanceof String){
			return key;
		} else {
			return parseInt(key);
		}
    }
	
	$scope.getTemplate = function(){
		var url = ($scope.configuracion[$scope.selectedConfiguracion].templateTabla)?$scope.configuracion[$scope.selectedConfiguracion].templateTabla:'private/catalogos/base.html';
		return url+"?index="+$scope.selectedConfiguracion;
	};
	
	$scope.configuracion = [
		{
			titulo			:	"Observaciones",
			templateTabla	:	"private/catalogos/base.html",
			urlResource		:	"rest/CatObservacion",
			formTemplate 	: 	"private/catalogos/formTemplate.html",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:1},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Pago a Capital",
			urlResource		:	"rest/CatPagoCapital",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'valor', fieldLabel:'Valor'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'valor', fieldLabel:'Valor', fieldType:'number', value:false},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Pago a Intereses",
			urlResource		:	"rest/CatPagoIntereses",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'valor', fieldLabel:'Valor'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'valor', fieldLabel:'Valor', fieldType:'number', value:false},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Tipo de Tasas",
			urlResource		:	"rest/CatTipoTasa",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Tipo de Creditos",
			urlResource		:	"rest/CatTipoCredito",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Aplicativo",
			urlResource		:	"bridge-rest?url=Aplicativo",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'aplicativo', fieldLabel:'Aplicativo', colStyle:{'text-align':'right'}},
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					{fieldName:'aplicativo', fieldLabel:'Aplicativo', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Roles",
			urlResource		:	"bridge-rest?url=Role",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
				aplicativo 		:	{ url: "bridge-rest?url=Aplicativo"},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'aplicativo', fieldLabel:'Aplicativo', recurso:'aplicativo'},
						  {fieldName:'role', fieldLabel:'Role', colStyle:{'text-align':'right'}},
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					{fieldName:'aplicativo', fieldLabel:'Aplicativo', fieldType:'select', recurso:'aplicativo'},
					{fieldName:'role', fieldLabel:'Role', fieldType:'text', maxlength:80, required:true, minlength:2},
					{fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					{fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Proceso",
			urlResource		:	"rest/Proceso",
			recursos:{
				estado 		:	{ url: "rest/Estado"},
				estatus 	:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'estadoInicial', fieldLabel:'Estado Inicial', recurso:'estado'},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'estadoInicial', fieldLabel:'Estado Inicial', fieldType:'select', recurso:'estado'},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Estado",
			urlResource		:	"rest/Estado",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'alias', fieldLabel:'Alias', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'alias', fieldLabel:'Alias', fieldType:'text', maxlength:200, required:true, minlength:2},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Motivo",
			urlResource		:	"rest/Motivo",
			recursos:{
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'alias', fieldLabel:'Alias', colStyle:{'text-align':'right'}},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'alias', fieldLabel:'Alias', fieldType:'text', maxlength:200, required:true, minlength:2},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Evento",
			urlResource		:	"rest/Evento",
			recursos:{
				siNo 			:	{options: {true:"Si",false:"No"}},
				estatus 		:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'descripcion', fieldLabel:'Descripción', colStyle:{'text-align':'right'}},
						  {fieldName:'alias', fieldLabel:'Alias', colStyle:{'text-align':'right'}},
						  {fieldName:'requiereDesc', fieldLabel:'Requiere Motivo', recurso:'siNo'},
						  {fieldName:'estatus', fieldLabel:'Activo', recurso:'estatus'},
						  {fieldName:'createdBy', fieldLabel:'Creado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'creationDate', fieldLabel:'Fecha Creación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
					  {fieldName:'descripcion', fieldLabel:'Descripción', fieldType:'text', maxlength:80, required:true, minlength:2},
					  {fieldName:'alias', fieldLabel:'Alias', fieldType:'text', maxlength:200, required:true, minlength:2},
					  {fieldName:'requiereDesc', fieldLabel:'Requiere Motivo', fieldType:'checkbox', value:true},
					  {fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false},
					  {fieldName:'requiereAdjunto', fieldLabel:'Requiere Adjunto', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Transicion",
			urlResource		:	"rest/Transicion",
			recursos		:{
				estado 		:	{ url: "rest/Estado", options: {}, field:{id:'id',descripcion:'alias'}},
				evento 		:	{ url: "rest/Evento"},
				estatus 	:	{options: {true:"Activo",false:"Inactivo"}},
				proceso 	:	{ url: "rest/Proceso"},
				siNo 		:	{options: {true:"Si",false:"No"}}
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'proceso', fieldLabel:'Proceso' , recurso:'proceso'},
						  {fieldName:'estadoFrom', fieldLabel:'Del Estado', recurso:'estado'},
						  {fieldName:'evento', fieldLabel:'Con Evento', recurso:'evento'},
						  {fieldName:'estadoTo', fieldLabel:'Al Estado', recurso:'estado'},
						  {fieldName:'estatus', fieldLabel:'Activo' , recurso:'estatus'},
						  {fieldName:'esFinal', fieldLabel:'Es Final' , recurso:'siNo'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
						{fieldName:'proceso', fieldLabel:'Proceso', fieldType:'select', recurso:'proceso'},
						{fieldName:'estadoFrom', fieldLabel:'Del Estado', fieldType:'select', recurso:'estado'},
						{fieldName:'evento', fieldLabel:'Con Evento', fieldType:'select', recurso:'evento'},
						{fieldName:'estadoTo', fieldLabel:'Al Estado', fieldType:'select', recurso:'estado'},
						{fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false},
						{fieldName:'esFinal', fieldLabel:'Es Final', fieldType:'checkbox', value:false}
				]
			}
		},
		{
			titulo			:	"Transicion-Role",
			urlResource		:	"rest/TransicionRole",
			recursos		:{
				estado 		:	{ url: "rest/Estado",field:{id:'id',descripcion:'alias'}},
				evento 		:	{ url: "rest/Evento",field:{id:'id',descripcion:'alias'}},
				roles 		:	{ url: "bridge-rest?url=Role/search/findByAplicativo&aplicativo=1", field:{id:'role',descripcion:'descripcion'}},
				transicion 	:	{ url: "rest/Transicion", field:{id:'id',descripcion:'estadoFrom'}},
				estatus 	:	{options: {true:"Activo",false:"Inactivo"}},
			},
			table : {
					  sizes:[10,20,25,50,100],
					  page:{size:10,number:0,sort:[{fieldName:'creationDate',order:'asc'}],params:{}},
					  records:[],
					  model:[
						  {fieldName:'role', fieldLabel:'Role' , recurso:'roles'},
						  {fieldName:'transicion', fieldLabel:'Transicion', recurso:'transicion'},
						  {fieldName:'estatus', fieldLabel:'Activo' , recurso:'estatus'},
						  {fieldName:'lastModifiedBy', fieldLabel:'Modificado Por',colStyle:{'text-align':'right'}},
						  {fieldName:'lastModifiedDate', fieldLabel:'Fecha Modificación', colStyle:{'text-align':'right'}, formatter:'date: dd/MM/yyyy HH;mm;ss'}
						  
					  ],
					  sortBy:{fieldName:'creationDate',order:'asc'}
			},
			form : {
				model:[
						{fieldName:'role', fieldLabel:'Role', fieldType:'select', recurso:'roles'},
						{	
							fieldName:'transicion', 
							fieldLabel:'Transicion', 
							fieldTemplate:'private/catalogos/customTemplates/transicionTemplate.html', 
							recurso:'transicion'
						},
						{fieldName:'estatus', fieldLabel:'Activo', fieldType:'checkbox', value:false}
				]
			}
		},
	];
	
});

app.controller("CatalogoBaseController", ['$scope', '$http','$uibModal','$filter','CRUDService','ModalService','$rootScope', 'toastr', '$loadingOverlay', '$compile', catalogoBaseController]);
function catalogoBaseController($scope, $http,$uibModal,$filter,CRUDService,ModalService,$rootScope, toastr, $loadingOverlay,$compile) {
	var db = this;
	db.configuracion = $scope.$parent.$parent.configuracion[$scope.$parent.$parent.selectedConfiguracion];
	db.recursos = db.configuracion.recursos;
	angular.forEach(db.recursos, function(recurso, key) {
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
	
	db.servicioRest = CRUDService.setUrl(db.configuracion.urlResource);
	db.table = db.configuracion.table;
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
	
	db.loadTable = function() {
		  db.servicioRest.getElements(db.table.page.params,db.table.page.number,db.table.page.size,db.table.page.sort).then (
				  function success(response){
					  var coleccion = (db.configuracion.coleccion)?db.configuracion.coleccion:'records';
					  var dataPage = response.data.page;
					  dataPage.params = db.table.page.params;
					  dataPage.sort = db.table.page.sort; 
					  db.table.page = dataPage;
					  db.table.records = response.data._embedded[coleccion];
				  },
				  function error(response){
				  }
		  );
	  };
	  
	  db.viewElement = function(element) {
		  var formTemplate = (db.configuracion.formTemplate)?db.configuracion.formTemplate:'private/catalogos/formTemplate.html';
		  var modal = $uibModal.open({
    		  size: 'lg',
    	      templateUrl: formTemplate,
    	      controller: 'FormElementController',
    	      resolve:{
    	    	  element: function(){
    	    		  return element;
    	    	  },
    	    	  configuracion: function(){
    	    		  return db.configuracion;
    	    	  },
    	    	  servicioRest: function(){
    	    		  return db.servicioRest;
    	    	  },
    	    	  modo: function(){
    	    		  return "VIEW";
    	    	  }
    	      }
		  }).result.then(function (selectedItem) {
			  db.loadTable();
		  }, function () {
			  
		  });;
	  };
	  
	  db.editElement = function(element) {
		  var formTemplate = (db.configuracion.formTemplate)?db.configuracion.formTemplate:'private/catalogos/formTemplate.html';
		  var modal = $uibModal.open({
    		  size: 'lg',
    	      templateUrl: formTemplate,
    	      controller: 'FormElementController',
    	      resolve:{
    	    	  element: function(){
    	    		  return element;
    	    	  },
    	    	  configuracion: function(){
    	    		  return db.configuracion;
    	    	  },
    	    	  servicioRest: function(){
    	    		  return db.servicioRest;
    	    	  },
    	    	  modo: function(){
    	    		  return "EDIT";
    	    	  }
    	      }
		  }).result.then(function (selectedItem) {
			  db.loadTable();
		  }, function () {
			  
		  });;
	  };
	  
	  db.deleteElement = function(element) {
		  var href= element._links.self.href;
		  var modalOptions = {
			closeButtonText: 'Cancelar',
			actionButtonText: 'Borrar Elemento',
			headerText: '¿Desea borrar el elemento?',
			bodyText: '¿Esta seguro de borrar el elemento?'
		  };
		  ModalService.showModal({}, modalOptions).then(function (result) {
			  db.servicioRest.deleteElementByUrl(href).then (
		    	function success(response){
		    	  $rootScope.toastr.success("Se eliminó el elemento", 'Se borró el elemento');
		    	  db.loadTable();
		    	},
		    	function error(response){
		    	}
	    	  );
	      });
	  };
	  
	  db.addElement = function() {
		  var formTemplate = (db.configuracion.formTemplate)?db.configuracion.formTemplate:'private/catalogos/formTemplate.html';
		  var modal = $uibModal.open({
    		  size: 'lg',
    	      templateUrl: formTemplate,
    	      controller: 'FormElementController',
    	      resolve:{
    	    	  element: function(){
    	    		  return undefined;
    	    	  },
    	    	  configuracion: function(){
    	    		  return db.configuracion;
    	    	  },
    	    	  servicioRest: function(){
    	    		  return db.servicioRest;
    	    	  },
    	    	  modo: function(){
    	    		  return "CREATE";
    	    	  }
    	      }
		  }).result.then(function (selectedItem) {
			  db.loadTable();
		  }, function () {
			  
		  });;
	  };
	  
	db.compileField = function(field){
		return "{{(field.formatter)? (record[field.fieldName] | metafilter:field.formatter): record[field.fieldName]}}";
	};
	  
	$scope.$watch('db.table.page', function(n,o){
		db.loadTable();
	},true);
	db.loadTable();
};

app.controller("FormElementController", ['element','configuracion','servicioRest','modo','$scope', '$http','$uibModal','$filter','CRUDService','ModalService','$rootScope', 'toastr', '$loadingOverlay','$uibModalInstance','$parse', formElementController]);
function formElementController(element, configuracion, servicioRest, modo, $scope, $http,$uibModal,$filter,CRUDService,ModalService,$rootScope, toastr, $loadingOverlay,$uibModalInstance,$parse) {
	$scope.descripcion = {
			"CREATE":"Agregar",
			"EDIT":"Editar",
			"VIEW":"Ver",
	};
	$scope.configuracion = configuracion;
	$scope.recursos = configuracion.recursos;
	$scope.modo = modo;
	$scope.modelData = (element)?element:{};
	$scope.servicioRest = CRUDService.setUrl(configuracion.urlResource);
	$scope.defaultDateOptions = {
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(2000, 1, 1),
	};
	$scope.defaultAltInputFormats = ['d!/M!/yyyy'];
	
	
	$scope.getFieldTemplateUrl = function(field){
		var fieldType = (field.fieldType) ? field.fieldType : "text";
		return (field.fieldTemplate)?field.fieldTemplate:"private/catalogos/inputTemplates/"+fieldType+"Template.html";
	};
	
	$scope.edit = function () {
		$scope.servicioRest.updateElementByUrl($scope.modelData._links.self.href,$scope.modelData).then (
				function success(response){
					$rootScope.toastr.success("Se editó el elemento", 'Cambios Realizados');
					$uibModalInstance.close();
			    },
			    function error(response){
			    	angular.forEach(response.data.errors, function(value, key) {
			    		  var fieldName = value.property;
			    		  var message = value.message;
			    		  var serverMessage = $parse('form.'+fieldName+'.$error.serverMessage');
			    		  $scope.form.$setValidity(fieldName, false, $scope.form);
		                  serverMessage.assign($scope, message);
			    	});
			    }
		);
	};
	
	$scope.parseKey = function(key,value) {
		if(isNaN(value)){
			return key;
		} else {
			return parseInt(key);
		}
    }
	
	$scope.save = function () {
		$scope.servicioRest.addElement($scope.modelData).then (
				function success(response){
					$rootScope.toastr.success("Se agregó el elemento", 'Cambios Realizados');
					$uibModalInstance.close();
			    },
			    function error(response){
			    	angular.forEach(response.data.errors, function(value, key) {
			    		  var fieldName = value.property;
			    		  var message = value.message;
			    		  var serverMessage = $parse('form.'+fieldName+'.$error.serverMessage');
			    		  $scope.form.$setValidity(fieldName, false, $scope.form);
		                  serverMessage.assign($scope, message);
			    	});
			    }
		);
		//$uibModalInstance.close();
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};

app.directive("compileTd", ["$compile", '$http', '$templateCache', function ($compile, $http, $templateCache) {
    return {
        restrict: 'A',
        scope: {
        	record: "=",
        	model: "="
        },
        link: function (scope, element, attrs) {
            function getTemplate(template) {
                $http.get(template, {cache: $templateCache}).then(function (templateContent) {
                    element.replaceWith($compile(templateContent)(scope));
                });
            }
            scope.$watch(attrs.template, function () {
                if (attrs.template) {
                    getTemplate(attrs.template);
                }
            });


        }
    }
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);