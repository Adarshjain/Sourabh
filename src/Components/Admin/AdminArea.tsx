import React, {useEffect} from 'react';
// @ts-ignore
import {Route, Switch, useRouteMatch} from "../../Routers/routing";
import Category from "./Category";
import SubCategory from "./SubCategory";
import DataEntry from "./DataEntry";

export const AdminArea = ({match}) => {

    let { url } = useRouteMatch();

    useEffect(() => {
        console.log(match);
    }, [])

    return (
        <Switch>
            <Route path="/admin/category" render={props => <Category {...props} />}/>
            <Route path="/admin/sub-category" render={props => <SubCategory {...props} />}/>
            <Route path="/admin/data-entry" render={props => <DataEntry {...props} />}/>
        </Switch>
    );
};

