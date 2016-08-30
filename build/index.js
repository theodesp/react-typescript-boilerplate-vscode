import * as React from "react";
import { render } from "react-dom";
// Import the Hot Module Reloading App Container – more on why we use "require" below
const { AppContainer } = require("react-hot-loader");
import App from "./containers/app";
// Get our root element
const rootEl = document.getElementById("app");
// And render our App into it, inside the HMR App Container which handles the reloading
render(React.createElement(AppContainer, null, 
    React.createElement(App, null)
), rootEl);
// Handle hot reloading actions from Webpack
if (module.hot) {
    module.hot.accept("./containers/app", () => {
        // If we receive a HMR action for our App container, then reload it.
        const NextApp = require("./containers/app").default;
        // And render it into our root element again
        render(React.createElement(AppContainer, null, 
            React.createElement(NextApp, null)
        ), rootEl);
    });
}
//# sourceMappingURL=index.js.map