import {useSession} from "../../common/session";
import ProfileForm from "../../components/Profile/form";
import ScrollView from "../../components/ScrollView";

export default function SetupProfile() {
    const {session} = useSession();

    const onSubmit = (formData: any) => {
        console.log("Submitted");
        console.log(formData);
    }

    return (
        <ScrollView>
            {session && session?.user && (
                <ProfileForm profile={session.user} onSubmit={onSubmit}/>
            )}
        </ScrollView>
    );
}
