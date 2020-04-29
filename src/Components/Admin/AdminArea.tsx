import React from 'react';
import {Switch} from "../../Routers/routing";
import AdminRoutes from "../../Routers/AdminRoutes";

export const AdminArea = () => (
    <Switch>
        {AdminRoutes.routes.map(route => route.component())}
    </Switch>
)

