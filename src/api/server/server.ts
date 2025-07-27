import axios from 'axios';
import express from 'express';

const app = express();
const port = 3001;

let accessToken = '';
let tokenExpiration = 0;

// Получение токена
async function fetchAccessToken() {
	const now = Math.floor(Date.now() / 1000);
	if (accessToken && tokenExpiration > now + 60) return accessToken;

	const { data } = await axios.post(
		'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
		new URLSearchParams({
			grant_type: 'client_credentials',
			client_id: 'niki_tusa',
			client_secret: 'AjW6j64XWtLOksWCOjMHfBZPObH6Baer',
		}).toString(),
		{
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		}
	);
	accessToken = data.access_token;
	tokenExpiration = now + 1800; // токен живёт 30 минут
	return accessToken;
}

// Прокси для /states/all
app.get('/api/flights', async (req, res) => {
	try {
		const token = await fetchAccessToken();
		const response = await axios.get('https://opensky-network.org/api/states/all', {
			headers: { Authorization: `Bearer ${token}` },
		});
		res.json(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch OpenSky data' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
