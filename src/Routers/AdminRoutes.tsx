import CategoryComp from "../Components/Admin/Category/CategoryComp";
import SubCategory from "../Components/Admin/SubCategory/SubCategory";
import DataEntry from "../Components/Admin/Products/DataEntry";
import {Route} from "./routing";
import React from "react";

export default class AdminRoutes {
    static masterPath = "/admin/"
    static items = [{
        title: "Category",
        path: AdminRoutes.masterPath + "category",
        component: CategoryComp
    }, {
        title: "Sub category",
        path: AdminRoutes.masterPath + "sub-category",
        component: SubCategory
    }, {
        title: "Data entry",
        path: AdminRoutes.masterPath + "data-entry",
        component: DataEntry
    }]

    static get routes() {
        return AdminRoutes.items.map(route => ({
            ...route,
            component: () => AdminRoutes.getRouterComponent(route.path, route.component)
        }));
    }

    static getIndexFromPath(path: string): number {
        return this.items.findIndex(item => item.path === path);
    }

    static getPathFromIndex(index: number): string {
        return this.items[index].path;
    }

    static getRouterComponent(path: string, Component) {
        return <Route path={path} render={props => <Component {...props} />} key={path}/>
    }
}