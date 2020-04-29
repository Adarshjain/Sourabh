import React from "react";
import {useQuery} from "@apollo/react-hooks";
import AdminLoading from "../Admin/AdminLoading";
import AdminError from "../Admin/AdminError";
import {DocumentNode} from "graphql";

export default function GqlQueryWrapper(Component, gqlQuery: DocumentNode, ...props) {

    return function GqlQueryWrapperInner() {
        const {loading, error, data} = useQuery(gqlQuery);
        if (loading) {
            return <AdminLoading/>
        }
        if (error) {
            return <AdminError/>
        }
        return <Component {...props} data={data}/>
    }
}