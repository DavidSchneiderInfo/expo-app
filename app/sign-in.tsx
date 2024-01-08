import {Link, useRouter} from 'expo-router';
import * as yup from 'yup';
import { Text } from '../components/Themed';
import {AuthForm} from "../components/Auth";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {useSession} from "../common/session";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const schema = yup.object().shape({
    email: yup
        .string()
        .required('An Email is required')
        .email('Invalid email'),
    password: yup
        .string()
        .required('A password is required')
        .min(8, 'Password must contain at least 8 characters'),
});

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const {signIn} = useSession();
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const attemptLogin = (formData: any) => {
        try {
            setLoading(true);
            console.log(formData);
            signIn(formData.email, formData.password)
            router.replace('/');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthForm>
            {!loading ? (
                <>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput label='Email' placeholder='Enter your email address' initialValue={value} onChange={onChange} validationMessage={errors.email?.message} />
                        )}
                        name="email"
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label='Password'
                                placeholder='Enter a password'
                                initialValue={value}
                                onChange={onChange}
                                validationMessage={errors.password?.message}
                                secureTextEntry={true}
                            />
                        )}
                        name="password"
                    />

                    <Button action={handleSubmit(attemptLogin)}>
                        Login
                    </Button>
                </>
            ) : (
                <Text>Attempting login ...</Text>
            )}
            <Link href="/sign-up">
                <Text>
                    No account? Sign up here.
                </Text>
            </Link>
        </AuthForm>
    );
}
