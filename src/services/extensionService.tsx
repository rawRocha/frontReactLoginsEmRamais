import axios from 'axios';

const API_URL = 'http://localhost:8080/extensions';

export const fetchAvailableExtensions = async (page = 0, size = 8) => {
  const response = await axios.get(
    `${API_URL}/available?page=${page}&size=${size}`
  );
  return response.data;
};

export const fetchUnvailableExtensions = async () => {
  const response = await axios.get(`${API_URL}/unvailable`);
  return response.data;
};

export const loginToExtension = async ({
  username,
  password,
  extensionNumber,
}) => {
  const { data } = await axios.post('http://localhost:8080/extensions/login', {
    username,
    password,
    extensionNumber,
  });
  return data;
};

export const createRange = async ({ start, end }) => {
  const { data } = await axios.post(
    'http://localhost:8080/extensions/create-range',
    {
      start,
      end,
    }
  );
  return data;
};

export const createExtension = async ({ extensionNumber }) => {
  const { data } = await axios.post('http://localhost:8080/extensions/create', {
    extensionNumber,
  });
  return data;
};

export const logoutToExtension = async ({
  username,
  password,
  extensionNumber,
}) => {
  const { data } = await axios.delete(
    'http://localhost:8080/extensions/logout',
    {
      data: { username, password, extensionNumber },
    }
  );
  return data;
};

export const register = async ({ username, password }) => {
  const { data } = await axios.post('http://localhost:8080/users/register', {
    username,
    password,
  });
  return data;
};

export const searchExtensions = async (query, page = 0, size = 8) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      query,
      page,
      size,
    },
  });
  return response.data;
};

export const configureRange = async ({ start, end }) => {
  const response = await axios.post(`${API_URL}/configure-range`, {
    start,
    end,
  });
  return response.data;
};

export const resetRange = async () => {
  const response = await axios.post(`${API_URL}/reset-range`);
  return response.data;
};
