import {ProfileDetails, Sex} from "../../common/types";
import {Text, View} from "../Themed";
import * as yup from 'yup';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextInput from "../TextInput";
import Button from "../Button";
import globalStyles from "../../constants/Styles";
import Checkbox from 'expo-checkbox';
import {Picker} from "@react-native-picker/picker";
import {useState} from "react";

const schema = yup.object().shape({
    username: yup
        .string()
        .required('An username is required'),
    bio: yup
        .string(),
    sex: yup
        .string()
        .required('A sex is required'),
});

export default function ProfileForm(user: {
    profile: ProfileDetails
}) {
    const [showGenderInput, setShowGenderInput] = useState<boolean>(false);
    const [sex, setSex] = useState<string|null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: user.profile.name,
            bio: user.profile.bio ?? '',
            sex: undefined,
        },
    });

    const updateProfile = (formData: any) => {
        console.log(typeof formData);
    }

    return (
        <View>
            <Text style={globalStyles.title}>Setup your profile</Text>

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput label='Your name' placeholder='Enter your name' initialValue={value} onChange={onChange} validationMessage={errors.username?.message} />
                )}
                name="username"
            />

            {showGenderInput ? (
                <>
                    {sex!==null && (
                        <Text
                            onPress={() => setShowGenderInput(false)}
                            style={globalStyles.button}
                        >Pick your flavor</Text>
                    )}
                    <Picker
                        selectedValue={sex}
                        onValueChange={(value) => {
                            switch (value) {
                                case Sex.f:
                                    setSex('female');
                                    break;
                                case Sex.m:
                                    setSex('male');
                                    break;
                                default:
                                    setSex('other');
                            }
                        }}
                    >
                        <Picker.Item label="Female" value={Sex.f} />
                        <Picker.Item label="Male" value={Sex.m} />
                        <Picker.Item label="Other" value={Sex.x} />
                    </Picker>
                </>
            ) : (
                <TextInput
                    label='Your gender'
                    placeholder='Pick a gender'
                    initialValue={sex ?? ''}
                    onChange={(value) => {
                        console.log(typeof value);
                        console.log(value);
                    }}
                    onPress={() => setShowGenderInput(true)}
                    validationMessage={errors.sex?.message}
                />
            )}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput label='Your bio' placeholder='Tell the world about yourself' initialValue={value} onChange={onChange} validationMessage={errors.bio?.message} />
                )}
                name="bio"
            />

            <Button action={handleSubmit(updateProfile)}>
                Lets start
            </Button>
            <Text>{JSON.stringify(user.profile)}</Text>
        </View>
    )
}
