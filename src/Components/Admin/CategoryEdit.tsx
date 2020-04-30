import {StyleSheet, View} from "react-native";
import {Button, Card, Input, Modal, Text} from "@ui-kitten/components";
import React, {ChangeEvent} from "react";
import UploadButton from "../Common/UploadButton";
import Category from "../Common/Category";
import {CategoryInput} from "../../types";

interface Props {
    onPrimaryAction: (obj: CategoryInput) => void | Promise<void>,
    onSecondaryAction: () => void,
    visible: boolean
    name?: string,
    orderOfDisplay?: any,
    imageUrl?: string
}

export default function CategoryEdit({onPrimaryAction, onSecondaryAction, name, orderOfDisplay, imageUrl, visible}: Props) {
    const [internalName, setName] = React.useState(name || '');
    const [internalOrderOfDisplay, setOrderOfDisplay] = React.useState(orderOfDisplay || '');
    const [file, setFile] = React.useState<any>(undefined);
    const [internalNameState, setInternalNameState] = React.useState("basic");
    const [internalOrderOfDisplayState, setInternalOrderOfDisplayState] = React.useState("basic");
    const [fileState, setFileState] = React.useState("basic");
    const [imageData, setImageData] = React.useState<any>(undefined);

    function onUpdate() {
        let hasError = false;
        if (internalName === "") {
            setInternalNameState("danger");
            hasError = true;
        }
        if (internalOrderOfDisplay === "") {
            setInternalOrderOfDisplayState("danger");
            hasError = true;
        }
        if (!imageUrl && !file) {
            setFileState("danger");
            hasError = true;
        }
        if (!hasError) {
            onPrimaryAction({
                name: internalName,
                orderOfDisplay: parseInt(internalOrderOfDisplay),
                imageUrl: imageUrl || file
            });
        }
    }

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        if (!(event && event.target && event.target.files)) {
            return;
        }
        setFile(event.target.files[0]);
        let reader = new FileReader();
        reader.onload = (e) => {
            setImageData(e.target?.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <Modal visible={visible} backdropStyle={styles.backdrop}>
            <Card
                style={styles.cardContainer}
                disabled={true}
                header={(props) => <Text {...props}>Category</Text>}
                footer={(props) =>
                    <Footer {...props} onSecondaryAction={onSecondaryAction} onPrimaryAction={onUpdate}/>
                }
            >
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <Input
                            style={styles.input}
                            value={internalName}
                            label='Name'
                            status={internalNameState}
                            onChangeText={name => setName(name)}
                        />
                        <Input
                            style={styles.input}
                            value={internalOrderOfDisplay}
                            label='Order of display'
                            status={internalOrderOfDisplayState}
                            onChangeText={nextValue => setOrderOfDisplay(nextValue)}
                            keyboardType="numeric"
                        />
                        <UploadButton status={fileState} onChange={onFileSelected}>Pick Image</UploadButton>
                    </View>
                    {
                        (imageData || imageUrl) &&
                        <View style={{flex: 1}}>
                            <Category name={internalName} disabled={false} imageUrl={imageData || imageUrl}/>
                        </View>
                    }
                </View>
            </Card>
        </Modal>
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
        minWidth: 640
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