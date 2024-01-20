import {useSession} from "../../common/session";
import ProfileForm from "../../components/ProfileForm";
import ScrollView from "../../components/ScrollView";
import {ProfileUpdate} from "../../common/types";
import useApi from "../../common/api";
import {router, useRouter} from "expo-router";
import {useEffect} from "react";

export default function SetupProfile() {
    const {session, refresh} = useSession();
    const router = useRouter();
    const {setUserData} = useApi();

    useEffect(()=>{
        if(session?.active)
            router.push('/');
    }, []);

    const onSubmit = (formData: ProfileUpdate) => {
        if(!session)
        {
            console.log("No active session");
            return;
        }
        setUserData(session?.token, formData)
            .then(() => refresh())
            .catch((error) => console.log(error));
    }

    return (
        <ScrollView>
            {session && session?.user && (
                <ProfileForm profile={session.user} onSubmit={onSubmit}/>
            )}
        </ScrollView>
    );
}
