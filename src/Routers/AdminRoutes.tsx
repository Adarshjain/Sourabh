import CategoryComp from "../Components/Admin/Category/CategoryComp";
import SubCategory from "../Components/Admin/SubCategory/SecondCategory";
import ProductList from "../Components/Admin/Products/ProductList";
import {Route} from "./routing";
import React from "react";

export default class AdminRoutes {
    static adminPath = "/admin/"
    static items = [{
        title: "Category",
        path: AdminRoutes.adminPath + "category",
        component: CategoryComp
    }, {
        title: "Sub category",
        path: AdminRoutes.adminPath + "sub-category",
        component: SubCategory
    }, {
        title: "Products",
        path: AdminRoutes.adminPath + "products",
        component: ProductList
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