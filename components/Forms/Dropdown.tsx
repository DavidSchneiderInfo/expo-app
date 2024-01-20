import {useState} from "react";
import {useTheme} from "@react-navigation/native";
import {StyleSheet} from "react-native";
import Colors from '../../constants/Colors';
import {Text, View} from "../Themed";
import {Dropdown} from "react-native-element-dropdown";
import InputBlock, {InputBlockProps} from "./InputBlock";
import FormStyles from "./FormStyles";

export type DropdownOption = {
    label: string,
    value: any,
}

export type DropdownProps = InputBlockProps & {
    initialValue?: string,
    onChange?: (update: string) => void
    onPress?: () => void
    validationMessage: string | undefined,
    values: DropdownOption[],
}

function DropdownInput({label, onChange, initialValue, validationMessage, values}: DropdownProps) {
    const theme = useTheme();
    const themeStyles = theme.dark
        ? Colors.dark
        : Colors.light;
    const [value, setValue] = useState(initialValue ?? '');

    const updateText = (input: string) => {
        setValue(input);
        if(onChange)
        {
            onChange(input);
        }
    }

    return (
        <InputBlock label={label}>
            <Dropdown
                data={values}
                onChange={(option: DropdownOption) => updateText(option.value)}
                labelField="label"
                valueField="value"
                value={value}
                style={[
                    FormStyles.input,
                    {
                        borderColor: themeStyles.text,
                    },
                ]}
            />
            {validationMessage && <Text style={FormStyles.error}>
                {validationMessage}
            </Text>}
        </InputBlock>
    );
}

export default DropdownInput;
