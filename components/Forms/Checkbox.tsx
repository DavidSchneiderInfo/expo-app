import {useState} from "react";
import {Text, View} from "../Themed";
import Checkbox from 'expo-checkbox';
import FormStyles from "./FormStyles";
import {InputBlockProps} from "./InputBlock";
import {StyleSheet} from "react-native";

export type CheckboxInputProps = InputBlockProps & {
    value: boolean,
    onChange?: (newValue: boolean) => void,
    validationMessage: string | undefined,
}

export default function CheckboxInput({label, validationMessage, value, onChange}: CheckboxInputProps) {
    const [isChecked, setChecked] = useState<boolean>(false);

    const toggle = (value: boolean) => {
        onChange && onChange(value);
        setChecked(value);
    };

    return (
        <View>
            <View style={[
                style.group,
            ]}>
                <View style={style.checkbox}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={toggle}
                    />
                </View>
                <View>
                    <Text>{label}</Text>
                </View>
            </View>
            {validationMessage && <Text style={FormStyles.error}>
                {validationMessage}
            </Text>}
        </View>
    );
}

const style = StyleSheet.create({
    group: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    checkbox: {
        marginEnd: 10,
    },
});
