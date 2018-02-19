var map, lat, lng;

$(function(){

var coordenadas = [];
        
localStorage['Ruta'] = (localStorage['Ruta'] || null );
/* se convierte el array json en un objetoJS */
coordenadas = JSON.parse(localStorage['Ruta']);
/* guardar coordenadas en array*/
function guardar()  { 
	localStorage['Ruta'] = JSON.stringify(coordenadas);
}; 
/*dibuja linea entre coordenadas recuperadas*/
function trazar(){
var newLat, newLng;
for (i=0; i<coordenadas.length; i++){
	newLat = coordenadas[i][0];
        newLng = coordenadas[i][1];
        map.drawRoute({
        	origin: [lat, lng], 
                destination: [newLat,newLng],
                travelMode: 'driving',
                strokeColor: '#000000',
                strokeOpacity: 0.6,
                strokeWeight: 5
                });
	lat = newLat;  
        lng = newLng;
	map.addMarker({ lat: lat, lng: lng}); 
	};
};
/*idem trazar sesión actual*/
function enlazarMarcador(e){
map.drawRoute({
	origin: [lat, lng], 
	destination: [e.latLng.lat(), e.latLng.lng()],
        travelMode: 'driving',
        strokeColor: '#000000',
        strokeOpacity: 0.6,
        strokeWeight: 5
        });
lat = e.latLng.lat();   
lng = e.latLng.lng();
map.addMarker({ lat: lat, lng: lng});  
var tam;
if (coordenadas !== null) 
	tam = coordenadas.length; 
else{
        tam = 0; 
        coordenadas= [];
        };
coordenadas[tam]= [lat,lng];
//localStorage['Ruta'] = JSON.stringify(coordenadas);
guardar();
};
/*centra el mapa en tu posicion y comprueba que el objeto JS contenga coordenadas, si es asi las recupera*/
function geolocalizar(){
GMaps.geolocate({
	success: function(position){
		lat = position.coords.latitude;  
		lng = position.coords.longitude;
                map = new GMaps({ 
                el: '#map',
                lat: lat,
                lng: lng,
                click: enlazarMarcador,
                tap: enlazarMarcador
                });
               map.addMarker({ lat: lat, lng: lng}); 
             if (coordenadas !== null) {
              trazar();
             }
	},
error: function(error) { alert('Geolocalización falla: '+error.message); },
not_supported: function(){ alert("Su navegador no soporta geolocalización"); }
});
};
$("#inicializar").on('click', function(){ localStorage['Ruta'] = null; coordenadas = null; } );
geolocalizar();
});
