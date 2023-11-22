'use server'

import dynamic from 'next/dynamic'

const URL = `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=${process.env.NEXT_API_CLIENT_ID}&client_secret=${process.env.NEXT_API_CLIENT_SECRET}`;

export const LazyMap = dynamic(() => import('@/components/map/MapComponent'), { ssr: false });


async function getData() {

	console.log('Revaliodate!');
	const res = await fetch(URL, { next: { revalidate: 1000 } })

	if (!res.ok) {
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

