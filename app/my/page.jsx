import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addPost } from "@/serverActions"
import { getServerSessionId } from "@/utils"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"

export default async function MyPage() {
    const id = await getServerSessionId()

    const prisma = new PrismaClient()

    const user = await prisma.users.findFirst({
        select: {
            firstName: true,
            lastName: true,
            middleName: true,
            profile: true,
            posts: true,
        },
        where: {
            id: id
        }
    })
    return (
        <div className="flex gap-x-10">
            <div className="w-[35%]">
                <div className="">
                    <img className="w-full" src={`/avatars/${user.profile.avatar}`} alt="" />
                    <Link href='profile'>Редатировать</Link>
                </div>
            </div>

            <div>
                <p>{user.firstName} {user.middleName} {user.lastName}</p>

                <div className="">
                    <div className="grid grid-cols-2">
                        <span>Страна:</span>
                        <span>{user.profile.country}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Город:</span>
                        <span>{user.profile.city}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Дата рождения:</span>
                        <span>{user.profile.dateOfBirth.toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'numeric',
                            day: '2-digit',
                        })}</span>
                    </div>

                </div>


                <div>
                    <form action={addPost}>
                        <Input placeholder="Что у вас нового?" name="newPost" />
                    </form>
                </div>


                <div>
                    {
                        user.posts.map((post) => (
                            <div className="flex justify-between" key={post.id}>{post.text} <span>{post.created.toLocaleString('ru-RU')}</span></div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
