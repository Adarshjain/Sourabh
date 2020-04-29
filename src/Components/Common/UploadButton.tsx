import React from "react";
import {Button} from "@ui-kitten/components";

export default (props) =>
    <label>
        <input type="file" style={{
            width: 1,
            height: 1,
            opacity: 0,
            overflow: "hidden",
            position: "absolute",
            zIndex: -1
        }} onChange={props.onChange}/>
        <Button {...props} >{props.children}</Button>
    </label>
