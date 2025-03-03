'use server'

import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcryptjs"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import authConfig from "./authConfig"
import { revalidatePath } from "next/cache"
const prisma = new PrismaClient()

export async function registerUser(formData) {


    const resp = await prisma.users.create({
        data: {
            firstName: formData.get('firstName'),
            middleName: formData.get('middleName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: hashSync(formData.get('password'), 10),
            phone: formData.get('phone'),
        }
    })

    redirect('/login')
}



export async function createUpdateProfile(prevState, formData) {

    const session = await getServerSession(authConfig)
    console.log(session);

    const resp = await prisma.users_profile.upsert({
        where: {
            id: session.user.id
        },
        create: {
            dateOfBirth: new Date(formData.get('dateOfBirth')),
            sex: formData.get('sex'),
            usersId: session.user.id,
            aboutMe: formData.get('aboutMe'),
            country: formData.get('country'),
            city: formData.get('city'),
        },
        update: {
            dateOfBirth: new Date(formData.get('dateOfBirth')),
            sex: formData.get('sex'),
            aboutMe: formData.get('aboutMe'),
            country: formData.get('country'),
            city: formData.get('city'),
        }
    })

    if (resp) {
        revalidatePath('/profile')

        return {
            message: 'Профиль успешно обновлен'
        }
    }
}