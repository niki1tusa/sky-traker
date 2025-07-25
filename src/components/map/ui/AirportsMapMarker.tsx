import { Dot, MapPin } from 'lucide-react';
import { Marker } from 'react-map-gl/maplibre';

interface Props {
	lat: number;
	lng: number;
	location: 'from' | 'to';
}
export const AirportsMapMarker = ({ lat, lng, location }: Props) => {
	return (
		<Marker latitude={lat} longitude={lng}>
			{location === 'from' ? (
				<Dot size={40} className='text-rose-500' />
			) : (
				<MapPin size={20} fill='red' />
			)}
		</Marker>
	);
};
