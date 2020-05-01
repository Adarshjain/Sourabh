import React from "react";
import {Spinner} from '@ui-kitten/components';
import {View} from "react-native";

export default () =>
    <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Spinner size="large"/>
    </View>;