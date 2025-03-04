'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function searchForm() {
    return (
        <div>

            <form>
                <Input placeholder="Введите имя друга" name="name" />
                <Button type="submit">Поиск</Button>
            </form>


            <div>

            </div>

        </div>
    )
}
