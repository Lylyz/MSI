app.controller('RemarcajeController', function($scope,$rootScope,$http) {
	var re = this;
	re.tasa = $rootScope.tasa;
	
	re.rules = {
			"fecha"		:	{
				ignore 	: true
			},
			"fijaFlat"	:	{
				label	:	"Fija Flat",
				ignore 	: 	false
			},
			"cof"	:	{
				label	:	"COF",
				ignore 	: 	false
			},
			"tiie"	:	{
				label	:	"TIIE",
				ignore 	: 	false
			},
			"tasa"	:	{
				label	:	"Tasa",
				ignore 	: 	false
			}
	};
	
	re.loadRemarcajes = function (){
		var url = getMeta('_ctx')+"rest/SolicitudRemarcaje/search/findByFolio?folio="+re.tasa.id+"&sort=fecha,asc";
		$http({
		    url: url, 
		    method: "GET"
		 }).then(function(response){
			 re.remarcajes = response.data._embedded.records;
		 });
	};
	
	re.expandRow = function(remarcaje,$index) {
		remarcaje.expanded = true;
		let remarcajeObject = JSON.parse(remarcaje.tasaPrevia);
		var expandedElement = {expandedRow:true, remarcaje:remarcajeObject, tasa : re.tasa};
		re.remarcajes.splice( $index+1, 0, expandedElement); 
	};
	
	re.contractRow = function(remarcaje,$index) {
		remarcaje.expanded = false;
		re.remarcajes.splice( $index+1, 1); 
	};
	
	re.loadRemarcajes();
});