import React, {useEffect} from 'react';
import {useHistory, useLocation} from "../../Routers/routing";
import AdminRoutes from "../../Routers/AdminRoutes";
import {Text, TouchableOpacity, View} from "react-native";

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

    return (
        <View style={{width: '100%', display: "flex", flexDirection: "row"}}>
            {adminRoutes.map(route => {
                let css = {};
                if (route.path === selectedPath) {
                    css = {fontWeight: "bold", color: "rgb(51, 102, 255)"}
                }
                return <TouchableOpacity
                    key={route.path} style={{padding: 16}}
                    onPress={() => onSelectMenu(route.path)}
                >
                    <Text style={Object.assign({
                        fontSize: 15,
                        minWidth: 90,
                        textAlign: "center"
                    }, css)}>{route.title}</Text>
                </TouchableOpacity>
            })}
        </View>
    );
};

