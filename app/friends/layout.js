import Link from "next/link";

export default function FriendsLayout({ children }) {
    return (

        <div>
            <div className="flex justify-end gap-x-5">
                <Link href="/friends/incoming">Заявки в друзья</Link>
                <Link href="/friends/outgoing">Мои Заявки</Link>
            </div>

            {children}
        </div>
    )
}
