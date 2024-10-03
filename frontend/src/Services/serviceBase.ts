import api from "../axiosConfig/axios";

const handleResponse = (response: any) => {
  return response.data;
};

const handleError = (error) => {
    if (error?.response) {
      const status = error.response.status;
      if (status === 500) {
        throw new Error(
          "The server did not respond, please check your internet connection or contact technical support: "
        );
      }
      if (status === 400) {
        throw new Error(
          "Data error: " +
            error.response.data.message.toString().replace(",", ".\n")
        );
      }
      if (status === 403) {
        throw new Error(
          "Permision error:  " +
            error.response.data.message.toString().replace(",", ".\n")
        );
      }
      if (status === 404) {
        throw new Error(
          "Not found: Please make sure to enter the requested data correctly."
        );
      }
    } else {
      throw new Error(
        `Server error: An error occurred with the server, please try again later. \n Error Name: ${error.message}`
      );
    }
  };
  

const ServiceBase = {
  get: async (url: string) => {
    return await api.get(url).then(handleResponse).catch(handleError);
  },
  post: async (url: string, data: any) => {
    return await api.post(url, data).then(handleResponse).catch(handleError);
  },
  put: async (url: string, data: any) => {
    return await api.put(url, data).then(handleResponse).catch(handleError);
  },
  patch: async (url: string, data: any) => {
    return await api.patch(url, data).then(handleResponse).catch(handleError);
  },
  delete: async (url: string, data: any) => {
    return await api.delete(url, data).then(handleResponse).catch(handleError);
  },
};

export default ServiceBase;
