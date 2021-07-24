const axios = require('axios');

const register = async (req, res) => {
  await axios
    .post('https://api.cekdiri.id/v1/user/register', {
      uniqueCode: 'asdf12345'
    })
    .then(response => {
      return res.status(200).json({
        success: true,
        token: response.data.token
      });
    })
    .catch(err => {
      return res.status(500).json({
        success: true,
        token: err
      });
    });
};

module.exports = {
  register
};
