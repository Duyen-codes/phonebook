import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => {
    console.log("response data from server inside create", response.data);
    return response.data;
  });
};

const remove = (id, personObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, personObject);
  return request.then((response) => {
    return response.data;
  });
};

const update = (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject);
  return request.then((response) => {
    return response.data;
  });
};

export default { getAll, create, remove, update };
