const axios = require('axios');

const getAllData = async (req, res) => {
    await axios.get('https://data.covid19.go.id/public/api/update.json', {
        headers: {
            "Accept": "application/json",
        }
    })
    .then((response) => {
        return res.status(500).json({ 
            success: true,
            data: response.data
        });
    })
    .catch((err) => {
        return res.status(500).json({ 
            success: false,
            message: err
        });
    });
}

module.exports = {
    getAllData
}