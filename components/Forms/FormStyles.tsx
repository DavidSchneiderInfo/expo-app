import {StyleSheet} from "react-native";

const FormStyles = StyleSheet.create({
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
        borderRadius: 5,
        alignSelf: 'stretch',
        marginVertical: 5,
        padding: 5,
    },
    error: {
        color: 'gray',
        padding: 5,
    },
})

export default FormStyles;
