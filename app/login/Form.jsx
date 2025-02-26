'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

export default function Form() {


    const router = useRouter()

    async function logIn(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        const resp = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        })

        if (resp?.ok) {
            router.push('/')
            router.refresh()
        }
    }

    return (
        <form className="max-w-[500px] mx-auto flex flex-col gap-y-5" onSubmit={logIn}>

            <Input name="email" placeholder="E-mail" type="email" />
            <Input name="password" placeholder="Пароль" type="password" />

            <Button type="submit">Войти</Button>
        </form>
    )
}
