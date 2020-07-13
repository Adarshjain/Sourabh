import React, {useEffect} from 'react';
import {useHistory, useLocation} from "../../Routers/routing";
import AdminRoutes from "../../Routers/AdminRoutes";
import {Image, Text, TouchableOpacity, View} from "react-native";

export const Nav = () => {

    const [selectedPath, setSelectedPath] = React.useState<string | undefined>(undefined);
    let history = useHistory();
    let loc = useLocation();
    let adminRoutes = AdminRoutes.items;

    useEffect(() => {
        if (loc.pathname === "/admin") {
            let i = AdminRoutes.getPathFromIndex(0);
            history.replace(i);
            loc.pathname = i;
        }
        setSelectedPath(loc.pathname);
    }, [loc.pathname, history]);

    function onSelectMenu(path: string) {
        history.push(path);
        setSelectedPath(path);
    }

    function logout() {
        localStorage.removeItem('logTok');
        history.push('/login');
    }

    return (
        <View style={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Image source={{uri: require("../../images/logo.png")}} style={{width: 55, height: 64, marginLeft: 24}}/>

            {adminRoutes.map(route => {
                let css = {};
                if (route.path === selectedPath) {
                    css = {fontWeight: "bold", color: "rgb(51, 102, 255)"}
                }
                return <TouchableOpacity key={route.path} style={{padding: 16}}
                                         onPress={() => onSelectMenu(route.path)}>
                    <Text style={Object.assign({
                        fontSize: 15,
                    }, css)}>{route.title}</Text>
                </TouchableOpacity>
            })}
            <TouchableOpacity key="logout" style={{padding: 16}}
                              onPress={() => logout()}>
                <Text style={Object.assign({
                    fontSize: 15,
                    marginLeft: "auto"
                })}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

