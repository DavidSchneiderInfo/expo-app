import {PropsWithChildren} from "react";
import {Text} from "./Themed";
import globalStyles from "../constants/Styles";

export type ButtonProps = PropsWithChildren & {
    action: () => void,
}
export default function Button({action, children}: ButtonProps) {
    return (
        <Text onPress={action} style={globalStyles.button}>
            {children}
        </Text>
    );
}
