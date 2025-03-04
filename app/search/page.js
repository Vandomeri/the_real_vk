import { getServerSessionId } from "@/utils"
import { PrismaClient } from "@prisma/client"

export default async function SearchPage() {
    const prisma = new PrismaClient()
    const id = await getServerSessionId()
    const friends = await prisma.friends.findMany({
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

    return (
        <div>page</div>
    )
}
