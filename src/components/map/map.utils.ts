import { bezierSpline, greatCircle, lineString, nearestPointOnLine, point } from '@turf/turf';
import { type LayerProps } from 'react-map-gl/maplibre';

export const solidStyle: LayerProps = {
	id: 'route-solid',
	type: 'line',
	layout: {
		'line-cap': 'round',
		'line-join': 'round',
	},
	paint: {
		'line-color': '#dc5952',
		'line-width': 4,
		'line-opacity': 1,
	},
};

export const dashedStyle: LayerProps = {
	id: 'route-dashed',
	type: 'line',
	layout: {
		'line-cap': 'round',
		'line-join': 'round',
	},
	paint: {
		'line-color': '#b3a3a2',
		'line-width': 2,
		'line-dasharray': [2, 2],
		'line-opacity': 0.8,
	},
};

export const createGeoBazier = (coords: number[][]) => {
	const line = lineString(coords);
	const curved = bezierSpline(line);
	return curved;
};

export const createSpliteGreatCircle = (
	from: [number, number],
	to: [number, number],
	current: [number, number]
) => {
	const fullLine = greatCircle(point(from), point(to), {
		npoints: 128,
	});

	const coords = fullLine.geometry.coordinates;
	const currentPoint = point(current);

	const snapped = nearestPointOnLine
};
