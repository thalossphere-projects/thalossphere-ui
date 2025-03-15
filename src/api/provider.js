import http from '../utils/http/http.js'

const findProviderResponseByNameAndStatus = (data) => {
    return http.get("/provider/findProviderResponseByNameAndStatus", data);
};

const findInstantByProviderIdAndIp = (data) => {
    return http.get("/provider/findInstanceByProviderIdAndIp", data);
};

const findFunctionByProviderIdAndUrl = (data) => {
    return http.get("/provider/findFunctionByProviderIdAndUrl", data);
};

export default {
    findProviderResponseByNameAndStatus, findInstantByProviderIdAndIp, findFunctionByProviderIdAndUrl
}