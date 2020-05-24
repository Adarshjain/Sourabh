import {StyleSheet, View} from "react-native";
import {Button} from "@ui-kitten/components";
import React from "react";

interface FooterProps {
    onPrimaryAction?: () => void
    onSecondaryAction?: () => void
    primaryText: string
    secondaryText?: string
    primaryActionType?: string
    style?: any
}


export default function Footer(
    {onPrimaryAction, onSecondaryAction, primaryText, secondaryText, primaryActionType, ...props}: FooterProps
) {
    return (<View {...props} style={[props.style, styles.footerContainer]}>
        {secondaryText &&
        <Button
            onPress={onSecondaryAction}
            style={styles.footerControl}
            size='small'
            status='basic'
        >
            {secondaryText}
        </Button>
        }
        <Button
            status={primaryActionType}
            onPress={onPrimaryAction}
            style={styles.footerControl}
            size='small'>
            {primaryText}
        </Button>
    </View>)
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerControl: {
        marginLeft:2,
        marginRight:2
    }
});