import axios from 'axios';

const read = () => axios.get('https://2c2b5d0syf.execute-api.eu-central-1.amazonaws.com/default/find-pirshi');

const write = data => axios.post('https://2c2b5d0syf.execute-api.eu-central-1.amazonaws.com/default/save-pirshi', data);

const update = data => axios.put('https://2c2b5d0syf.execute-api.eu-central-1.amazonaws.com/default/put-pirshi', data);

export { read, write, update };
