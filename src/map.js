/*
 *** Настройки ***
*/

// Путь к папке с tile'ами топоосновы
var PATH_TO_TILES_FOLDER = "http://old.lenobl.ru/map/tiles/";

// Путь к папке с xml-файлами описаний границ
// Папка должна содержать файл bounds.xml, а также указанный в нем перечень ID.xml файлов
var PATH_TO_BOUNDS_FOLDER = "http://old.lenobl.ru/map/bounds/";

// Параметры отображения границ
var BOUNDS_COLOR = "#FF0000";		// Цвет линий границ
var BOUNDS_WEIGHT = 2;				// Толщина линий границ (в пикселях)
var BOUNDS_OPACITY = 1.0;			// Прозрачность линий границ (диапазон от 0 до 1)

/*
 *** Конец настроек ***
 Последующий код редактировать на свой страх и риск
*/

// Инициализация карты
function initialize() {
	lo_center = new google.maps.LatLng(59.975,31.348);
	
	var lo_MapType = new CustomMapType();
	
	var lo_MapType_mini = new CustomMapType();
	lo_MapType_mini.maxZoom = 7;
	lo_MapType_mini.minZoom = 5;
	
	polyline = new Array();
	selected_group_id = 'none';
	selected_element_id = 'none';
	
	var mapOptions = {
		zoom: 7,
		center: lo_center,
		navigationControl: true,
		scaleControl: true,
		mapTypeControl: true,
		streetViewControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.DEFAULT 
		},
		mapTypeControlOptions: {
			mapTypeIds: ['lo_map', google.maps.MapTypeId.SATELLITE]
		}
	}
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var overlayMap = new google.maps.Map(
		document.getElementById('overlay_map'), {
		mapTypeId: 'lo_map_mini', 
		zoom: 5,
		disableDefaultUI: true,
		disableDoubleClickZoom: true,
		scrollwheel: false
	});

 	google.maps.event.addListener(map, 'zoom_changed', function() {
		var newZoom = Math.max(map.getZoom() - 4, 5);
		if (overlayMap.getZoom() != newZoom) overlayMap.setZoom(newZoom);
	});

	overlayMap.bindTo('center', map, 'center');

	var overDiv = overlayMap.getDiv();
	map.getDiv().appendChild(overDiv);
	overDiv.style.position = "absolute";
	overDiv.style.right = "0px";
	overDiv.style.bottom = "0px";
	overDiv.style.zIndex = 10;

	google.maps.event.addListener(overlayMap, 'idle', function() {
		overlayMap.getDiv().style.zIndex = 10;
	});
	
	var homeControlDiv = document.createElement('DIV');
	var homeControl = new HomeControl(homeControlDiv, map);

	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

	overlayMap.mapTypes.set('lo_map_mini', lo_MapType_mini);
	map.mapTypes.set('lo_map', lo_MapType);
	map.setMapTypeId('lo_map');
	
	var overlayPath = new google.maps.Polygon({
		strokeColor: "#0000FF",
		strokeOpacity: 0.7,
		strokeWeight: 1,
		fillColor: "#0000FF",
		fillOpacity: 0.1
	});
	
	google.maps.event.addListener(map, 'zoom_changed', function() {	
		if (map.getZoom() < 8){
			overlayPath.setMap(null);
		} else {
			overlayPath.setMap(overlayMap);
		}
	});
	
	google.maps.event.addListener(map, 'bounds_changed', function() {	
		currentViewBounds = map.getBounds();
		var overlayPoints = [
			new google.maps.LatLng(currentViewBounds.getNorthEast().lat(), currentViewBounds.getNorthEast().lng()),
			new google.maps.LatLng(currentViewBounds.getNorthEast().lat(), currentViewBounds.getSouthWest().lng()),
			new google.maps.LatLng(currentViewBounds.getSouthWest().lat(), currentViewBounds.getSouthWest().lng()),
			new google.maps.LatLng(currentViewBounds.getSouthWest().lat(), currentViewBounds.getNorthEast().lng())
		];
		overlayPath.setPath(overlayPoints);
	});
	
	bounds_init();
}

// Custom-карта для Goolge Maps API
function CustomMapType() {
}

CustomMapType.prototype.tileSize = new google.maps.Size(256,256);
CustomMapType.prototype.maxZoom = 12;
CustomMapType.prototype.minZoom = 7;

CustomMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
	var tile = ownerDocument.createElement('img');
	if (zoom==5 && coord.x>=18 && coord.x<=19 && coord.y>=9 && coord.y<= 9) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
	if (zoom==6 && coord.x>=36 && coord.x<=38 && coord.y>=18 && coord.y<= 19) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
	if (zoom==7 && coord.x>=73 && coord.x<=76 && coord.y>=36 && coord.y<= 38) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
	if (zoom==8 && coord.x>=146 && coord.x<=153 && coord.y>=72 && coord.y<= 76) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
	if (zoom==9 && coord.x>=293 && coord.x<=306 && coord.y>=144 && coord.y<= 153) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
	if (zoom==10 && coord.x>=587 && coord.x<=613 && coord.y>=289 && coord.y<= 306) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
	if (zoom==11 && coord.x>=1175 && coord.x<=1227 && coord.y>=579 && coord.y<= 612) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
	if (zoom==12 && coord.x>=2350 && coord.x<=2454 && coord.y>=1158 && coord.y<= 1226) {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + zoom + "_" + coord.x + "_" + coord.y + ".png");
	} else {
		tile.setAttribute("src", PATH_TO_TILES_FOLDER + "blank.png");
	}}}}}}}}
	tile.setAttribute("alt", "Идет загрузка...");
	return tile;
};

CustomMapType.prototype.name = "Карта";
CustomMapType.prototype.alt = "Карта Ленинградской области";

// Обработка bounds.xml
function bounds_init(){
	downloadUrl(PATH_TO_BOUNDS_FOLDER+"bounds.xml", function(data) {
		districts = new Array();
		side_bar_html ='';
		var d = data.documentElement.getElementsByTagName("d");
		for (var i = 0; i < d.length; i++) {
		    side_bar_html += "<div class='side_bar_header' id='side_bar_header_"+i+"' onClick='district_click("+i+")'>" + d[i].getAttribute("name") + "</div><div class='side_bar_group' id='side_bar_group_"+i+"' style='display:none'>";
			var g = d[i].getElementsByTagName("g");
			for (var j = 0; j < g.length; j++) {
				side_bar_html += "<div class='side_bar_category'>" + g[j].getAttribute("name") + "</div>";
				var b = g[j].getElementsByTagName("b");
				for (var k = 0; k < (b.length); k++) {
					side_bar_html += '<div class="side_bar_element" id="side_bar_element_'+i+'_'+b[k].getAttribute("id")+'" onClick="load_bound(&quot;'+b[k].getAttribute("id")+'&quot;, &quot;'+i+'&quot;)">'+b[k].getAttribute("name")+'</div>';
				}
			}
			side_bar_html += "</div>"
		}
		
		document.getElementById("side_bar").innerHTML = side_bar_html;
	});
}

// Загрузка и отображение границы
function load_bound(id, key){
	downloadUrl(PATH_TO_BOUNDS_FOLDER+id+".xml", function(data) {
		if (selected_element_id != 'none') {
			document.getElementById("side_bar_element_" + selected_element_id).className = "side_bar_element";
		}
		document.getElementById("side_bar_element_" + key + "_" + id).className += " selected";
		selected_element_id = key + "_" + id;
		if (polyline.length > 0) {
			for (var i = 0; i < polyline.length; i++) {
				polyline[i].setMap(null);
			}
			polyline = Array();
		}
		var line = data.documentElement.getElementsByTagName("points");
		var area = new google.maps.LatLngBounds();
		for (var j = 0; j < line.length; j++) {
			var p = line[j].getElementsByTagName("p");
			var points = new Array();
			for (var i = 0; i < p.length; i++) {
				points[i] = new google.maps.LatLng(parseFloat(p[i].getAttribute("lat")), parseFloat(p[i].getAttribute("lng")));
				area.extend(points[i]);
			}
		
			polyline[j] = new google.maps.Polyline({
				path: points,
				strokeColor: BOUNDS_COLOR,
				strokeOpacity: BOUNDS_OPACITY,
				strokeWeight: BOUNDS_WEIGHT
			});
			polyline[j].setMap(map);
		}
		map.fitBounds(area);
	});
}

// Обработка щелчка на название района
function district_click(id){
	if (document.getElementById("side_bar_group_"+id).style.display=='none'){
		if (selected_group_id != 'none'){
			document.getElementById("side_bar_group_"+selected_group_id).style.display='none';
			document.getElementById("side_bar_header_"+selected_group_id).className="side_bar_header";
		}		
		document.getElementById("side_bar_group_"+id).style.display='block';
		document.getElementById("side_bar_header_"+id).className+=" selected";
		selected_group_id = id;
	} else{
		document.getElementById("side_bar_group_"+id).style.display='none';
		document.getElementById("side_bar_header_"+id).className="side_bar_header";
	}
}

// Сброс позиционирования карты к позиции по умолчанию
function HomeControl(controlDiv, map) {
	controlDiv.style.padding = '5px';

	var controlUI = document.createElement('DIV');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Показать всю карту Ленинградской области';
	controlDiv.appendChild(controlUI);

	var controlText = document.createElement('DIV');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = 'Показать всю карту';
	controlUI.appendChild(controlText);

	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.setCenter(lo_center)
		map.setZoom(7);
	});
}

// Реализация XMLHttp
function createXmlHttpRequest() {
	try {
		if (typeof ActiveXObject != 'undefined') {
			return new ActiveXObject('Microsoft.XMLHTTP');
		} else if (window["XMLHttpRequest"]) {
			return new XMLHttpRequest();
		}
	} catch (e) {
		changeStatus(e);
	}
	return null;
};

// Реализация XMLHttpRequest
function downloadUrl(url, callback) {
	var status = -1;
	var request = createXmlHttpRequest();
	if (!request) {
		return false;
	}

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			try {
				status = request.status;
			} catch (e) {
			}
			if (status == 200) {
				callback(request.responseXML, request.status);
				request.onreadystatechange = function() {};
			}
		}
	}
	request.open('GET', url, true);
	try {
		request.send(null);
	} catch (e) {
		changeStatus(e);
	}
};

// Парсинг XML
function xmlParse(str) {
	if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
		var doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.loadXML(str);
		return doc;
	}
	if (typeof DOMParser != 'undefined') {
		return (new DOMParser()).parseFromString(str, 'text/xml');
	}
	return createElement('div', null);
}