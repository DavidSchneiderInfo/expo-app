import {Link, useRouter} from 'expo-router';
import { Text } from '../components/Themed';
import {AuthForm, authStyles, Error} from "../components/Auth";
import * as yup from 'yup';
import {useForm, Controller, set} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from "../components/TextInput";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import {useState} from "react";
import {useSession} from "../common/session";

const schema = yup.object().shape({
    email: yup
        .string()
        .required('An Email is required')
        .email('Invalid email'),
    password: yup
        .string()
        .required('A password is required')
        .min(8, 'Password must contain at least 8 characters'),
    username: yup
        .string()
        .required('A username is required')
        .min(8, 'Username must contain at least 8 characters'),
    birthday: yup
        .date()
        .typeError("Please enter a valid date")
        .required('A birthday is required')
        .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years old'),
});

export default function SignIn() {
    const {signUp} = useSession();
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
            email: '',
            password: '',
            username: '',
            birthday: new Date(0),
        },
    });

    const attemptSignUp = (formData: any) => {
        setMessage(null);
        setIsLoading(true);
        signUp(formData.username, formData.password, formData.email, formData.birthday)
            .then(()=>{
                router.replace('/');
            }).catch((error) => {
                setMessage(error.message);
                setIsLoading(false);
            });
    };

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

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput label='Username' placeholder='Enter a username' initialValue={value} onChange={onChange} validationMessage={errors.username?.message} />
                        )}
                        name="username"
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={{
                                    margin: 5,
                                }}>What is your birthday?</Text>
                                <RNDateTimePicker
                                    testID="signUpBirthdayDatePicker"
                                    value={value}
                                    mode='date'
                                    onChange={(changed) => onChange(new Date(changed.nativeEvent.timestamp ?? 0))}
                                    style={{marginBottom: 20,}}
                                />
                                {errors.birthday && <Text style={authStyles.error}>
                                    {errors.birthday.message}
                                </Text>}
                            </>
                        )}
                        name="birthday"
                    />

                    <Button action={handleSubmit(attemptSignUp)}>
                        Sign up
                    </Button>
                </>
            ) : (
                <Text>Requesting sign up ...</Text>
            )}

            <Link href="/sign-in">
                <Text>
                    Already registered? Log in here.
                </Text>
            </Link>

        </AuthForm>
    );
}
