import {Text, View} from "../Themed";
import {StyleSheet} from "react-native";

export type ProfileAttributeProps = {
    label: string,
    value: string | string[],
}

export default function ProfileAttribute({label, value}: ProfileAttributeProps) {
    const parseValue = (): string => {
        return (Array.isArray(value))
            ? value.join(' / ')
            : value
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{parseValue()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        opacity: 1,
    },
    value: {
        opacity: 1,
    },
});
