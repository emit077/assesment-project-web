import axios from 'axios';
import urls from './urls'

// var CancelToken = axios.CancelToken;
// var source = CancelToken.source();

const axios_instance = axios.create({
    // cancelToken: source.token,
    baseURL: urls.BASE_URL,
    timeout: 50000,

});
export default axios_instance
