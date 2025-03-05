'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"

export default function TheHeader({ session }) {
    return (
        <header className="flex justify-between max-w-[1200px] mx-auto py-5">
            <div>LOGO</div>

            <nav className="flex gap-x-5">
                {
                    session ?
                        (
                            <>

                                <Link href="/friends">Друзья</Link>
                                <Link href="/search">Поиск</Link>
                                <Link href='/profile'>Профиль</Link>
                                <button onClick={() => signOut()}>Выход</button>

                            </>
                        ) :
                        (
                            <>
                                <Link href="/register">Регистрация</Link>
                                <Link href='/login'>Вход</Link>
                            </>
                        )
                }
            </nav>
        </header>
    )
}
