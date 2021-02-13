import axios from 'axios';
import cors from 'cors';

const SunsetApi = axios.create(
  {
    url: 'https://api.sunrise-sunset.org/json',
  });

export default SunsetApi;