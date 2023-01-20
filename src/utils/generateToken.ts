import axios from 'axios';

const ajax = axios.create({
  baseURL: import.meta.env.VITE_TOKEN_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

export default async function generateToken() {
  const token = localStorage.getItem('taiwan_bus_token');
  const expires = localStorage.getItem('taiwan_bus_expires') ?? 0;

  if (token && Date.now() < expires) return;
  const { VITE_CLIENT_ID, VITE_CLIENT_SECRET } = import.meta.env;
  const postData = {
    grant_type: 'client_credentials',
    client_id: VITE_CLIENT_ID,
    client_secret: VITE_CLIENT_SECRET,
  };
  const { data } = await ajax.post('/token', postData);

  localStorage.setItem('taiwan_bus_token', data.access_token);
  localStorage.setItem('taiwan_bus_expires', `${Date.now() + data.expires_in * 1000}`);
}
