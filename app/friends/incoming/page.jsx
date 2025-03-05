import { getServerSessionId } from "@/utils"
import { PrismaClient } from "@prisma/client"

export default async function page() {
    const id = await getServerSessionId()
    const prisma = new PrismaClient()
    const incoming = await prisma.friends.findMany({
        select: {
            user: {
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
            friendId: id,
            isAproved: false
        }
    })


    return (
        <div className="grid grid-cols-4">
            {
                incoming.map((req) => (
                    <div key={req?.user.id}>

                        <img className="w-full" src={`/avatars/${req?.user?.profile?.avatar}`} alt="" />
                        <p>{`${req?.user?.firstName} ${req?.user?.lastName}`}</p>

                    </div>
                ))
            }
        </div>
    )
}
