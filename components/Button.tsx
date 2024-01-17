import {PropsWithChildren} from "react";
import {Text, View} from "./Themed";
import globalStyles from "../constants/Styles";
import {StyleSheet} from "react-native";

export type ButtonProps = PropsWithChildren & {
    action: () => void,
}
export default function Button({action, children}: ButtonProps) {
    return (
        <View style={style.container}>
            <Text onPress={action} style={globalStyles.button}>
                {children}
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
});
