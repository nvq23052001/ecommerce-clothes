/*eslint-disable*/
import axios from 'axios';
import { apiUrls, API_URL } from 'config/apis';
import { SUCCESS } from 'config/constants';
import routes from 'config/routes';
import store from 'store';

axios.defaults.baseURL = API_URL;

const refresh = async () => {
  const refreshToken = 'asasasdas';
  if (!refreshToken) return false;

  const headers = { Authorization: refreshToken };

  try {
    const response = await axios.post(apiUrls.refreshToken(), {}, { headers });
    const { data: responseData } = response;
    const { message, data } = responseData;
    if (message?.status === SUCCESS) {
      // configureStore.dispatch({
      //   type: UPDATE_AUTH,
      //   payload: data
      // });
      // return {
      //   data: data,
      //   status: true
      // };
    }
  } catch (e) {}
  // If cannot refresh => sign out
};

/**
 * Config request common
 *
 * @param {String} method Request method
 * @param {String} url Request URL
 * @param {Object} data Request params
 * @param {Object} options Config options
 */
const request = async (method, url, data = {}, callback = () => {}, options = {}, isRefresh) => {
  const auth = store.getState().auth;
  const accessToken = auth?.user?.accessToken || '';
  const headers = { Authorization: accessToken ? `Bearer ${accessToken}` : '' };

  const defaultParams = { headers, method, url, ...options };
  const paramConfigs = method === 'get' ? { ...defaultParams, params: data } : { ...defaultParams, data: data };

  return new Promise((resolve, reject) => {
    axios(paramConfigs)
      .then((res) => {
        let { data = {}, status: code = 500 } = res;
        const { message = {} } = data;
        const { status } = message;
        data = {
          code,
          status: status === SUCCESS || status === true,
          data: data.data
        };

        resolve(data);
        callback(data);
      })
      .catch(async (error) => {
        reject(error);

        const { response = {}, config } = error || {};
        const { status } = response;
        if (status === 401) {
          return axios(paramConfigs);
        }
        if (status === 403) {
          if (!isRefresh) {
            const res = await refresh();
            if (res && res?.status) {
              axios
                .get('/api/v1/admin/manage/user?page=1&page_size=1', {
                  headers: {
                    Authorization: res?.data.id_token
                  }
                })
                .catch(() => {
                  window.location.href(routes.login);
                });
            }
          }
        } else {
          data = {
            status: status === SUCCESS || status === true,
            errors: response.data?.errors
          };
          callback(data);
        }
      });
  });
};

/**
 * Request process callback with method GET
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiGet = (url = '', params = {}, callback) => {
  return request('get', url, params, callback);
};

/**
 * Request process callback with method POST
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiPost = (url = '', params = {}, callback) => {
  return request('post', url, params, callback);
};

const apiPatch = (url = '', params = {}, callback) => {
  return request('patch', url, params, callback);
};

/**
 * Request process callback with method PUT
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiPut = (url = '', params = {}, callback) => {
  return request('put', url, params, callback);
};

/**
 * Request process callback with method DELETE
 *
 * @param {String} url Request URL
 * @param {Object} params Request params
 * @param {Function} callback callback
 */
const apiDelete = (url = '', params = {}, callback) => {
  return request('delete', url, params, callback);
};

export const useApis = () => ({
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
  requestApi: request
});

export default { get: apiGet, post: apiPost, put: apiPut, delete: apiDelete, request, patch: apiPatch };
