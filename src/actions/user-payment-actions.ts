"use server"

import { userFormSchema, type UserFormData } from "@/lib/schema"
import { revalidatePath } from "next/cache"

type FormState = {
  success?: boolean
  message?: string
  fieldErrors?: {
    username?: string[]
    email?: string[]
    password?: string[]
  }
}

export async function createUser(formData: FormData): Promise<FormState> {
  // Extract form data
  const rawFormData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  // Validate with Zod
  const validationResult = userFormSchema.safeParse(rawFormData)

  // If validation fails, return errors
  if (!validationResult.success) {
    return {
      success: false,
      message: "Form validation failed",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    }
  }

  // Get validated data
  const validatedData = validationResult.data

  try {
    // Here you would store the data in your database
    // This is a placeholder for your actual database operation
    await storeUserInDatabase(validatedData)

    // Return success
    revalidatePath("/")
    return {
      success: true,
      message: "User created successfully",
    }
  } catch (error) {
    console.error("Error storing user data:", error)
    return {
      success: false,
      message: "Failed to store user data. Please try again.",
    }
  }
}

// Mock database function - replace with your actual database implementation
async function storeUserInDatabase(userData: UserFormData) {
  // This is where you would connect to your database and store the user
  // For example with Prisma:
  // await prisma.user.create({
  //   data: {
  //     username: userData.username,
  //     email: userData.email,
  //     password: await bcrypt.hash(userData.password, 10),
  //   },
  // })

  // For now, we'll just simulate a delay
  console.log("Storing user in database:", userData)
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { id: "user_" + Math.random().toString(36).substring(2, 9) }
}
