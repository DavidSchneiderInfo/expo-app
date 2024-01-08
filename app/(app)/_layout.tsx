import { Redirect, Stack } from 'expo-router';
import {useActiveUser, useSession} from '../../common/session';
import { Text } from 'react-native';

export default function AppLayout() {
    const {isLoading} = useSession();

    try {
        const user = useActiveUser();
    }catch (error) {
        console.log("User not found, redirecting to /sign-in ...");
        return <Redirect href="/sign-in" />;
    }

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
