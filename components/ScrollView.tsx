import {PropsWithChildren} from "react";
import {useTheme} from "@react-navigation/native";
import {ScrollView as ParentScrollView} from "react-native";
import {View} from "./Themed";

export default function ScrollView({children}: PropsWithChildren) {
    const theme = useTheme();

    return (
        <ParentScrollView>
            <View style={{
                backgroundColor: theme.colors.background
            }}>
                {children}
            </View>
        </ParentScrollView>
    );
}
