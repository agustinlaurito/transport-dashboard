'use server'

import { Card, CardHeader, Divider, CardBody, CardFooter, Link, Image, Pagination, PaginationItem, PaginationCursor } from "@nextui-org/react";

const URL = `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=b702d74fc7284453ab7bb25e1d87926e&client_secret=2899E8790BE446a8bAf24bbFFecC2Ca3`;

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	if (d < 1) {
		return { distance: (d * 1000).toFixed(2), unit: 'Metros' };
	} else {
		return { distance: d.toFixed(2), unit: 'KM' };
	}
}

function timeSinceUpdate(vehicleTimestamp) {
	const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
	const diffInSeconds = now - vehicleTimestamp;
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	return diffInMinutes <= 1 ? 'Hace un minuto' : `Hace ${diffInMinutes} minutos`;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

export default async function Page() {

	async function fetchVehicles() {
		try {
			const response = await fetch(URL, { cache: 'no-cache' });

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();

		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	}

	const vehicles = await fetchVehicles();

	return(
		<div className="light bg-gradient-to-r from-blue-300 to-blue-400">

			<div className="flex flex-col justify-center px-6 gap-6 py-6">
				{
					vehicles.reverse().slice(0, 10).map((vehicle, i) => {

						const updatedTime = timeSinceUpdate(vehicle.timestamp);

						return(
							<Card
								key={i}
								isBlurred
								className="border-none bg-background dark:bg-default-100/50 max-w-[610px]"
								shadow="sm"
							>
								<CardBody>
									<div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
										<div className="relative col-span-6 md:col-span-4">
											<Image
												alt="Album cover"
												className="object-cover"
												height={200}
												shadow="md"
												src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/1921d327135871.563604193bfd3.jpg"
												width="100%"
											/>
										</div>

										<div className="flex flex-col col-span-6 md:col-span-8">
											<div className="flex justify-between items-start">
												<div className="flex flex-col gap-0">
													<h3 className="text-large font-semibold text-foreground/90">{vehicle.route_short_name}</h3>
													<p className="text-small text-foreground/70">{vehicle.agency_name}</p>
													<h1 className="text-medium font-medium mt-2">{vehicle.trip_headsign}</h1>
												</div>
											</div>

											<div className="flex flex-col mt-3 gap-1">

												<div className="flex justify-between">
													{/* <p className="text-small">{distance} {unit}</p> */}
													<p className="text-small text-foreground/50">{updatedTime}</p>
												</div>
											</div>

											<div className="flex w-full items-center justify-center">

											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						)
					})
				}
			</div>

			<div className="flex justify-center py-5">
				<Pagination size={'lg'} color='primary' total={10} initialPage={1} />
			</div>

		</div>
	)
};
