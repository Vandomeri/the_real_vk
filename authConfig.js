import { PrismaClient } from "@prisma/client"
import { compareSync } from "bcryptjs"
import Credentials from "next-auth/providers/credentials"

const authConfig = {
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

                return null

            }
        })

    ],

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id
                token.email = user.email
                token.role = user.role
            }

            return token
        },

        async session({ session, token }) {
            session.user.id = token.id
            session.user.email = token.email
            session.user.role = token.role

            return session
        }
    }

}


export default authConfig