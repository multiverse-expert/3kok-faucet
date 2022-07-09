const { default: axios } = require("axios");

const methods = {
  async getABIConfig(url) {
    const res = await fetch(url);
    const json = await res.json();

    return json;
  },
};

module.exports = { ...methods };
