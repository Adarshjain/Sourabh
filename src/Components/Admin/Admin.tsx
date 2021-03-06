import {Layout} from "@ui-kitten/components";
import React from "react";
import {StyleSheet, View} from "react-native";
import {Nav} from "./Nav";
import AdminRoutes from "../../Routers/AdminRoutes";
import {Switch, useHistory} from "../../Routers/routing";

const Admin = () => {
    let history = useHistory();
    if (localStorage.getItem('logTok') !== null) {
        return (
            <Layout style={styles.container}>
                <View style={styles.nav}><Nav/></View>
                <View style={styles.adminArea}>
                    <Switch>
                        {AdminRoutes.routes.map(route => route.component())}
                    </Switch>
                </View>
            </Layout>
        )
    } else {
        history.push('/login');
        return <></>;
    }
}
export default Admin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: "column"
    },
    nav: {
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
            zIndex: 100
    },
    adminArea: {
        overflow: "scroll"
    }
});


