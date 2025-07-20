import { greatCircle, lineString, nearestPointOnLine, point } from '@turf/turf';

import type { IFlight } from '@/shared/types/flight.types';

type TCoords = [number, number];
export const createRoute = (from: TCoords, to: TCoords, current: IFlight, ) => {
	const fullLine = greatCircle(point(from), point(to), { npoints: 120 });

	const coords = fullLine.geometry.coordinates;
	const currentPoint = point([current.route.longitude, current.route.latitude]);
	const snapped = nearestPointOnLine(fullLine, currentPoint, { units: 'kilometers' });
	const snappedCoord = snapped.geometry.coordinates;
	const index = snapped?.properties?.index ?? 0;
	const solidCoords = coords.slice(0, index + 1);
	const dashedCoords = coords.slice(index);

	const solidFeature = lineString(solidCoords as TCoords[]);
	const dashedFeature = lineString(dashedCoords as TCoords[]);
	return {
		solidFeature,
		dashedFeature,
		snappedCoord,
	};
};
