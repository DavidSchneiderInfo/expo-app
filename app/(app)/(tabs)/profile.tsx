import {useSession} from "../../../common/session";
import ProfileForm from "../../../components/Profile/form";
import ScrollView from "../../../components/ScrollView";
import useApi from "../../../common/api";
import {ProfileUpdate} from "../../../common/types";

export default function ProfileScreen() {
    const {session} = useSession();

    const {setUserData} = useApi();

    const onSubmit = (formData: ProfileUpdate) => {
        if(session)
        {
            setUserData(session.token, formData).catch((error) => {
                alert(error);
            });
        }
    }

    return (
        <ScrollView>
            {session && session?.user && (
                <ProfileForm profile={session.user} onSubmit={onSubmit}/>
            )}
        </ScrollView>
    );
}
