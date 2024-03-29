import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Redirect, Tabs} from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../../constants/Colors';
import {useSession} from "../../../common/session";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const {session} = useSession();

    if(session && !session.active) {
        return <Redirect href="/setup-profile" />;
    }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
        <Tabs.Screen
            name="index"
            options={{
              title: 'Match',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="info-circle"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
        />
        <Tabs.Screen
            name="dashboard"
            options={{
                title: 'Dashboard',
                tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
        />
    </Tabs>
  );
}
