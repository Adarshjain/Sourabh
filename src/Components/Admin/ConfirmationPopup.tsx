import {Card, Modal, Text} from "@ui-kitten/components";
import React from "react";
import Footer from "./PopupFooter";

interface ConfirmationPopupProps {
    onPrimaryAction: () => void
    onSecondaryAction: () => void
    visible: boolean
    primaryText: string
    title: string
    secondaryText?: string
    children?: any
    primaryActionType?: string
}

export default function ConfirmationPopup(
    {onPrimaryAction, onSecondaryAction, primaryText, secondaryText, title, primaryActionType, visible, ...props}: ConfirmationPopupProps
) {

    return (
        <Modal visible={visible} backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <Card
                style={{minWidth: 400}}
                disabled={true}
                header={(props) => <Text category="s1" {...props}>{title}</Text>}
                footer={(footerProps) =>
                    <Footer {...footerProps}
                            onSecondaryAction={onSecondaryAction}
                            onPrimaryAction={onPrimaryAction}
                            primaryText={primaryText}
                            secondaryText={secondaryText}
                            primaryActionType={primaryActionType}
                    />
                }
            >
                {props.children}
            </Card>
        </Modal>
    )
}