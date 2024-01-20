import {useSession} from "../../../common/session";
import ProfileForm from "../../../components/ProfileForm";
import ScrollView from "../../../components/ScrollView";
import useApi from "../../../common/api";
import {ProfileUpdate} from "../../../common/types";
import {useState} from "react";
import ProfileView from "../../../components/ProfileView";
import {Text, View} from "../../../components/Themed";
import Button from "../../../components/Button";

export default function ProfileScreen() {
    const {session, refresh} = useSession();
    const {setUserData} = useApi();
    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = (formData: ProfileUpdate) => {
        setLoading(true);
        console.log(formData);
        if(!session)
        {
            console.log("No active session");
            return;
        }
        setUserData(session?.token, formData)
            .then(() => {
                refresh();
            })
            .catch((error) => console.log(error))
            .finally(()=>{
                setLoading(false);
                setEdit(false);
            });

    }

    return (
        <ScrollView>
            {session && session?.user && (
                <>
                    {!edit ? (
                        <View>
                            <Button
                                action={() => {
                                    setEdit(true);
                                }}
                            >
                                Edit
                            </Button>
                            <ProfileView profile={session.user} />
                        </View>
                    ) : (
                        <View>
                            {!loading ? (
                                <ProfileForm profile={session.user} onSubmit={onSubmit}/>
                            ) : (
                                <Text>Loading</Text>
                            )}
                        </View>
                    )}
                </>
            )}
        </ScrollView>
    );
}
