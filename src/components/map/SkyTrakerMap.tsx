'use client';

import { Dot, Plane } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import Map, { Layer, Marker, Source } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';

import { flights } from '@/shared/data/flights.data';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import { useTheme } from '@/hooks/useTheme';

import { createGeoBazier, createSpliteGreatCircle, dashedStyle, solidStyle } from './map.utils';

import 'maplibre-gl/dist/maplibre-gl.css';

export function SkyTrakerMap() {
	const { theme } = useTheme();
	const { activeFlight } = useCurrentFlight();
	const ref = useRef<MapRef>(null);
	const otherCurrentFlights = useMemo(() => {
		return flights.filter(item => item.id !== activeFlight?.id);
	}, [activeFlight]);
	useEffect(() => {
		if (ref.current && activeFlight) {
			ref.current.setCenter({
				lat: activeFlight.route.latitude,
				lng: activeFlight.route.longitude,
			});
			ref.current.setZoom(5);
		}
	}, [activeFlight]);
	const { solidFeature, dashedFeature, snappedPoint, bearing } = useMemo(() => {
		if (!activeFlight?.from || !activeFlight?.to || !activeFlight?.route) {
			return {
				solidFeature: null,
				dashedFeature: null,
				snappedPoint: null,
				bearing: 0,
			};
		}
		const from: [number, number] = [activeFlight.from.longitude, activeFlight.from.latitude];
		const to: [number, number] = [activeFlight.route.longitude, activeFlight.route.latitude];
		const current: [number, number] = [activeFlight.to.longitude, activeFlight.to.latitude];

		return createSpliteGreatCircle(from, to, current);
	}, [activeFlight]);

	const solidLine = useMemo(() => createGeoBazier(solidCoords), [solidCoords]);
	const dashedLine = useMemo(() => createGeoBazier(dashedCoords), [dashedCoords]);

	return (
		<div
			style={{ width: '100%', height: '100vh', zIndex: 0, position: 'absolute', top: 0, left: 0 }}
		>
			<Map
				ref={ref}
				initialViewState={{
					longitude: activeFlight?.route.longitude || 120,
					latitude: activeFlight?.route.latitude || 37,
					zoom: 4,
				}}
				mapStyle={
					theme === 'light'
						? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
						: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
				}
				mapLib={import('maplibre-gl')}
			>
				{!!otherCurrentFlights.length &&
					otherCurrentFlights.map(item => (
						<Marker key={item.id} latitude={item?.route.latitude} longitude={item?.route.longitude}>
							<Plane
								strokeWidth={0}
								size={24}
								className='fill-foreground/50 absolute top-1/2 -right-2 -translate-y-1/2 rotate-45'
							/>
						</Marker>
					))}
				{solidCoords.length > 1 && (
					<Source id='route-solid' type='geojson' data={{
						type: 'FeatureCollection',
						features: [solidFeature]
						}}>
						<Layer {...solidStyle} />
					</Source>
				)}
				{dashedCoords.length > 1 && (
					<Source id='route-dashed' type='geojson' data={{
						type: 'FeatureCollection',
						features: [dashedFeature]
						}}>
						<Layer {...dashedStyle} />
					</Source>
				)}

				{snappedPoint && (
					<Marker latitude={snappedPoint[1]} longitude={snappedPoint[0]}>
						<Plane
						style={{
							transform: `rotate(${bearing - 45}deg)`,
							transformOrigin: 'center',
							transition: 'transform 0.3s ease'
						}}
							strokeWidth={0}
							size={28}
							className='fill-foreground '
						/>
					</Marker>
				)}
				{!!activeFlight?.from && (
					<Marker latitude={activeFlight?.from.latitude} longitude={activeFlight?.from.longitude}>
						<Dot size={40} className='text-rose-500' />
					</Marker>
				)}
				{!!activeFlight?.to && (
					<Marker latitude={activeFlight?.to.latitude} longitude={activeFlight?.to.longitude}>
						<Dot size={40} className='text-orange-500' />
					</Marker>
				)}
			</Map>
		</div>
	);
}
