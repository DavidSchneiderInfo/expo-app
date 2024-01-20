import {ProfileDetails} from "../common/types";
import {Text, View} from "./Themed";

type ProfileViewProps = {
    profile: ProfileDetails;
}

export default function ProfileView({profile}: ProfileViewProps) {
    return (
        <View style={{
            paddingTop: 10,
        }}>
            <Text>{JSON.stringify(profile)}</Text>
        </View>
    )
}
