import type { Feature, LineString } from 'geojson';
import { Layer, Source } from 'react-map-gl/maplibre';

import { layerDashed, layerSolid } from '../map.styles';

interface Props {
	id: string;
	features: Feature<LineString>;
}
export const SourceComponent = ({ id, features }: Props) => {
	return (
		<Source
			id={id}
			type='geojson'
			data={{
				type: 'FeatureCollection',
				features: [features],
			}}
		>
			{id === 'route-solid' ? <Layer {...layerSolid} /> : <Layer {...layerDashed} />}
		</Source>
	);
};
