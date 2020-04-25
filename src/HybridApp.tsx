import React from 'react';
import ReactDom from "react-dom";
import {Route, Router, Switch} from "./Routers/routing";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {light as theme, mapping} from "@eva-design/eva";
import Admin from "./Components/Admin";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

const HybridApp = function () {
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider mapping={mapping} theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/admin" render={props => <Admin {...props} />}/>
                        {/*<Route path="/" render={props => <Layout {...props} ><Text>fgdfgdfg</Text></Layout>}/>*/}
                    </Switch>
                </Router>
            </ApplicationProvider>
        </>
    );
}

export default HybridApp;

export function render() {
    ReactDom.render(<HybridApp/>, document.getElementById("root"));
}