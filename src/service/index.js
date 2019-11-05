import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

const URL = 'https://ijtc2i4he1.execute-api.eu-central-1.amazonaws.com/api';

const read = () => axios.get(URL, { headers });

const write = data => axios.post(URL, data, { headers });

const update = data => axios.put(URL, data, { headers });

export { read, write, update };
