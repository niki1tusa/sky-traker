import { bearing as turfBearing, bezierSpline, greatCircle, lineString, nearestPointOnLine, point } from '@turf/turf';

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
	const snapped = nearestPointOnLine(fullLine, currentPoint, {
		units: 'kilometers',
	});
	const index = snapped.properties?.index ?? 0;
	const snappedCoord = snapped.geometry.coordinates as [number, number];

	const nextCoord = coords[Math.min(index - 1, coords.length - 1)] as [number, number];
	const prevCoord = coords[Math.max(index - 1, 0)] as [number, number];

	// смещение назад по линии
	const BACK_SHIFT_RATIO = 0.47;
	const offsetPoint: [number, number] = [
		snappedCoord[0] * (1 - BACK_SHIFT_RATIO) + prevCoord[0] * BACK_SHIFT_RATIO,
		snappedCoord[1] * (1 - BACK_SHIFT_RATIO) + prevCoord[1] * BACK_SHIFT_RATIO,
	];
	return {
		solidFeature: lineString(coords.slice(0, index + 1 ) as [number, number][]),
		dashedFeature: lineString(coords.slice(index) as [number, number][]),
		snappedPoint: offsetPoint,
		bearing: turfBearing(snappedCoord, nextCoord)

	}
};
