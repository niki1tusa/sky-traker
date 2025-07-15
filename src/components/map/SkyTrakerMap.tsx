'use client';

import type { FeatureCollection } from 'geojson';
import Map, { Layer, Source } from 'react-map-gl/maplibre';
import type { LayerProps } from 'react-map-gl/maplibre';

import { useTheme } from '@/hooks/useTheme';

import 'maplibre-gl/dist/maplibre-gl.css';

const geojson: FeatureCollection = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-122.4, 37.8], // was "cordinates"
			},
			properties: {
				title: '915 font street, lorem',
			},
		},
	],
};

const LayerStyle: LayerProps = {
	id: 'point',
	type: 'circle',
	source: 'point-data',
	paint: {
		'circle-radius': 10,
		'circle-color': '#ff0000',
	},
};

export function SkyTrakerMap() {
	const { theme } = useTheme();
	return (
		<div
			style={{ width: '100%', height: '100vh', zIndex: 0, position: 'absolute', top: 0, left: 0 }}
		>
			<Map
				initialViewState={{
					longitude: 32.45,
					latitude: 37.85,
					zoom: 7,
				}}
				mapStyle={
					theme === 'light'
						?'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
						: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
				}
				mapLib={import('maplibre-gl')}
			>
				<Source id='point-data' type='geojson' data={geojson}>
					<Layer {...LayerStyle} />
				</Source>
			</Map>
		</div>
	);
}
