import { Flights } from '../../components/flights/Flights';

export const HomePage = () => {
	return (
		<div className="bg-[url('/backgroundMap.png')] bg-cover bg-center bg-no-repeat w-screen h-screen">
			<Flights />
		</div>
	);
};
