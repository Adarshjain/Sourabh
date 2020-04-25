import React from 'react';
import {View} from 'react-native';
import ReactDom from "react-dom";
import {Route, Switch} from "./Routers/routing";
import Admin from "./Components/Admin";

const App = function () {
    // const history = useHistory();
    // setTimeout(() => {
    //     history.push("/admin")
    // }, 0);
    return (
        <View style={{flex:1}}>
            <Switch>
                <Route path="/admin" render={props => <Admin {...props} />}/>
                {/*<Route path="/pokemon" render={props => <Poke {...props} />}/>*/}
            </Switch>
        </View>
    );
}

export default App;

export function render() {
    ReactDom.render(<App/>, document.getElementById("root"));
}
