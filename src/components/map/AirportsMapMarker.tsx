import clsx from 'clsx';
import { Dot } from 'lucide-react';
import { Marker } from 'react-map-gl/maplibre';

interface Props {
	lat: number;
	lng: number;
	loaction: 'from' | 'to';
}
export const AirportsMapMarker = ({ lat, lng, loaction }: Props) => {
	return (
		<Marker latitude={lat} longitude={lng}>
			<Dot size={40} className={clsx(loaction === 'from' ? 'text-rose-500' : 'text-orange-500')} />
		</Marker>
	);
};
