import React from 'react';
import ReactDom from "react-dom";
import {Link, Route, Router, Switch} from "./Routers/routing";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {light as theme, mapping} from "@eva-design/eva";
import Admin from "./Components/Admin";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import client from "./Network/Apollo/client";
import {ApolloProvider} from '@apollo/react-hooks';

const HybridApp = function () {
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider mapping={mapping} theme={theme}>
                <ApolloProvider client={client}>
                    <Router>
                        <Switch>
                            <Route path="/admin" render={props => <Admin {...props} />}/>
                            <Route path="/" render={props => <Link to="/admin">Go to admin</Link>}/>
                        </Switch>
                    </Router>
                </ApolloProvider>
            </ApplicationProvider>
        </>
    );
}

export default HybridApp;

export function render() {
    ReactDom.render(<HybridApp/>, document.getElementById("root"));
}