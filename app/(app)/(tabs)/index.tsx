import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import useApi from "../../../common/api";
import {useSession} from "../../../common/session";
import {ProfileDetails} from "../../../common/types";
import ProfileView from "../../../components/ProfileView";

export default function MatchScreen() {
    const [location, setLocation] = useState<null | LocationObject>(null);
    const [locationPermission, setLocationPermission] = useState<boolean>(false);
    const {getProfiles} = useApi();
    const {session} = useSession();
    const [list, setList] = useState<ProfileDetails[] | null>(null);
    const [current, setCurrent] = useState<null | ProfileDetails>(null);

    useEffect(() => {
        console.log("on effect");
        (async () => {
            Location.requestForegroundPermissionsAsync()
                .then((permission) => {
                    if(permission.status === 'granted') {
                        console.log('Getting location');
                        setLocationPermission(true);
                        Location.getCurrentPositionAsync({})
                            .then((location) => setLocation(location))
                            .then(() => showNext());
                    } else {
                        setLocationPermission(false);
                    }
                })
        })();
    }, []);

    const loadList = async () => {
        if(!session || !location)
        {
            return;
        }
        return getProfiles(session.token, {
            coords: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
        }).then((newList) => {
            console.log(newList);
            setList(newList ?? null);
            console.log(list);
        }).catch((error) => {
            console.error(error);
        });
    }

    const getNext = (): ProfileDetails | null => {
        let profile = list ? list.pop() : null;
        return profile ?? null;
    }

    const showNext = () => {
        if(!list || list.length==0)
        {
            throw Error("Empty list");
        }

        setCurrent(getNext())
    }

    return (
        <View style={styles.container}>
            {locationPermission ? (
                <>
                    <Text>{location?.coords.latitude}</Text>
                    <Text>{location?.coords.longitude}</Text>
                    <Text>{list ? list.length : 0}</Text>
                    {current && (
                        <ProfileView profile={current} />
                    )}
                </>
            ) : (
                <Text>Permission to access location was denied.</Text>
            ) }
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
