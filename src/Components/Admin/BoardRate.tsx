import React, {useState} from "react";
import {View} from "react-native";
import {FETCH_MISC, UPDATE_MISC} from "../../Network/schemaFormats";
import {Button, Input} from "@ui-kitten/components";
import {BOARD_RATE, MISC, MiscResponse} from "../../customTypes";
import {Misc, MutationUpdateMiscArgs, QueryFindMiscArgs} from "../../types";
import {useMutation} from "@apollo/react-hooks";
import GqlQueryWrapper from "../Common/GqlQueryWrapper";

export default GqlQueryWrapper<{ variables: QueryFindMiscArgs }>(BoardRate, FETCH_MISC, {variables: {key: [BOARD_RATE]}});

function BoardRate({data: {findMisc}}: MiscResponse) {
    const [updateMisc] = useMutation<{ updateMisc: Misc }, MutationUpdateMiscArgs>(UPDATE_MISC);
    const [internalMisc] = useState<MISC>(() => {
        if (findMisc !== undefined) {
            return JSON.parse(findMisc.value || '{}')
        } else {
            return {};
        }
    });
    const [value, setValue] = useState(internalMisc.BOARD_RATE || "");

    async function updateBoardRate() {
        await updateMisc({
            variables: {
                key: BOARD_RATE,
                value
            }
        });
        alert('updated!');
    }


    return (
        <form onSubmit={updateBoardRate}>
            <View style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}>
                <Input
                    style={{width: "400px"}}
                    value={value}
                    label='Board Rate'
                    placeholder='Enter rate'
                    onChangeText={nextValue => setValue(nextValue)}
                />
                <Button
                    style={{width: "400px", marginTop: 12}}
                    onPress={updateBoardRate}
                >
                    Update
                </Button>
            </View>
        </form>
    )
}