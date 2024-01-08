import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    input: {
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 12,
    },
});

export default authStyles;
