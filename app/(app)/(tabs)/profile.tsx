import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import {useSession} from "../../../common/session";
import {useRouter} from "expo-router";

export default function ProfileScreen() {
  const {signOut} = useSession();
  const router = useRouter();

  const logout = () => {
    signOut();
    router.replace('/sign-in');
  }
  return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
