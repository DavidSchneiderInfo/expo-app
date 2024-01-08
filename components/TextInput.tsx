import {useState} from "react";
import {useTheme} from "@react-navigation/native";
import {NativeSyntheticEvent, StyleSheet, TextInput as BaseTextInput, TextInputEndEditingEventData} from "react-native";
import Colors from '../constants/Colors';
import {Text, View} from "./Themed";

export type TextInputProps = {
    label: string,
    placeholder: null | string,
    initialValue?: string,
    secureTextEntry?: boolean,
    onChange?: (update: string) => void
    onPress?: () => void
    validationMessage: string | undefined,
}

function TextInput({label, onChange, initialValue, placeholder, secureTextEntry, validationMessage, onPress}: TextInputProps) {
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

    const validateText = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        e.preventDefault();
    }

    return (
        <View style={style.container}>
            <Text style={style.label}>
                {label}
            </Text>
            <BaseTextInput
                placeholder={placeholder ?? label}
                onPressIn={onPress}
                onChangeText={updateText}
                onEndEditing={validateText}
                value={value}
                secureTextEntry={secureTextEntry}
                style={[
                    style.input,
                    ,
                    {
                        borderColor: themeStyles.text,
                    },
                ]}/>
            {validationMessage && <Text style={style.error}>
                {validationMessage}
            </Text>}
        </View>
    );
}

export default TextInput;

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
        borderWidth: 1,
        alignSelf: 'stretch',
        marginVertical: 5,
        padding: 5,
    },
    error: {
        color: 'gray',
        padding: 5,
    },
})
