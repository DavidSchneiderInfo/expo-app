import {PropsWithChildren} from "react";
import {Text, View} from "../Themed";
import {SafeAreaView, StyleSheet} from "react-native";

export function AuthForm(props: PropsWithChildren) {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Auth Form</Text>
            <>
                {props.children}
            </>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
