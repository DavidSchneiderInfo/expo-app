import {Link, useRouter} from 'expo-router';
import * as yup from 'yup';
import { Text } from '../components/Themed';
import {AuthForm, Error} from "../components/Auth";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSession} from "../common/session";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import {useState} from "react";

const schema = yup.object().shape({
    email: yup
        .string()
        .required('An Email is required')
        .email('Invalid email'),
    password: yup
        .string()
        .required('A password is required'),
});

export default function SignIn() {
    const {signIn, user} = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string|null>(null);
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: 'd4vid81@gmail.com',
            password: 'secret12',
        },
    });

    const attemptLogin = (formData: any) => {
        setMessage(null);
        setIsLoading(true);
        signIn(formData.email, formData.password)
            .then((details)=>{
                console.log("Redirecting to /setup-profile until we know the profile is ready");
                router.replace('/setup-profile');
            }).catch((error) => {
                setMessage(error.message)
                setIsLoading(false);
            });
    }

    return (
        <AuthForm>
            {message && <Error message={message} />}
            {!isLoading ? (
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
