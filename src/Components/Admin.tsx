import {Layout} from "@ui-kitten/components";
import React from "react";
import {StyleSheet, View} from "react-native";
import {Nav} from "./Admin/Nav";
import {AdminArea} from "./Admin/AdminArea";

const Admin = (props) => {
    return (
        <Layout style={styles.container}>
            <View style={styles.nav}><Nav/></View>
            <View style={styles.adminArea}><AdminArea {...props}/></View>
        </Layout>
    )
}
export default Admin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: "row"
    },
    nav: {
        width: 250,
        height: "100%",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowColor: "rgb(218,224,235)",
        zIndex: 100
    },
    adminArea: {
        flex: 1,
        maxHeight: "100vh",
        overflow: "scroll"
    }
});


