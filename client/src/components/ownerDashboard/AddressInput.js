import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./AddressInput.css";

function AddressInput({ lat, lng }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAIGULR3p6qn-h-AStpV91ZSN-w-WlV98w"
  });
  const center = useMemo(() => ({ lat: lat || 18.52043, lng: lng || 73.856743 }), [lat, lng]);

  return (
    <div className="AddressInput">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
        >
          <MarkerF position={{ lat: lat || 18.52043, lng: lng || 72.856743 }}/>
        </GoogleMap>

      )}
    </div>
  );
}

export default AddressInput;