'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import SearchUserCard from "@/components/blocks/searchUserCard"
export default function searchForm({ friendsStatus }) {

    const [users, setUsers] = useState([])

    async function searchUsers(e) {
        e.preventDefault()

        const resp = await fetch('/api/search', {
            method: 'POST',
            body: new FormData(e.target)
        })

        const data = await resp.json()

        setUsers(data)
    }

    return (
        <div>

            <form onSubmit={searchUsers}>
                <Input placeholder="Введите имя друга" name="query" className="mb-4" />
                <Button type="submit">Поиск</Button>
            </form>


            <div className="grid grid-cols-5">
                {
                    users.map((user) => <SearchUserCard friendsStatus={friendsStatus} key={user.id} user={user} />)
                }
            </div>

        </div >
    )
}
