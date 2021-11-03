const apiResponse = apiFunc => {
  let data = [];
  let error = false;
  let loading = false;

  const request = async (...args) => {
    loading = true;
    const response = await apiFunc(...args);
    loading = false;

    error = !response.ok;
    data = response.data;
    return response;
  };

  return { data, error, loading, request };
};
export default apiResponse;
