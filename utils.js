import { getServerSession } from "next-auth";
import authConfig from "./authConfig";

export async function getServerSessionId() {
    const session = await getServerSession(authConfig)
    return session.user.id
}