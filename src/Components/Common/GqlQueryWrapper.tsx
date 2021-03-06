import React from "react";
import {useQuery} from "@apollo/react-hooks";
import AdminLoading from "./Loading";
import AdminError from "./Error";
import {DocumentNode} from "graphql";

export default function GqlQueryWrapper<T>(Component, gqlQuery: DocumentNode,vars?:T) {
    return function GqlQueryWrapperInner(props) {
        const {loading, error, data} = useQuery(gqlQuery,vars);
        if (loading) {
            return <AdminLoading/>
        }
        if (error) {
            return <AdminError/>
        }
        return <Component {...props} data={data}/>
    }
}