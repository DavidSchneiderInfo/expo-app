import {Link} from 'expo-router';
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
    const {signIn} = useSession();
    const [isLoading, setIsLoading] = useState<boolean|string>(false);
    const [message, setMessage] = useState<string|null>(null);

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
        setIsLoading('Attempting login ...');
        try {
            signIn(formData.email, formData.password);
        }catch(error) {
            if(typeof error == 'string' )
                setMessage(error);
            else
                console.log(error);
        }finally {
            setIsLoading(false);
        }
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
                <Text>{isLoading}</Text>
            )}
            <Link href="/sign-up">
                <Text>
                    No account? Sign up here.
                </Text>
            </Link>
        </AuthForm>
    );
}
