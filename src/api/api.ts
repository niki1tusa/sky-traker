import axios from 'axios';

const key = import.meta.env.VITE_API_ACCESS_KEY;

export const api = axios.create({
	baseURL: 'https://aviationstack.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

export async function getFlights() {
	try {
		const { data } = await api.get(`/v1/flights`, {
			params: { access_key: key, limit: 10 },
		});
		console.log(data);
		return data.data;
	} catch (error) {
		console.error('Ошибка при получении данных:', error);
		return null;
	}
}
