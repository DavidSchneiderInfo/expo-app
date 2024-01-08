import { Link } from 'expo-router';
import { Text } from '../components/Themed';
import {AuthForm} from "../components/Auth";

export default function SignIn() {

    return (
        <AuthForm>
            <Link href="/sign-up">
                <Text>
                    No account? Sign up here.
                </Text>
            </Link>
        </AuthForm>
    );
}
