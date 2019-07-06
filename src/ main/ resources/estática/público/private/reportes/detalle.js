app.controller('DetalleController', function($scope, $uibModalInstance, $http, $resource, $uibModal, $window, row, tipo, CRUDService){
	var vt = this;
	
	vt.table = {
			  sizes:[10,20,25,50,100],
			  page:{size:20,number:0,sort:[{fieldName:'fecha',order:'desc'}],params:{'estados': tipo, 'inicio': row.fecha, 'fin': row.fecha}},
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
	
	vt.close = function(index) {
		$uibModalInstance.close();
	};
	
	vt.downloadExcel = function(){
    	var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "detalle.xls");
    }
});