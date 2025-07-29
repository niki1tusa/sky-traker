import { bearing, greatCircle, lineString, nearestPointOnLine, point } from '@turf/turf';

import type { IOpenSkyState } from '@/api/data/flight.type';

type TCoords = [number, number];
export const createRoute = (from: TCoords, to: TCoords, current: IOpenSkyState) => {
	console.log(from, to, current)
	const fullLine = greatCircle(point(from), point(to), { npoints: 120 });
console.log(fullLine)
	const coords = fullLine.geometry.coordinates;
	const currentPoint = point([current.longitude!, current.latitude!]);
	const snapped = nearestPointOnLine(fullLine, currentPoint, { units: 'kilometers' });
	const snappedCoord = snapped.geometry.coordinates;
	const index = snapped?.properties?.index ?? 0;
	const solidCoords = coords.slice(0, index + 1);
	const dashedCoords = coords.slice(index);

	const solidFeature = lineString(solidCoords as TCoords[]);
	const dashedFeature = lineString(dashedCoords as TCoords[]);
	
	const nextCoord = coords[Math.min(index + 1, coords.length - 1)] as [number, number];


	return {
		solidFeature,
		dashedFeature,
		bearing: bearing(snappedCoord, nextCoord),
		snappedCoord,
	};
};
