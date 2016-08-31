const jsdom = require("jsdom");
require("babel-polyfill");

require("babel-core/register")({
  ignore: /node_modules/
});

// This assures the .babelrc dev config (which includes
// hot module reloading code) doesn"t apply for tests.
// Setting NODE_ENV to test instead of production because setting it to production will suppress error messaging
// and propType validation warnings.
process.env.NODE_ENV = "test";

[".wav", ".css", "less"].forEach(function (ext) {
  require.extensions[ext] = function (module, filename) {
  };
});

// Setup browser environment so that we can test React components.
global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
global.window = document.parentWindow;
global.navigator = {
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
};
global.console.debug = function () {}; // NodeJS does not have console.debug, but React uses it.
