// styles
var borderColor = ["#4b4b4d", "#e54b4b", "#44669d", "#6fa858", "#ff9900"];
var mapStyles = [
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