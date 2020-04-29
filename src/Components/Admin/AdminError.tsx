import React from "react";
import {StyleSheet, View} from "react-native";
import {Icon, Text} from "@ui-kitten/components"

export default () =>
    <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Icon
            style={styles.icon}
            fill='#FFA642'
            animation="pulse"
            name='alert-triangle'
        />
        <Text>Some error occurred. Please refresh the page.</Text>
        <Text>If this error is still visible, please contact developer.</Text>
    </View>;

const styles = StyleSheet.create({
    icon: {
        width: 46,
        height: 46,
        marginBottom: 24
    },
});