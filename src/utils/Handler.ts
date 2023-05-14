import axios, { AxiosInstance, AxiosResponse } from "axios";

const AxiosFactory = (domain: string): AxiosInstance => {
    // authToken
    const token = '';
    return axios.create({
        baseURL: domain,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token}`,
        },
        responseType: 'json'
    });
}

const Get = async <T>(domain: string, endpoint: string, params: {} = {}): Promise<AxiosResponse<T>> => {
    return await AxiosFactory(domain).get(endpoint, params);
}
const Put = async <T>(domain: string, endpoint: string, params: {} = {}): Promise<AxiosResponse<T>> => {
    return await AxiosFactory(domain).put(endpoint, params);
}
const Post = async <T>(domain: string, endpoint: string, params: {} = {}): Promise<AxiosResponse<T>> => {
    return await AxiosFactory(domain).post(endpoint, params);
}
const Delete = async <T>(domain: string, endpoint: string, params: {} = {}): Promise<AxiosResponse<T>> => {
    return await AxiosFactory(domain).delete(endpoint, params);
}

export const ApiCall = {
    Get,
    Put,
    Post,
    Delete,
} as const;