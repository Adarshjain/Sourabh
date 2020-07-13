import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Icon, Input} from '@ui-kitten/components';
import {useMutation} from "@apollo/react-hooks";
import {MutationLoginArgs} from "../types";
import {LOGIN} from "../Network/schemaFormats";
import {useHistory} from "../Routers/routing";
import AdminRoutes from "../Routers/AdminRoutes";

export default function Login() {

    const [value, setValue] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [login] = useMutation<{ login: { token: string } }, MutationLoginArgs>(LOGIN);
    let history = useHistory();


    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    async function loginUser(event) {
        if (event) {
            event.preventDefault();
        }
        if (!value) {
            return;
        }
        try {
            let resp = await login({
                variables: {
                    email: "Test@lancincatalog.me",
                    password: value
                }
            });
            if (resp.data && resp.data.login) {
                localStorage.setItem("logTok", resp.data.login.token);
                history.push(AdminRoutes.items[0].path);
            }
        } catch (e) {
            alert('Incorrect password!');
        }
    }

    return (
        <form onSubmit={loginUser}>
            <View style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}>
                <Image source={{uri: require("../images/logo.png")}} style={{width: 110, height: 128}}/>
                <Input
                    style={{width: "400px"}}
                    value={value}
                    label='Password'
                    placeholder='Enter your pin'
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    onChangeText={nextValue => setValue(nextValue)}
                />
                <Button
                    style={{width: "400px", marginTop: 12}}
                    onPress={loginUser}
                >
                    Login
                </Button>
            </View>
        </form>
    );
};