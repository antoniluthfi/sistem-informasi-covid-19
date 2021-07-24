import { useState } from 'react';
import axios from 'axios';

const Helper = () => {
  const baseurl = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axios
      .get(`${baseurl}/user`, {
        Accept: 'application/json'
      })
      .then(response => {
        setUsers(response.data.result);
      })
      .catch(error => {
        setUsers(error.response.data.result);
      });
  };

  const deleteUser = async id => {
    await axios.delete(`${baseurl}/user/${id}`);
  };

  return {
    users,
    setUsers,
    getUsers,
    deleteUser
  };
};

export default Helper;
