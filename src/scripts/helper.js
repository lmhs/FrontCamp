// method definitions
export let dataHelper = {
  handleErrors(response) {
    if (!response.ok) {
      Promise.reject({
        status : response.status,
        statusText : response.statusText
      });
    }
    return response;
  }
};