'use client'

import CountryPicker from "@/components/ui/CountryPicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ProfileForm() {

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')

    return (
        <form action="" className="flex flex-col gap-y-5">
            <Input name="dateOfBirth" type="date" />

            <div>
                <p className="text-xl">Ваш пол:</p>
                <div className="flex gap-x-5 mt-3">
                    <label>
                        <p>Мужской</p>
                        <Input className="w-5" value="male" name="sex" type="radio" />
                    </label>
                    <label>
                        <p>Женский</p>
                        <Input className="w-5" value="female" name="sex" type="radio" />
                    </label>
                </div>
            </div>

            <Textarea name="aboutMe" placeholder="Введите информацию о себе"></Textarea>

            <CountryPicker setCountry={setCountry} />
        </form>
    )
}
