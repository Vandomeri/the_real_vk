'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/serverActions";

export default function Form() {
    return (
        <form className="max-w-[500px] mx-auto flex flex-col gap-y-5" action={registerUser}>
            <Input name="firstName" placeholder="Имя" type="text" />
            <Input name="middleName" placeholder="Отчество" type="text" />
            <Input name="lastName" placeholder="Фамилия" type="text" />
            <Input name="email" placeholder="E-mail" type="email" />
            <Input name="phone" placeholder="Телефон" type="tel" />
            <Input name="password" placeholder="Пароль" type="password" />

            <Button type="submit">Зарегестрироваться</Button>
        </form>
    )
}
