import {PropsWithChildren} from "react";
import {useTheme} from "@react-navigation/native";
import {ScrollView as ParentScrollView} from "react-native";

export default function ScrollView({children}: PropsWithChildren) {
    const theme = useTheme();

    return (
        <ParentScrollView style={{
            backgroundColor: theme.colors.background
        }}>
            {children}
        </ParentScrollView>
    );
}
