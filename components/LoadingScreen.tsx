import {View} from "./Themed";
import {StyleSheet} from "react-native";
import {PropsWithChildren} from "react";

export default function LoadingScreen ({children}: PropsWithChildren) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
