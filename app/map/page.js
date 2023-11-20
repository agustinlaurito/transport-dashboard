'use server'

import dynamic from 'next/dynamic'

const URL = `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=${process.env.NEXT_API_CLIENT_ID}&client_secret=${process.env.NEXT_API_CLIENT_SECRET}`;

export const LazyMap = dynamic(() => import('@/components/map/MapComponent'), { ssr: false });


async function getData() {

	const res = await fetch(URL)
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json();
}


export default async function Page() {

	const vehicles = await getData();

	let markers = [];

	vehicles.forEach(vehicle => {

		markers.push({
			id: vehicle.id,
			name: `${vehicle.agency_name} - ${vehicle.id}`,
			position: [vehicle.latitude, vehicle.longitude],
			flights: 1
		});

	});



	return (
		<>
			<LazyMap markers={markers} />
		</>
	)

};

