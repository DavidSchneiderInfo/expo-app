import {useState} from "react";
import {useTheme} from "@react-navigation/native";
import {NativeSyntheticEvent, TextInput as BaseTextInput, TextInputEndEditingEventData} from "react-native";
import Colors from '../../constants/Colors';
import {Text} from "../Themed";
import InputBlock, {InputBlockProps} from "./InputBlock";
import FormStyles from "./FormStyles";

export type TextInputProps = InputBlockProps & {
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
        <InputBlock label={label}>
            <BaseTextInput
                placeholder={placeholder ?? label}
                onPressIn={onPress}
                onChangeText={updateText}
                onEndEditing={validateText}
                value={value}
                secureTextEntry={secureTextEntry}
                style={[
                    FormStyles.input,
                    {
                        borderColor: themeStyles.text,
                    },
                ]}/>
            {validationMessage && <Text style={FormStyles.error}>
                {validationMessage}
            </Text>}
        </InputBlock>
    );
}

export default TextInput;
