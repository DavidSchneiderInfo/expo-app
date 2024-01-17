import {useState} from "react";
import {useTheme} from "@react-navigation/native";
import {StyleSheet} from "react-native";
import Colors from '../constants/Colors';
import {Text, View} from "./Themed";
import {Dropdown} from "react-native-element-dropdown";

export type DropdownOption = {
    label: string,
    value: any,
}

export type DropdownProps = {
    label: string,
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
        <View style={style.container}>
            <Text style={style.label}>
                {label}
            </Text>
            <Dropdown
                data={values}
                onChange={(option: DropdownOption) => updateText(option.value)}
                labelField="label"
                valueField="value"
                value={value}
                style={[
                    style.input,
                    {
                        borderColor: themeStyles.text,
                    },
                ]}
            />
            {validationMessage && <Text style={style.error}>
                {validationMessage}
            </Text>}
        </View>
    );
}

export default DropdownInput;

const style = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    label: {
        marginStart: 6
    },
    input: {
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        alignSelf: 'stretch',
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    error: {
        color: 'gray',
        padding: 5,
    },
})
