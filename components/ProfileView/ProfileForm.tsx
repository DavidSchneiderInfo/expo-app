import {ProfileDetails, ProfileUpdate, Sex} from "../../common/types";
import {Text, View} from "../Themed";
import * as yup from 'yup';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextInput from "../Forms/TextInput";
import Button from "../Button";
import DropdownInput from "../Forms/Dropdown";
import CheckboxInput from "../Forms/Checkbox";
import {useState} from "react";
import {FormStyles, InputBlock} from "../Forms";

export const availableSexes = [
    { label: 'Female', value: Sex.f },
    { label: 'Male', value: Sex.m },
    { label: 'Other', value: Sex.x },
];

const schema = yup.object().shape({
    username: yup
        .string()
        .required('An username is required'),
    bio: yup
        .string(),
    height: yup
        .number(),
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
    i_f: yup.boolean(),
    i_m: yup.boolean(),
    i_x: yup.boolean(),
});

type ProfileFormProps = {
    profile: ProfileDetails;
    onSubmit: (formData: ProfileUpdate) => void;
}

export default function ProfileForm({profile, onSubmit}: ProfileFormProps) {
    const [sexPrefError, setSexPrefError] = useState<boolean | string>(false);

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
            height: profile.height ?? undefined,
            i_f: profile.i_f,
            i_m: profile.i_m,
            i_x: profile.i_x,
        },
    });



    const updateProfile = (formData: any) => {

        if(
            formData.i_f
            ||
            formData.i_m
            ||
            formData.i_x
        ) {
            const data = {
                name: formData.username,
                sex: formData.sex,
                height: formData.height,
                bio: formData.bio,
                i_f: formData.i_f!==undefined ? formData.i_f : false,
                i_m: formData.i_m!==undefined ? formData.i_m : false,
                i_x: formData.i_x!==undefined ? formData.i_x : false,
            };
            onSubmit(data);
        } else {
            setSexPrefError("Please pick at least 1 flavor.");
        }
    }

    return (
        <View style={{
            paddingTop: 10,
        }}>
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

            <InputBlock label="Partner Preference">

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CheckboxInput
                            label='Female'
                            value={value || profile.i_f}
                            onChange={(v) => {
                                setSexPrefError(false);
                                onChange(v);
                            }
                            }
                            validationMessage={errors.i_f?.message}
                        />
                    )}
                    name="i_f"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CheckboxInput
                            label='Male'
                            value={value || profile.i_m}
                            onChange={(v) => {
                                setSexPrefError(false);
                                onChange(v);
                            }
                            }
                            validationMessage={errors.i_m?.message}
                        />
                    )}
                    name="i_m"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <CheckboxInput
                            label='Other'
                            value={value || profile.i_m}
                            onChange={(v) => {
                                setSexPrefError(false);
                                onChange(v);
                            }
                            }
                            validationMessage={errors.i_m?.message}
                        />
                    )}
                    name="i_x"
                />

                {sexPrefError && (
                    <Text style={FormStyles.error}>{sexPrefError}</Text>
                )}
            </InputBlock>

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
