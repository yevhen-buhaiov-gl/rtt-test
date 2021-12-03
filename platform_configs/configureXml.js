const parser = require('xml2json');
const { resolve } = require('path');
const { readFile, writeFile } = require('fs');
const { getContentSourceURL } = require('./common');

require('dotenv').config({
  path: resolve(__dirname, '../conf/prod/samsung.env')
});

const configXmlPath = resolve(
  __dirname,
  '../platform_builds/tizen_build/config.xml'
);

const projectXmlPath = resolve(
  __dirname,
  '../platform_builds/tizen_build/.project'
);

const setAppId = defaultId => {
  let envPart = process.env.NODE_ENV.slice(0, 5);
  return `${envPart}${defaultId.slice(envPart.length)}`;
};

const updateConfigFile = (path, data) => {
  writeFile(path, data, function(err, data) {
    if (err) {
      console.log(`Failed to write to the file ${path}`, err);
    } else {
      console.log(`File ${path} was updated`);
    }
  });
};

const convertToXml = json => {
  const stringified = JSON.stringify(json);
  return parser.toXml(stringified);
};

// update .project file with project name based on the environment
readFile(projectXmlPath, (err, data) => {
  if (err) {
    console.error("Can't read .project file", err);
    return;
  }

  const json = JSON.parse(parser.toJson(data, { reversible: true }));

  if (
    process.env.NODE_ENV !== 'prod' &&
    typeof process.env.NODE_ENV === 'string'
  ) {
    json.projectDescription.name['$t'] = `${
      json.projectDescription.name['$t']
    }${process.env.NODE_ENV.slice(
      0,
      1
    ).toUpperCase()}${process.env.NODE_ENV.slice(1)}`;
  }

  updateConfigFile(projectXmlPath, convertToXml(json));
});

// update config.xml file with environment configurations
readFile(configXmlPath, (err, data) => {
  if (err) {
    console.error("Can't read config.xml file", err);
    return;
  }

  const json = JSON.parse(parser.toJson(data, { reversible: true }));

  if (json.widget.content) {
    json.widget.content.src = getContentSourceURL();
  }

  if (process.env.NODE_ENV !== 'prod' && json.widget['tizen:privilege']) {
    json.widget['tizen:privilege'].push({
      name: 'http://developer.samsung.com/privilege/hostedapp_deviceapi_allow'
    });
  }

  json.widget['tizen:application'].id = setAppId(
    json.widget['tizen:application'].id
  );
  json.widget['tizen:application'].package = setAppId(
    json.widget['tizen:application'].package
  );

  if (process.env.NODE_ENV !== 'prod') {
    json.widget.name[
      '$t'
    ] = `${process.env.NODE_ENV} ${json.widget.name['$t']}`;
  }

  updateConfigFile(configXmlPath, convertToXml(json));
});
