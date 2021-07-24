import { useState } from 'react';
import axios from 'axios';

const Helpers = () => {
  const baseurl = process.env.REACT_APP_API_URL;
  const [dataTerupdate, setDataTerupdate] = useState({});
  const [dataStatistik, setDataStatistik] = useState([]);
  const [totalKeseluruhan, setTotalKeseluruhan] = useState({
    jumlah_positif: 0,
    jumlah_dirawat: 0,
    jumlah_sembuh: 0,
    jumlah_meninggal: 0,
    total: 0
  });
  const [rsRujukan, setRsRujukan] = useState([]);

  const getDataTerupdate = () => {
    axios({
      method: 'GET',
      url: `${baseurl}/covid`,
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        const result = response.data.update;
        setDataTerupdate(result.penambahan);

        let dataStatistik = result.harian.reverse();
        dataStatistik = dataStatistik.slice(0, 6);
        setDataStatistik(dataStatistik);

        const total =
          result.total.jumlah_positif +
          result.total.jumlah_dirawat +
          result.total.jumlah_sembuh +
          result.total.jumlah_meninggal;

        setTotalKeseluruhan({
          jumlah_positif: result.total.jumlah_positif,
          jumlah_dirawat: result.total.jumlah_dirawat,
          jumlah_sembuh: result.total.jumlah_sembuh,
          jumlah_meninggal: result.total.jumlah_meninggal,
          total: total
        });
      })
      .catch(err => {
        const result = err.response.data.data.update;
        setDataTerupdate(result.penambahan);

        let dataStatistik = result.harian.reverse();
        dataStatistik = dataStatistik.slice(0, 6);
        setDataStatistik(dataStatistik);

        const total =
          result.total.jumlah_positif +
          result.total.jumlah_dirawat +
          result.total.jumlah_sembuh +
          result.total.jumlah_meninggal;

        setTotalKeseluruhan({
          jumlah_positif: result.total.jumlah_positif,
          jumlah_dirawat: result.total.jumlah_dirawat,
          jumlah_sembuh: result.total.jumlah_sembuh,
          jumlah_meninggal: result.total.jumlah_meninggal,
          total: total
        });
      });
  };

  const getRumahSakit = async () => {
    axios({
      method: 'GET',
      url: `${baseurl}/rs-rujukan`,
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        setRsRujukan(response.data.data);
      })
      .catch(err => {
        setRsRujukan(err.response.data.data);
      });
  };

  return {
    dataTerupdate,
    setDataTerupdate,
    dataStatistik,
    setDataStatistik,
    totalKeseluruhan,
    setTotalKeseluruhan,
    rsRujukan,
    setRsRujukan,
    getDataTerupdate,
    getRumahSakit
  };
};

export default Helpers;
