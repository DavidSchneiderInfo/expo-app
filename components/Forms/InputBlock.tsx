import {PropsWithChildren} from "react";
import {Text, View} from "../Themed";
import FormStyles from "./FormStyles";

export type InputBlockProps = PropsWithChildren & {
    label: string,
}

function InputBlock({label, children}: InputBlockProps) {
    return (
        <View style={FormStyles.container}>
            <Text style={FormStyles.label}>
                {label}
            </Text>
            {children}
        </View>
    );
}

export default InputBlock;
