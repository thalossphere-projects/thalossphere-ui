import http from '../utils/http/http.js'

const findByProviderNameAndConsumerName = (data) => {
    return http.get("/consumer/findByProviderNameAndConsumerName", data);
};

const findByProviderNameAndUrlAndConsumerName = (data) => {
    return http.get("/consumer/findByProviderNameAndUrlAndConsumerName", data);
};

export default {
    findByProviderNameAndConsumerName, findByProviderNameAndUrlAndConsumerName
}