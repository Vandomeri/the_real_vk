import { getServerSessionId } from "@/utils"
import { PrismaClient } from "@prisma/client"

export default async function page() {
    const id = await getServerSessionId()
    const prisma = new PrismaClient()
    const outgoing = await prisma.friends.findMany({
        select: {
            friend: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        },
        where: {
            userId: id,
            isAproved: false
        }
    })


    return (
        <div className="grid grid-cols-4">
            {
                outgoing.map((req) => (
                    <div key={req?.friend.id}>

                        <img className="w-full" src={`/avatars/${req?.friend?.profile?.avatar}`} alt="" />
                        <p>{`${req?.friend?.firstName} ${req?.friend?.lastName}`}</p>

                    </div>
                ))
            }
        </div>
    )
}
