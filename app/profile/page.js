import { PrismaClient } from "@prisma/client";
import ProfileForm from "./ProfileForm";
import { getServerSessionId } from "@/utils";

export default async function ProfilePage() {

    const id = await getServerSessionId()

    const prisma = new PrismaClient()

    const profile = await prisma.users_profile.findFirst({
        where: {
            usersId: id
        }
    })


    return (
        <div>
            <ProfileForm profile={profile} />
        </div>
    )
}
