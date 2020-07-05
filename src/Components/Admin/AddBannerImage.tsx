import {StyleSheet, View} from "react-native";
import {Button, Card, Input, Modal, Text} from "@ui-kitten/components";
import React, {ChangeEvent, useEffect} from "react";
import UploadButton from "../Common/UploadButton";
import {uploadImage} from "../../libs/FileUpload";
import Loading from "../Common/Loading";
import Category from "../Common/Category";

interface Props {
    onPrimaryAction: (obj: { orderOfDisplay: number, url: string }) => void | Promise<void>,
    onSecondaryAction: () => void,
    visible: boolean
}

export default function AddBannerImage({onPrimaryAction, onSecondaryAction, visible}: Props) {
    //Data states
    const [internalOrderOfDisplay, setOrderOfDisplay] = React.useState('');
    const [file, setFile] = React.useState<any>(undefined);

    //Input states
    const [internalOrderOfDisplayState, setInternalOrderOfDisplayState] = React.useState("basic");
    const [fileState, setFileState] = React.useState("basic");

    //Others
    const [imageData, setImageData] = React.useState<any>(undefined);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (internalOrderOfDisplay !== "") {
            setInternalOrderOfDisplayState("basic");
        }
        if (!!file) {
            setFileState("basic");
        }
    }, [internalOrderOfDisplay, file]);

    async function onUpdate() {
        let hasError = false;
        if (internalOrderOfDisplay === "") {
            setInternalOrderOfDisplayState("danger");
            hasError = true;
        }
        if (!file) {
            setFileState("danger");
            hasError = true;
        }

        let uploadedImageURL: string = "";
        if (file) {
            setIsLoading(true);
            uploadedImageURL = await uploadImage(file);
            setIsLoading(false);
        }
        if (!hasError) {
            onPrimaryAction({
                orderOfDisplay: parseInt(internalOrderOfDisplay),
                url: uploadedImageURL || ""
            });
        }
    }

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        if (!(event && event.target && event.target.files)) {
            return;
        }
        setFile(event.target.files[0]);
        if (!event.target.files[0].type.startsWith('image')) {
            alert('The file selected is not an image.');
            return;
        }
        if (event.target.files[0].size > 24000) {
            alert('file size is large.');
            return;
        }
        let reader = new FileReader();
        reader.onload = (e) => {
            setImageData(e.target?.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <Modal visible={visible} backdropStyle={styles.backdrop}>
            {
                !isLoading ?
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
                                    value={internalOrderOfDisplay}
                                    label='Order of display'
                                    status={internalOrderOfDisplayState}
                                    onChangeText={nextValue => setOrderOfDisplay(nextValue)}
                                    keyboardType="numeric"
                                />
                                <UploadButton status={fileState} onChange={onFileSelected}>Pick Image</UploadButton>
                            </View>
                            {
                                (imageData) &&
                                <View style={{flex: 1}}>
                                    <Category disabled={false} imageUrl={imageData}/>
                                </View>
                            }
                        </View>

                    </Card>
                    : <Loading/>
            }

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
        marginLeft: 2,
        marginRight: 2
    },
    input: {
        marginBottom: 12
    }
});