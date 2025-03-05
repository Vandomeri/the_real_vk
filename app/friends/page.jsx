import { PrismaClient } from "@prisma/client";
import FriendsTabs from "./FriendsTabs";
import { getServerSessionId } from "@/utils";
import Link from "next/link";

export default async function FriendsPage() {

    const id = await getServerSessionId()
    const prisma = new PrismaClient()
    const friends = await prisma.friends.findMany({
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
            },
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
            },
        },
        where: {
            OR: [
                {
                    userId: id,
                    isAproved: true,

                },
                {
                    friendId: id,
                    isAproved: true
                }
            ]
        }
    })
    const friendList = friends.map(friend => {
        if (friend.user.id !== id)
            return friend.user
        else
            return friend.friend
    })

    console.log(friendList);


    return (

        <div className="grid grid-cols-4">
            {
                friendList.map((friend) => (
                    <div key={friend.id}>

                        <img className="w-full" src={`/avatars/${friend?.profile?.avatar}`} alt="" />
                        <p>{`${friend.firstName} ${friend.lastName}`}</p>

                    </div>
                ))
            }
        </div>


    )
}
