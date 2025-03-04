import { PrismaClient } from "@prisma/client";
import FriendsTabs from "./FriendsTabs";
import { getServerSessionId } from "@/utils";

export default async function FriendsPage() {

    const prisma = new PrismaClient()
    const id = getServerSessionId()
    const friends = await prisma.friends.findMany({
        where: {
            OR: [
                {
                    usersId: id,
                    isAproved: true,

                },
                {
                    friend_id: id,
                    isAproved: true
                }
            ]
        },
        include: {
            friend: true,
            users: true
        }
    })

    return (
        <div>
            {
                friends.length > 0 && friends.map(friend => (
                    <div className="" key={friend.id}>
                        {friend.}
                    </div>
                ))
            }
        </div>
    )
}
