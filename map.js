$(document).ready(function() {
  // Create the map
  var map = L.map('map').setView([24.9337997, 67.1124705], 4.5);

  // Add the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Read the CSV data and add markers with popups
  $.get('output_file.csv', function(data) {
    var rows = data.split('\n');
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i].split(',');
      var latitude = parseFloat(row[0]);
      var longitude = parseFloat(row[1]);
      var minNetField = parseFloat(row[2]);
      var maxNetField = parseFloat(row[3]);

      console.log("Latitude:", latitude, "Longitude:", longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        var marker = L.marker([longitude, latitude]).addTo(map);
        var popupContent = "<strong>Range of Net Magnetic Field:</strong><br>" + minNetField + " - " + maxNetField;
        // Show popup on mouseover
        marker.on('mouseover', function(e) {
            this.openPopup();
        });
          
        // Hide popup on mouseout
        marker.on('mouseout', function(e) {
        this.closePopup();
        });
        marker.bindPopup(popupContent, {
            className: 'custom-popup' // Add a custom class for styling
          });
      } else {
        console.log("Invalid latitude or longitude:", latitude, longitude);
      }
    }
  });
});
