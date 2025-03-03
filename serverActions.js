'use server'

import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcryptjs"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import authConfig from "./authConfig"
import { revalidatePath } from "next/cache"
import { writeFileSync } from "fs"
import { join } from "path"
const prisma = new PrismaClient()

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}


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

    const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/webp'
    ]

    const img = formData.get('avatar')

    const img_name = uuidv4() + img.name
    console.log({
        img_name,
        img
    })
    if (img.name !== 'undefined' && allowedTypes.includes(img.type) && img.size < 5242880) {
        const bytes = await img.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const path = join('public', 'avatars', img_name)



        writeFileSync(path, buffer)
    }



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
            ...(img.name !== 'undefined' ? { avatar: img_name } : {}),
        },
        update: {
            dateOfBirth: new Date(formData.get('dateOfBirth')),
            sex: formData.get('sex'),
            aboutMe: formData.get('aboutMe'),
            country: formData.get('country'),
            city: formData.get('city'),
            ...(img.name !== 'undefined' ? { avatar: img_name } : {}),

        }
    })

    if (resp) {
        revalidatePath('/profile')

        return {
            message: 'Профиль успешно обновлен'
        }
    }
}