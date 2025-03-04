import { getServerSessionId } from "@/utils"
import { PrismaClient } from "@prisma/client"
import SearchForm from "./searchForm"
export default async function SearchPage() {
    const prisma = new PrismaClient()
    const id = await getServerSessionId()
    console.log({ id })
    const friendsStatus = await prisma.friends.findMany({
        where: {
            OR: [
                {
                    usersId: id
                },
                {
                    friend_id: id
                }
            ]
        }
    })



    console.log({ friendsStatus })

    return (
        <SearchForm friendsStatus={friendsStatus} />
    )
}
