import {StyleSheet, View} from "react-native";
import {Button, Card, Input, Modal, Text} from "@ui-kitten/components";
import React, {ChangeEvent} from "react";
import UploadButton from "../Common/UploadButton";

export default function AddCategory({onPrimaryAction}) {
    const [visible, setVisible] = React.useState(false);
    const [name, setName] = React.useState('');
    const [orderOfDisplay, setOrderOfDisplay] = React.useState<string>('');
    const [file, setFile] = React.useState<File | undefined>(undefined);

    // const [imageData, setImageData] = React.useState<any>(undefined);

    function onSave() {
        onPrimaryAction({name, orderOfDisplay: parseInt(orderOfDisplay), file});
        setVisible(false);
    }

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        if (!(event && event.target && event.target.files)) {
            return;
        }
        setFile(event.target.files[0]);
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //     setImageData(e.target?.result);
        // }
        // reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <View>
            <Button size="medium" onPress={() => setVisible(true)}>Add Category</Button>
            <Modal visible={visible} backdropStyle={styles.backdrop}>
                <Card
                    style={styles.cardContainer}
                    disabled={true}
                    header={(props) => <Text {...props}>Category</Text>}
                    footer={(props) =>
                        <Footer {...props} onSecondaryAction={() => setVisible(false)} onPrimaryAction={onSave}/>
                    }
                >
                    {/*<View>*/}
                    {/*    <View>*/}
                    <Input
                        style={styles.input}
                        value={name}
                        label='Name *'
                        caption='Mandatory'
                        onChangeText={name => setName(name)}
                    />
                    <Input
                        style={styles.input}
                        value={orderOfDisplay}
                        label='Order of display'
                        onChangeText={nextValue => setOrderOfDisplay(nextValue)}
                        keyboardType="numeric"
                    />
                    <UploadButton onChange={onFileSelected}>Pick Image</UploadButton>
                    {/*</View>*/}
                    {/*{imageData !== undefined && <Category name={name} disabled={false} imageUrl={imageData}/>}*/}
                    {/*</View>*/}
                </Card>
            </Modal>
        </View>
    )
}

const Footer = (props) =>
    <View {...props} style={[props.style, styles.footerContainer]}>
        <Button
            style={styles.footerControl}
            size='small'
            status='basic'
            onPress={props.onSecondaryAction}
        >
            CANCEL
        </Button>
        <Button
            onPress={props.onPrimaryAction}
            style={styles.footerControl}
            size='small'>
            SAVE
        </Button>
    </View>


const styles = StyleSheet.create({
    addButton: {
        width: "150px"
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    cardContainer: {
        minWidth: 440
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerControl: {
        marginHorizontal: 2
    },
    input: {
        marginBottom: 12
    }
});