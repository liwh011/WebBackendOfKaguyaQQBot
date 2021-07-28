import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:9333/';
axios.defaults.withCredentials = true;

/**
 * 发送Http GET请求
 * @param  {string} url 接口网址
 * @param  {object} params url参数
 */
export function get(url: string, params: object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
    });
}

/**
 * 发送Http POST请求
 * @param  {string} url 接口网址
 * @param  {object} params 请求参数
 */
export function post(url: string, params: object): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data);
            });
    });
}



// 接口响应拦截
axios.interceptors.response.use(
    // 2XX开头的状态码
    (response: AxiosResponse) => {
        return Promise.resolve(response);
    },
    // 其他状态码
    (error: AxiosError) => {
        if (error.response) {
            const httpCode = error.response.status;
            const msg = error.response.data.detail || error.response.statusText;
            window.$message.error(`${httpCode}: ${msg}`)

            if (httpCode === 401) {
                window.$router.push({ name: 'Unauthorized'})
            }
        }
        return Promise.reject(error);
    }
);


