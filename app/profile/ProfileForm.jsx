'use client'

import { Button } from "@/components/ui/button";
import CityPicker from "@/components/ui/CityPicker";
import CountryPicker from "@/components/ui/CountryPicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createUpdateProfile } from "@/serverActions";
import { useActionState } from "react";

export default function ProfileForm({ profile }) {

    const [state, serverAction, pending] = useActionState(createUpdateProfile, {
        message: ''
    })

    return (
        <form action={serverAction} className="flex flex-col gap-y-5">

            <label>
                {
                    profile?.avatar ?
                        (<img src={`/avatars/${profile?.avatar}`} alt="" />) :
                        (<img src="/avatars/defaultAvatar.png" alt="" />)
                }

                <input hidden type="file" name="avatar" />
            </label>

            <Input defaultValue={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : ''} name="dateOfBirth" type="date" />

            <div>
                <p className="text-xl">Ваш пол:</p>
                <div className="flex gap-x-5 mt-3">
                    <label>
                        <p>Мужской</p>
                        <Input defaultChecked={profile?.sex === 'male'} className="w-5" value="male" name="sex" type="radio" />
                    </label>
                    <label>
                        <p>Женский</p>
                        <Input defaultChecked={profile?.sex === 'female'} className="w-5" value="female" name="sex" type="radio" />
                    </label>
                </div>
            </div>

            <Textarea defaultValue={profile?.aboutMe} name="aboutMe" placeholder="Введите информацию о себе"></Textarea>

            <CountryPicker defaultCountry={profile?.country} />

            <CityPicker defaultCity={profile?.city} />

            <Button disabled={pending} type="submit">Сохранить</Button>

            <p className="mt-5 text-center">{state?.message}</p>
        </form>
    )
}
