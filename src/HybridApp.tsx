import React, {lazy, Suspense} from 'react';
import ReactDom from "react-dom";
import {Route, Router, Switch} from "./Routers/routing";
import {ApplicationProvider, IconRegistry, Spinner} from "@ui-kitten/components";
import {light as theme, mapping} from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import client from "./Network/Apollo/client";
import {ApolloProvider} from '@apollo/react-hooks';
import {View} from "react-native";

const HybridApp = function () {
    const Admin = lazy(() => import('./Components/Admin/Admin'));
    const Index = lazy(() => import('./Components/Site/Index'));
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider mapping={mapping} theme={theme}>
                <ApolloProvider client={client}>
                    <Router>
                        <Switch>
                            <Route exact path="/" render={
                                props => <Suspense fallback={<View style={{
                                    width: "100%",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Spinner size="large"/>
                                </View>}><Index {...props} /></Suspense>
                            }/>
                            <Route path="/admin" render={
                                props => <Suspense fallback={<View style={{
                                    width: "100%",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Spinner size="large"/>
                                </View>}><Admin {...props} /></Suspense>
                            }/>
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