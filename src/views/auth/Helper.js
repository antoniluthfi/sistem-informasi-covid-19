import { useState } from 'react';
import axios from 'axios';

const Helper = () => {
  const baseurl = process.env.REACT_APP_API_URL;

  const [input, setInput] = useState({
    nama: '',
    email: '',
    password: '',
    role: ''
  });

  const changeHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const Login = async navigate => {
    await axios
      .post(
        `${baseurl}/user/login`,
        {
          email: input.email,
          password: input.password
        },
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/app/dashboard', { replace: true });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const Register = async navigate => {
    await axios
      .post(
        `${baseurl}/user/register`,
        {
          nama: input.nama,
          email: input.email,
          password: input.password,
          role: 'user'
        },
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      .then(response => {
        navigate('/login', { replace: true });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  return {
    input,
    changeHandler,
    Login,
    Register
  };
};

export default Helper;
