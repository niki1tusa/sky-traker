import { Plane } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import Map, { Layer, type MapRef, Marker, Source } from 'react-map-gl/maplibre';

import { flights } from '@/shared/data/flights.data';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import { useTheme } from '@/hooks/useTheme';

import { AirportsMapMarker } from './AirportsMapMarker';
import { layerDashed, layerSolid } from './map.styles';
import { createRoute } from './map.utils';

import 'maplibre-gl/dist/maplibre-gl.css';

export function SkyTrackMap() {
	const { activeFlight } = useCurrentFlight();
	const { theme } = useTheme();
	const ref = useRef<MapRef>(null);


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
      snappedCoord: [0, 0],
    };
  }

  const from: [number, number] = [activeFlight.from.longitude, activeFlight.from.latitude];
  const to: [number, number] = [activeFlight.to.longitude, activeFlight.to.latitude];

  return createRoute(from, activeFlight, to);
}, [activeFlight]);
	const otherFlights = activeFlight?  flights.filter(flight=> flight.id !== activeFlight.id): flights
	const { dashedFeature, solidFeature, snappedCoord } = routeData	
	useEffect(() => {
		if (ref.current && activeFlight) {
			ref.current.flyTo({
				center: [snappedCoord[0], snappedCoord[1]],
				zoom: 6,
				duration: 2000,
			});
		}
	}, [activeFlight]);
	return (
		<div className='absolute inset-0 z-0 h-screen w-full'>
			<Map
				ref={ref}
				initialViewState={{
					longitude: activeFlight?.route.longitude || 43.0,
					latitude: activeFlight?.route.latitude || 33.1,
					zoom: 6,
				}}
				mapStyle={
					theme === 'light'
						? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
						: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
				}
				mapLib={import('maplibre-gl')}
			>
				{/* planes:*/}
				{activeFlight && (
					<Marker latitude={snappedCoord[1]} longitude={snappedCoord[0]}>
						<Plane />
					</Marker>
				)}
				{otherFlights.map(plane => (
					<Marker
						key={plane.id}
						latitude={plane?.route.latitude}
						longitude={plane?.route.longitude}
					>
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
					<AirportsMapMarker
						lat={activeFlight?.to.latitude}
						lng={activeFlight?.to.longitude}
						loaction='to'
					/>
				)}
				{/* line route */}
				{solidFeature && (
					<Source
						id='route'
						type='geojson'
						data={{
							type: 'FeatureCollection',
							features: [solidFeature],
						}}
					>
						<Layer {...layerSolid} />
					</Source>
				)}
				{dashedFeature && (
					<Source
						id='route-dashed'
						type='geojson'
						data={{
							type: 'FeatureCollection',
							features: [dashedFeature],
						}}
					>
						<Layer {...layerDashed} />
					</Source>
				)}
			</Map>
		</div>
	);
}
