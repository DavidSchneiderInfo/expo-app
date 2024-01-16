import {useSession} from "../../common/session";
import ProfileForm from "../../components/Profile/form";
import ScrollView from "../../components/ScrollView";

export default function SetupProfile() {
    const {session} = useSession();

    return (
        <ScrollView>
            {session && session?.user && (
                <ProfileForm profile={session.user} />
            )}
        </ScrollView>
    );
}
