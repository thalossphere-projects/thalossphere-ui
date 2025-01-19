import http from '../utils/http/http.js'

const findByProviderNameAndConsumerName = (data) => {
    return http.get("/consumer/findByProviderNameAndConsumerName", data);
};

const findByProviderNameAndUrlAndConsumerName = (data) => {
    return http.get("/consumer/findByProviderNameAndUrlAndConsumerName", data);
};

const findByConsumerIdOrProviderIp = (data) => {
    return http.get("/consumer/findByConsumerIdOrProviderIp", data);
}

export default {
    findByProviderNameAndConsumerName, findByProviderNameAndUrlAndConsumerName, findByConsumerIdOrProviderIp
}