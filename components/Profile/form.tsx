import {ProfileDetails, ProfileUpdate, Sex} from "../../common/types";
import {View} from "../Themed";
import * as yup from 'yup';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextInput from "../TextInput";
import Button from "../Button";
import DropdownInput from "../Dropdown";

const schema = yup.object().shape({
    username: yup
        .string()
        .required('An username is required'),
    bio: yup
        .string(),
    sex: yup
        .string()
        .transform(function (value, originalvalue) {
            if(this.isType(value))
            {
                return value;
            } else {
                return originalvalue;
            }
        })
        .required('A sex is required'),
});

type ProfileFormProps = {
    profile: ProfileDetails;
    onSubmit: (formData: ProfileUpdate) => void;
}

export default function ProfileForm({profile, onSubmit}: ProfileFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: profile.name,
            bio: profile.bio ?? '',
            sex: profile.sex ?? undefined,
        },
    });

    const availableSexes = [
        { label: 'Female', value: Sex.f },
        { label: 'Male', value: Sex.m },
        { label: 'Other', value: Sex.x },
    ];

    const updateProfile = (formData: any) => {
        onSubmit({
            name: formData.name,
            sex: formData.sex,
            bio: formData.bio,
            height: null,
        });
    }

    return (
        <View>
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

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <DropdownInput label='Your gender' validationMessage={errors.sex?.message} values={availableSexes} initialValue={value} onChange={onChange} />
                )}
                name="sex"
            />

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
                Save
            </Button>
        </View>
    )
}
