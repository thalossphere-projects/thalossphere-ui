import http from '../utils/http/http.js'

const findByName = (data) => {
    return http.get("/provider/findByName", data);
};

const findInstantByProviderIdAndIp = (data) => {
    return http.get("/provider/findInstantByProviderIdAndIp", data);
};

const findFunctionByProviderIdAndUrl = (data) => {
    return http.get("/provider/findFunctionByProviderIdAndUrl", data);
};

export default {
    findByName, findInstantByProviderIdAndIp, findFunctionByProviderIdAndUrl
}