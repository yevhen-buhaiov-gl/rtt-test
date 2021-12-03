const { resolve } = require("path");
const { writeFile } = require("fs");
const { getContentSourceURL } = require("./common");
const { JSDOM } = require("jsdom");

require("dotenv").config({
  path: resolve(__dirname, "../conf/prod/lg.env")
});

const indexHtmlPath = resolve(__dirname, "../platform_builds/webOS_build/index.html");

JSDOM.fromFile(indexHtmlPath).then(dom => {
  writeFile(
    indexHtmlPath,
    dom.serialize().replace(/'.*'/, `'${getContentSourceURL()}'`),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("LG WEB OS index.html was updated");
      }
    }
  );
});
