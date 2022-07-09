const { default: axios } = require("axios");

const methods = {
  async getInitConfig() {
    const env = await axios.get(
      `${process.env.BASE_API_URL}/api/v1/config?type=${process.env.BASE_ENV}`
    );

    const _env = env.data.rows[0];

    const { data } = await axios.get(
      `${process.env.BASE_API_URL}/api/v1/config?type=${_env.value}`
    );

    return data.rows;
  },
};

module.exports = { ...methods };
