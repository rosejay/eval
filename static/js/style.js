
var styles = [
				// yellow map
				[{
					stylers: [
						{ hue: "#f9f6e7" },
						{ saturation: 7 },
						{ lightness: 70 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}],

				// red map
				[{
					stylers: [
						{ hue: "#e87e80" },
						{ saturation: 46 },
						{ lightness: 80 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}],

				// blue map
				[{
					stylers: [
						{ hue: "#86c5cc" },
						{ saturation: 34 },
						{ lightness: 70 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}],

				// green map
				[{
					stylers: [
						{ hue: "#6fa858" },
						{ saturation: 48 },
						{ lightness: 70 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}],

				// orange map
				[{
					stylers: [
						{ hue: "#ff9900" },
						{ saturation: 80 },
						{ lightness: 80 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}]

			]



var markerstyles = [
					// grey style
					[{
						url: 'img/m1.png',
						textColor: '#ffffff',
						height: 53,
				        width: 52,
				        anchor: [14, 0],
						textSize: 10
					}, {
						url: 'img/m2.png',
						textColor: '#ffffff',
						height: 56,
				        width: 55,
				        anchor: [14, 0],
						textSize: 11
					}, {
						url: 'img/m3.png',
						textColor: '#ffffff',
						height: 66,
				        width: 65,
				        anchor: [25, 0],
						textSize: 12
					}, {
						url: 'img/m4.png',
						textColor: '#ffffff',
						height: 78,
				        width: 77,
				        anchor: [30, 0],
						textSize: 14
					}, {
						url: 'img/m5.png',
						textColor: '#ffffff',
						height: 90,
				        width: 89,
				        anchor: [35, 0],
						textSize: 16
					}], 

					// red style
					[{
						url: 'img/m11.png',
						textColor: '#ffffff',
						height: 53,
				        width: 52,
				        anchor: [14, 0],
						textSize: 10
					}, {
						url: 'img/m12.png',
						textColor: '#ffffff',
						height: 56,
				        width: 55,
				        anchor: [14, 0],
						textSize: 11
					}, {
						url: 'img/m13.png',
						textColor: '#ffffff',
						height: 66,
				        width: 65,
				        anchor: [25, 0],
						textSize: 12
					}, {
						url: 'img/m14.png',
						textColor: '#ffffff',
						height: 78,
				        width: 77,
				        anchor: [30, 0],
						textSize: 14
					}, {
						url: 'img/m15.png',
						textColor: '#ffffff',
						height: 90,
				        width: 89,
				        anchor: [35, 0],
						textSize: 16
					}],

					// blue style
					[{
						url: 'img/m21.png',
						textColor: '#ffffff',
						height: 53,
				        width: 52,
				        anchor: [14, 0],
						textSize: 10
					}, {
						url: 'img/m22.png',
						textColor: '#ffffff',
						height: 56,
				        width: 55,
				        anchor: [14, 0],
						textSize: 11
					}, {
						url: 'img/m23.png',
						textColor: '#ffffff',
						height: 66,
				        width: 65,
				        anchor: [25, 0],
						textSize: 12
					}, {
						url: 'img/m24.png',
						textColor: '#ffffff',
						height: 78,
				        width: 77,
				        anchor: [30, 0],
						textSize: 14
					}, {
						url: 'img/m25.png',
						textColor: '#ffffff',
						height: 90,
				        width: 89,
				        anchor: [35, 0],
						textSize: 16
					}],

					// green style
					[{
						url: 'img/m31.png',
						textColor: '#ffffff',
						height: 53,
				        width: 52,
				        anchor: [14, 0],
						textSize: 10
					}, {
						url: 'img/m32.png',
						textColor: '#ffffff',
						height: 56,
				        width: 55,
				        anchor: [14, 0],
						textSize: 11
					}, {
						url: 'img/m33.png',
						textColor: '#ffffff',
						height: 66,
				        width: 65,
				        anchor: [25, 0],
						textSize: 12
					}, {
						url: 'img/m34.png',
						textColor: '#ffffff',
						height: 78,
				        width: 77,
				        anchor: [30, 0],
						textSize: 14
					}, {
						url: 'img/m35.png',
						textColor: '#ffffff',
						height: 90,
				        width: 89,
				        anchor: [35, 0],
						textSize: 16
					}],

					// orange style
					[{
						url: 'img/m41.png',
						textColor: '#ffffff',
						height: 53,
				        width: 52,
				        anchor: [14, 0],
						textSize: 10
					}, {
						url: 'img/m42.png',
						textColor: '#ffffff',
						height: 56,
				        width: 55,
				        anchor: [14, 0],
						textSize: 11
					}, {
						url: 'img/m43.png',
						textColor: '#ffffff',
						height: 66,
				        width: 65,
				        anchor: [20, 0],
						textSize: 12
					}, {
						url: 'img/m44.png',
						textColor: '#ffffff',
						height: 78,
				        width: 77,
				        anchor: [24, 0],
						textSize: 14
					}, {
						url: 'img/m45.png',
						textColor: '#ffffff',
						height: 90,
				        width: 89,
				        anchor: [30, 0],
						textSize: 16
					}]
				]



var markerimage =['img/marker.png','img/marker2.png','img/marker3.png','img/marker4.png','img/marker5.png'];
var borderColor = ["#4b4b4d", "#e54b4b", "#44669d", "#6fa858", "#ff9900"];
var closeimage =['../img/close0.png','../img/close1.png','../img/close2.png','../img/close3.png','../img/close4.png'];

var fullimage =['../img/full0.png','../img/full1.png','../img/full2.png','../img/full3.png','../img/full4.png'];



