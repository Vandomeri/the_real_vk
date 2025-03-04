import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
    const formData = await request.formData()

    const prisma = new PrismaClient()

    const users = await prisma.users.findMany({
        where: {
            lastName: {
                contains: formData.get('query')
            }
        },
        include: {
            profile: true
        }
    })


    console.log(users)

    return NextResponse.json(users)
}   