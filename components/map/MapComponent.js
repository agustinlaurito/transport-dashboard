'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility';
import L from 'leaflet';

const markerIcon = L.icon({
	iconUrl: "/images/marker.png",
	iconSize: [50, 50]
})

const MapComponent = ({markers}) => {

	return (
		<MapContainer center={[-34.87, -64.58]} zoom={4} style={{ height: '100vh' }}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				markers.map((marker, i) =>
					<Marker icon={markerIcon} key={i} position={marker.position}>
						<Popup>
							{marker.name}
						</Popup>
					</Marker>
				)
			}
		</MapContainer>
	)
}

export default MapComponent;
