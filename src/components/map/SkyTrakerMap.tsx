'use client';

import type { FeatureCollection, Feature, Point, LineString } from 'geojson';
import Map, { Layer, Source } from 'react-map-gl/maplibre';
import type { LayerProps } from 'react-map-gl/maplibre';

import { useTheme } from '@/hooks/useTheme';
import type { IFlight } from '@/shared/types/flight.types';

import 'maplibre-gl/dist/maplibre-gl.css';

interface Props { 
	longitude: number | undefined;
	latitude: number | undefined;
	flights: IFlight[];
	activeFlight?: IFlight
}

// Create GeoJSON data for flight points (departure and arrival)
const createFlightPointsGeoJSON = (flights: IFlight[]): FeatureCollection<Point> => {
	const features: Feature<Point>[] = [];
	
	flights.forEach((flight) => {
		// Departure point
		features.push({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [flight.from.longitude, flight.from.latitude],
			},
			properties: {
				type: 'departure',
				flightId: flight.id,
				city: flight.from.city,
				country: flight.from.country,
				code: flight.from.code,
				airline: flight.airline.name,
			},
		});
		
		// Arrival point
		features.push({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [flight.to.longitude, flight.to.latitude],
			},
			properties: {
				type: 'arrival',
				flightId: flight.id,
				city: flight.to.city,
				country: flight.to.country,
				code: flight.to.code,
				airline: flight.airline.name,
			},
		});
		
		// Current position point
		features.push({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [flight.route.longitude, flight.route.latitude],
			},
			properties: {
				type: 'current',
				flightId: flight.id,
				altitude: flight.route.altitude,
				speed: flight.route.speed,
				airline: flight.airline.name,
			},
		});
	});
	
	return {
		type: 'FeatureCollection',
		features,
	};
};

// Create GeoJSON data for flight routes (lines)
const createFlightRoutesGeoJSON = (flights: IFlight[]): FeatureCollection<LineString> => {
	const features: Feature<LineString>[] = flights.map((flight) => ({
		type: 'Feature',
		geometry: {
			type: 'LineString',
			coordinates: [
				[flight.from.longitude, flight.from.latitude],
				[flight.route.longitude, flight.route.latitude],
				[flight.to.longitude, flight.to.latitude],
			],
		},
		properties: {
			flightId: flight.id,
			airline: flight.airline.name,
			status: flight.status,
		},
	}));
	
	return {
		type: 'FeatureCollection',
		features,
	};
};

// Layer styles
const routeLineLayerStyle: LayerProps = {
	id: 'route-lines',
	type: 'line',
	source: 'flight-routes',
	layout: {
		'line-join': 'round',
		'line-cap': 'round',
	},
	paint: {
		'line-color': '#3b82f6',
		'line-width': 2,
		'line-opacity': 0.8,
	},
};

const departurePointLayerStyle: LayerProps = {
	id: 'departure-points',
	type: 'circle',
	source: 'flight-points',
	filter: ['==', ['get', 'type'], 'departure'],
	paint: {
		'circle-radius': 8,
		'circle-color': '#10b981',
		'circle-stroke-width': 2,
		'circle-stroke-color': '#ffffff',
	},
};

const arrivalPointLayerStyle: LayerProps = {
	id: 'arrival-points',
	type: 'circle',
	source: 'flight-points',
	filter: ['==', ['get', 'type'], 'arrival'],
	paint: {
		'circle-radius': 8,
		'circle-color': '#ef4444',
		'circle-stroke-width': 2,
		'circle-stroke-color': '#ffffff',
	},
};

const currentPositionLayerStyle: LayerProps = {
	id: 'current-positions',
	type: 'circle',
	source: 'flight-points',
	filter: ['==', ['get', 'type'], 'current'],
	paint: {
		'circle-radius': 6,
		'circle-color': '#f59e0b',
		'circle-stroke-width': 2,
		'circle-stroke-color': '#ffffff',
	},
};

// Symbol layers for airport codes
const departureLabelsLayerStyle: LayerProps = {
	id: 'departure-labels',
	type: 'symbol',
	source: 'flight-points',
	filter: ['==', ['get', 'type'], 'departure'],
	layout: {
		'text-field': ['get', 'code'],
		'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
		'text-offset': [0, -2],
		'text-anchor': 'bottom',
		'text-size': 12,
	},
	paint: {
		'text-color': '#10b981',
		'text-halo-color': '#ffffff',
		'text-halo-width': 1,
	},
};

const arrivalLabelsLayerStyle: LayerProps = {
	id: 'arrival-labels',
	type: 'symbol',
	source: 'flight-points',
	filter: ['==', ['get', 'type'], 'arrival'],
	layout: {
		'text-field': ['get', 'code'],
		'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
		'text-offset': [0, -2],
		'text-anchor': 'bottom',
		'text-size': 12,
	},
	paint: {
		'text-color': '#ef4444',
		'text-halo-color': '#ffffff',
		'text-halo-width': 1,
	},
};

export function SkyTrakerMap({ longitude, latitude, flights, activeFlight }: Props) {
	const { theme } = useTheme();
	
	const flightPointsGeoJSON = createFlightPointsGeoJSON(flights);
	const flightRoutesGeoJSON = createFlightRoutesGeoJSON(flights);
	
	return (
		<div
			style={{ width: '100%', height: '100vh', zIndex: 0, position: 'absolute', top: 0, left: 0 }}
		>
			<Map
				initialViewState={{
					longitude: longitude,
					latitude: latitude,
					zoom: 4,
				}}
				mapStyle={
					theme === 'light'
						? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
						: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
				}
				mapLib={import('maplibre-gl')}
			>
				{/* Flight routes (lines) */}
				<Source id="flight-routes" type="geojson" data={flightRoutesGeoJSON}>
					<Layer {...routeLineLayerStyle} />
				</Source>
				
				{/* Flight points (departure, arrival, current position) */}
				<Source id="flight-points" type="geojson" data={flightPointsGeoJSON}>
					<Layer {...departurePointLayerStyle} />
					<Layer {...arrivalPointLayerStyle} />
					<Layer {...currentPositionLayerStyle} />
					<Layer {...departureLabelsLayerStyle} />
					<Layer {...arrivalLabelsLayerStyle} />
				</Source>
			</Map>
		</div>
	);
}