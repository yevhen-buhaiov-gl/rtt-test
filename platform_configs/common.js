const { networkInterfaces } = require("os");

const interfaces = networkInterfaces();

const getLocalIPAddresses = () => {
  const addresses = [];
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
      let address = interfaces[k][k2];
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  return addresses;
};

const getContentSourceURL = () => {
  return `http://${getLocalIPAddresses()[0]}:8080/index.html`;
}

exports.getLocalIPAddresses = getLocalIPAddresses;
exports.getContentSourceURL = getContentSourceURL;
