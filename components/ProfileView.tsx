import {ProfileDetails, Sex} from "../common/types";
import ProfileAttribute from "./ProfileView/ProfileAttribute";
import {ScrollView, StyleSheet, View} from "react-native";
import {Text} from "./Themed";

type ProfileViewProps = {
    profile: ProfileDetails;
}

export default function ProfileView({profile}: ProfileViewProps) {
    let interestedIn = [];
    if(profile.i_f)
        interestedIn.push('Women');
    if(profile.i_m)
        interestedIn.push('Men');
    if(profile.i_x)
        interestedIn.push('Other');
    const age = profile.age!==null
            ? ' (' + profile.age + ')'
            : ''
    let gender;

    switch(profile.sex) {
        case Sex.f:
            gender = 'Woman';
            break
        case Sex.m:
            gender = 'Man';
            break
        case Sex.x:
        default:
            gender = 'Other';
            break
    }

    return (
        <ScrollView style={styles.container}>
            <ProfileAttribute
                label='Name'
                value={profile.name + age}
            />
            <ProfileAttribute
                label='Bio'
                value={profile.bio ?? '(No bio)'}
            />
            <ProfileAttribute
                label='Gender'
                value={gender}
            />
            <ProfileAttribute
                label='Interested in'
                value={interestedIn}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    media: {
        backgroundColor: 'red',
        height: '100%'
    },
});
