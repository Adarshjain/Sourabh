import React from "react";
import {Button} from "@ui-kitten/components";

export default ({status, onChange, ...props}) =>
    <label>
        <input type="file" style={{
            width: 1,
            height: 1,
            opacity: 0,
            overflow: "hidden",
            position: "absolute",
            zIndex: -1
        }} onChange={onChange}/>
        <Button status={status} {...props} >{props.children}</Button>
    </label>
