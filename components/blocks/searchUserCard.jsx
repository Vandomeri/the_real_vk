'use client'

import { Button } from "../ui/button"

export default function searchUserCard({ user, friendsStatus }) {
    console.log({ friendsStatus })
    const friend = friendsStatus.find((el) => el.usersId === user.id || el.friend_id === user.id)
    console.log(friend)
    let friendButton

    if (friend) {
        if ((friend.friend_id === user.id || friend.usersId === user.id) && friend.isAproved) {
            friendButton = (<p>Мы друзья</p>)
        }
        else if (friend.friend_id === user.id && !friend.isAproved) {
            friendButton = (<Button>Отменить заявку</Button>)
        }
        else if (friend.usersId === user.id && !friend.isAproved) {
            friendButton = (<Button>Принять в друзья</Button>)
        }
    } else {
        friendButton = <Button>Доавить в друзья</Button>
    }



    return (
        <div>
            <img className="w-full" src={`/avatars/${user?.profile?.avatar}`} alt="" />
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p>{user?.profile?.city}</p>

            {friendButton}


        </div>
    )
}
