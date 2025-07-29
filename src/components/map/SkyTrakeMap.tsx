import { useQuery } from '@tanstack/react-query';
import { Plane } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import Map, { type MapRef, Marker } from 'react-map-gl/maplibre';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import { useTheme } from '@/hooks/useTheme';

import type { IOpenSkyState } from '@/api/data/flight.type';
import { OPENSKY_SERVICE } from '@/api/open-sky-service';

import { SkeletonSpinner } from '../ui/skeleton/Skeleton-spinner';

import { mapTheme } from './map.config';
import { createRoute } from './map.utils';
import { AirportsMapMarker } from './ui/AirportsMapMarker';
import { SourceComponent } from './ui/SourceComponent';

import 'maplibre-gl/dist/maplibre-gl.css';

export function SkyTrackMap() {
	const { activeFlight }= useCurrentFlight();
	const { theme } = useTheme();
	const ref = useRef<MapRef>(null);
	const { data, isPending, isError } = useQuery({
		queryKey: ['flights'],
		queryFn: async () => {
			return await OPENSKY_SERVICE.getOpenSkyFlights(20);
		},
	});

	const routeData = useMemo(() => {


		if (
			!activeFlight?.departure?.location.lon ||
			!activeFlight?.departure?.location.lat ||
			!activeFlight?.arrival?.location.lon ||
			!activeFlight?.arrival?.location.lat ||
			!activeFlight.longitude ||
			!activeFlight.latitude
		) {
			return {
				dashedFeature: null,
				solidFeature: null,
				bearing: 0,
				snappedCoord: [0, 0],
			};
		}

		const from: [number, number] = [activeFlight.departure.location.lon, activeFlight.departure.location.lat];
		const to: [number, number] = [activeFlight.arrival.location.lon, activeFlight.arrival.location.lat];

		return createRoute(from, to, activeFlight);
	}, [activeFlight]);
	const otherFlights = activeFlight
		? data?.filter((flight: IOpenSkyState) => flight.icao24 !== activeFlight.icao24)
		: data;

	const { dashedFeature, solidFeature, snappedCoord, bearing } = routeData;
	useEffect(() => {
		if (ref.current && activeFlight) {
		console.log([snappedCoord])
			ref.current.flyTo({
				center: [snappedCoord[0], snappedCoord[1]],
				zoom: 6,
				duration: 2000,
			});
		}
	}, [activeFlight]);

	if (isError) {
		return (
			<div className='flex h-full w-full items-center justify-center bg-neutral-900 text-white'>
				<p>Map could not be loaded. Please try again later.</p>
			</div>
		);
	}
	return (
		<div className='absolute inset-0 z-0 h-screen w-full'>
			{isPending ? (
				<SkeletonSpinner size={200} />
			) : (
				<>
					{(() => {
						try {
							return (
								<Map
									ref={ref}
									initialViewState={{
										longitude: activeFlight?.longitude || 9.18854,
										latitude: activeFlight?.latitude || 45.464664,
										zoom: 6,
									}}
									mapStyle={theme === 'light' ? mapTheme.light : mapTheme.dark}
									mapLib={import('maplibre-gl')}
								>
									{/* planes:*/}
									{activeFlight && (
										<Marker latitude={snappedCoord[1]} longitude={snappedCoord[0]}>
											<Plane
												style={{
													transform: `rotate(${bearing - 45}deg)`,
													transformOrigin: 'center',
													transition: 'transform 0.3s ease',
												}}
											/>
										</Marker>
									)}
									{otherFlights?.length &&
										otherFlights
											.filter((plane: IOpenSkyState) => plane.latitude && plane.longitude)
											.map((plane: IOpenSkyState) => (
												<Marker
													key={plane.icao24 || Math.random()}
													latitude={plane.latitude || 0}
													longitude={plane.longitude || 0}
												>
													<Plane size={40} className='text-gray-500' />
												</Marker>
											))}

									{/* airports: */}
									{activeFlight?.departure && (
										<AirportsMapMarker
											lat={activeFlight.departure.location.lat}
											lng={activeFlight.departure.location.lon}
											location='from'
										/>
									)}
									{activeFlight?.arrival && (
										<AirportsMapMarker lat={activeFlight.arrival.location.lat} lng={activeFlight.arrival.location.lon} location='to' />
									)}
									{/* line route */}
									{solidFeature && <SourceComponent id='route-solid' features={solidFeature} />}
									{dashedFeature && <SourceComponent id='route-dashed' features={dashedFeature} />}
								</Map>
							);
						} catch (error) {
							console.error('Map failed to render:', error);
							return null;
						}
					})()}
				</>
			)}
		</div>
	);
}
