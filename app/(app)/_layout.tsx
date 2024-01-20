import {Redirect, Stack} from 'expo-router';
import {useSession} from '../../common/session';
import { Text } from 'react-native';
import LoadingScreen from "../../components/LoadingScreen";

export default function AppLayout() {
    const {isLoading, session, refresh} = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <LoadingScreen>
            <Text>Restoring session ...</Text>
        </LoadingScreen>;
    }

    // Only require authentication within the (tab) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="setup-profile" options={{ title: 'Lets get you settled in ...', }} />
        </Stack>
    );
}
