'use server'

import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcryptjs"
import { redirect } from "next/navigation"

export async function registerUser(formData) {

    const prisma = new PrismaClient()

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