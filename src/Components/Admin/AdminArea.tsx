import React from 'react';
import {Route, Switch} from "../../Routers/routing";
import Category from "./Category";
import SubCategory from "./SubCategory";
import DataEntry from "./DataEntry";

export const AdminArea = () => (
    <Switch>
        <Route path="/admin/category" render={props => <Category {...props} />}/>
        <Route path="/admin/sub-category" render={props => <SubCategory {...props} />}/>
        <Route path="/admin/data-entry" render={props => <DataEntry {...props} />}/>
    </Switch>
)

