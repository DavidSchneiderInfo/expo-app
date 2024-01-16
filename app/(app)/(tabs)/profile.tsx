import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import {useSession} from "../../../common/session";
import ProfileForm from "../../../components/Profile/form";
import ScrollView from "../../../components/ScrollView";

export default function ProfileScreen() {
  const {session} = useSession();
  return (
      <ScrollView>
          {session && (
            <ProfileForm profile={session.user} />
          )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
