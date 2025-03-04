'use client'
export default function searchUserCard({ user }) {
    return (
        <div>
            <img className="w-full" src={user.avatar} alt="" />
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p>{user.city}</p>
            <button>Добавить в друзья</button>
        </div>
    )
}
