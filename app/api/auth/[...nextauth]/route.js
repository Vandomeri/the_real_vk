import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },

    providers: [

        Credentials({
            credentials: {
                email: '',
                password: ''
            },
            async authorize(credentials) {

                const prisma = new PrismaClient()

                const user = await prisma.users.findFirst({
                    select: {
                        id: true,
                        email: true,
                        password: true,
                        role: true
                    },
                    where: {
                        email: credentials.email
                    }
                })

                const correctPassword = compareSync(credentials.password, user.password)


                if (correctPassword) {
                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }
                }

            }
        })

    ]

})

export {
    handler as GET,
    handler as POST
}