const axios = require('axios');

const getRumahSakit = async (req, res) => {
  await axios
    .get('https://dekontaminasi.com/api/id/covid19/hospitals', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => {
      return res.status(500).json({
        success: true,
        data: response.data
      });
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        message: err
      });
    });
};

module.exports = {
  getRumahSakit
};
