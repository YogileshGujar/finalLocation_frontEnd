
import React, { useEffect, useRef } from "react";

const MidPoint = () => {

    let locations = [
        { latitude: 40.748817, longitude: -73.985428 }, // New York City
        { latitude: 34.052235, longitude: -118.243683 }, // Los Angeles
        { latitude: 51.507351, longitude: -0.127758 } // London
      ];
      const mapRef = useRef(null);

    // Initialize the map
    useEffect(() => {
        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 2,
            center: { lat: 0, lng: 0 },
          });
    
          // Calculate the midpoint
          const midpoint = getMidpoint(locations);
    
          // Add a marker for the midpoint
          const marker = new window.google.maps.Marker({
            position: midpoint,
            map: map,
            title: "Midpoint",
          });
    // Center the map on the midpoint
    map.setCenter(midpoint);
        }
  }, [locations]);





   
        
      function getMidpoint(locations) {
        let totalLatitude = 0;
        let totalLongitude = 0;
      
        for (let i = 0; i < locations.length; i++) {
          totalLatitude += locations[i].latitude;
          totalLongitude += locations[i].longitude;
        }
      
        const midpointLatitude = totalLatitude / locations.length;
        const midpointLongitude = totalLongitude / locations.length;
      
        return { latitude: midpointLatitude, longitude: midpointLongitude };
      }
    
    
       let midpoint = getMidpoint(locations);
       console.log(`Midpoint: (${midpoint.latitude}, ${midpoint.longitude})`);

  return (
   <>
   
    <div>
       <div
      ref={mapRef}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    />
     
      
    </div>
   </> 
   
  )
}

export default MidPoint




