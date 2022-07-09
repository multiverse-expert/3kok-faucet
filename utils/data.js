const { default: axios } = require("axios");
const methods = {
  filterData(data, key) {
    if (data.length > 0) {
      return data.filter((item) => {
        return item.key === key;
      })[0].value;
    }
  },
};

module.exports = { ...methods };
