import type { LayerProps } from "react-map-gl/maplibre";

export const layerSolid: LayerProps = {
    id: 'route-solid',
    type: 'line',
    layout: {
        'line-cap': 'round',
        'line-join': 'round',
    },
    paint: {
        'line-color': '#f97316',
        'line-width': 4,
    },
};
export const layerDashed: LayerProps = {
    id: 'route-dashed',
    type: 'line',
    layout: {
        'line-cap': 'round',
        'line-join': 'round',
    },
    paint: {
        'line-color': '#808080',
        'line-width': 2,
        'line-dasharray': [2, 2],
        'line-opacity': 0.8,
    },
};