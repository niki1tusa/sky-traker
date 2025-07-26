import { useQuery } from '@tanstack/react-query';
import { Plane } from 'lucide-react';
import { useRef } from 'react';
import Map, { type MapRef, Marker } from 'react-map-gl/maplibre';

// import type { IFlightMock } from '@/shared/types/flight.types';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import { useTheme } from '@/hooks/useTheme';

import { getFlights } from '@/api/api';
import type { IFlight } from '@/api/data/flight.type';

import { SkeletonSpinner } from '../ui/skeleton/Skeleton-spinner';

import { mapTheme } from './map.config';

// import { createRoute } from './map.utils';
// import { AirportsMapMarker } from './ui/AirportsMapMarker';
// import { SourceComponent } from './ui/SourceComponent';

import 'maplibre-gl/dist/maplibre-gl.css';

export function SkyTrackMap() {
	const { activeFlight }: { activeFlight: IFlight | undefined } = useCurrentFlight();
	const { theme } = useTheme();
	const ref = useRef<MapRef>(null);
	const { data, isPending, isError } = useQuery({
		queryKey: ['flights'],
		queryFn: getFlights,
	});

	// const routeData = useMemo(() => {
	// 	if (
	// 		!activeMockFlight?.from?.longitude ||
	// 		!activeMockFlight?.from?.latitude ||
	// 		!activeMockFlight?.to?.longitude ||
	// 		!activeMockFlight?.to?.latitude ||
	// 		!activeMockFlight.route?.longitude ||
	// 		!activeMockFlight.route?.latitude
	// 	) {
	// 		return {
	// 			dashedFeature: null,
	// 			solidFeature: null,
	// 			bearing: 0,
	// 			snappedCoord: [0, 0],
	// 		};
	// 	}

	// 	const from: [number, number] = [activeMockFlight.from.longitude, activeMockFlight.from.latitude];
	// 	const to: [number, number] = [activeMockFlight.to.longitude, activeMockFlight.to.latitude];

	// 	return createRoute(from, to, activeMockFlight);
	// }, [activeMockFlight]);
	// const otherFlights = activeFlight ? data.filter((flight: IFlight) => flight.flight.number !== activeFlight.flight.number) : data;
	const otherFlights = data;

	// const { dashedFeature, solidFeature, snappedCoord, bearing } = routeData;
	// useEffect(() => {
	// 	if (ref.current && activeFlight) {
	// 		ref.current.flyTo({
	// 			center: [snappedCoord[0], snappedCoord[1]],
	// 			zoom: 6,
	// 			duration: 2000,
	// 		});
	// 	}
	// }, [activeFlight]);

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
										longitude: activeFlight?.live?.longitude || 43.0,
										latitude: activeFlight?.live?.latitude || 33.1,
										zoom: 6,
									}}
									mapStyle={theme === 'light' ? mapTheme.light : mapTheme.dark}
									mapLib={import('maplibre-gl')}
								>
									{/* planes:*/}
									{/* {activeFlight && (
										<Marker latitude={snappedCoord[1]} longitude={snappedCoord[0]}>
											<Plane
												style={{
													transform: `rotate(${bearing - 45}deg)`,
													transformOrigin: 'center',
													transition: 'transform 0.3s ease',
												}}
											/>
										</Marker>
									)} */}
									{otherFlights
										.filter((plane: IFlight) => plane.live && plane.live.latitude && plane.live.longitude)
										.map((plane: IFlight) => (
											<Marker
												key={plane.aircraft?.registration || plane.flight?.iata || Math.random()}
												latitude={plane.live!.latitude}
												longitude={plane.live!.longitude}
											>
												<Plane className='text-gray-500' />
											</Marker>
										))}

									{/* airports: */}
									{/* {activeFlight && (
										<AirportsMapMarker
											lat={activeFlight?.from.latitude}
											lng={activeFlight?.from.longitude}
											location='from'
										/>
									)} */}
									{/* {activeFlight && (
										<AirportsMapMarker lat={activeFlight?.to.latitude} lng={activeFlight?.to.longitude} location='to' />
									)} */}
									{/* line route */}
									{/* {solidFeature && <SourceComponent id='route-solid' features={solidFeature} />}
									{dashedFeature && <SourceComponent id='route-dashed' features={dashedFeature} />} */}
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
