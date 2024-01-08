import {Text, View} from "../Themed";

type ErrorProps = {
    message: string,
}

export default function Error({message}: ErrorProps) {
    return (
        <View style={{
            width: '100%',
            padding: 20,
        }}>
            <Text style={{
                backgroundColor: 'red',
                paddingHorizontal: 5,
                paddingVertical: 10,
            }}>
                {message}
            </Text>
        </View>
    );
}
