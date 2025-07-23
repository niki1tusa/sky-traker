import { Plane } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Map, { type MapRef, Marker } from 'react-map-gl/maplibre';

import { flights } from '@/shared/data/flights.data';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import { useTheme } from '@/hooks/useTheme';

import { SkeletonSpinner } from '../ui/skeleton/Skeleton-spinner';

import { mapTheme } from './map.config';
import { createRoute } from './map.utils';
import { AirportsMapMarker } from './ui/AirportsMapMarker';
import { SourceComponent } from './ui/SourceComponent';

import 'maplibre-gl/dist/maplibre-gl.css';

export function SkyTrackMap() {
	const { activeFlight } = useCurrentFlight();
	const { theme } = useTheme();
	const ref = useRef<MapRef>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	
	const routeData = useMemo(() => {
		if (
			!activeFlight?.from?.longitude ||
			!activeFlight?.from?.latitude ||
			!activeFlight?.to?.longitude ||
			!activeFlight?.to?.latitude ||
			!activeFlight?.route?.longitude ||
			!activeFlight?.route?.latitude
		) {
			return {
				dashedFeature: null,
				solidFeature: null,
				bearing: 0,
				snappedCoord: [0, 0],
			};
		}

		const from: [number, number] = [activeFlight.from.longitude, activeFlight.from.latitude];
		const to: [number, number] = [activeFlight.to.longitude, activeFlight.to.latitude];

		return createRoute(from, to, activeFlight);
	}, [activeFlight]);
	const otherFlights = activeFlight ? flights.filter(flight => flight.id !== activeFlight.id) : flights;
	const { dashedFeature, solidFeature, snappedCoord, bearing } = routeData;
	useEffect(() => {
		if (ref.current && activeFlight) {
			ref.current.flyTo({
				center: [snappedCoord[0], snappedCoord[1]],
				zoom: 6,
				duration: 2000,
			});
		}
	}, [activeFlight]);
	useEffect(() => {
		const timeout = setTimeout(() => setIsLoading(false), 2000);
		return () => clearTimeout(timeout);
	}, []);
		if (hasError) {
		return (
			<div className='flex items-center justify-center h-full w-full text-white bg-neutral-900'>
				<p>Map could not be loaded. Please try again later.</p>
			</div>
		);
	}
	return (
		<div className='absolute inset-0 z-0 h-screen w-full'>
			{isLoading ? (
				<SkeletonSpinner size={200} />
			) : (
				<>
					{(() => {
						try {
						return	<Map
								ref={ref}
								initialViewState={{
									longitude: activeFlight?.route.longitude || 43.0,
									latitude: activeFlight?.route.latitude || 33.1,
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
								{otherFlights.map(plane => (
									<Marker key={plane.id} latitude={plane?.route.latitude} longitude={plane?.route.longitude}>
										<Plane className='text-gray-500' />
									</Marker>
								))}
								{/* airports: */}
								{activeFlight && (
									<AirportsMapMarker
										lat={activeFlight?.from.latitude}
										lng={activeFlight?.from.longitude}
										loaction='from'
									/>
								)}
								{activeFlight && (
									<AirportsMapMarker lat={activeFlight?.to.latitude} lng={activeFlight?.to.longitude} loaction='to' />
								)}
								{/* line route */}
								{solidFeature && <SourceComponent id='route-solid' features={solidFeature} />}
								{dashedFeature && <SourceComponent id='route-dashed' features={dashedFeature} />}
							</Map>;
						} catch (error) {
							console.error('Map failed to render:', error);
							setHasError(true);
							return null;
						}
					})()}
				</>
			)}
		</div>
	);
}
