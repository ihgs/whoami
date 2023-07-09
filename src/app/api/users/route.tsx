import "reflect-metadata"
import User from "@/app/components/data/user"
import MemStorage from "@/app/components/db/mem"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { container } from "tsyringe"

const instance = container.resolve(MemStorage)

class ApiError extends Error {
  static {
    this.prototype.name = "ApiError"
  }
  messages?: string[]
  constructor(
    message: any,
    detailMessages: string[],
    options: ErrorOptions = {},
  ) {
    super(message, options)
    this.messages = detailMessages
  }
}

const checkCreateInputParameter = (data: any) => {
  const messages = []
  if (!data.mail) {
    messages.push("mail is required.")
  }
  if (!data.name) {
    messages.push("name is required.")
  }
  if (messages.length > 0) {
    throw new ApiError("Invalid parameters", messages)
  }
}

const handleError = (e: any) => {
  if (e instanceof ApiError) {
    return NextResponse.json(
      { message: e.message, details: { messages: e.messages } },
      { status: 422 },
    )
  }
  if (e instanceof Error) {
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
  return NextResponse.json({ message: e }, { status: 500 })
}
const POST = async (request: NextRequest) => {
  const data = await request.json()

  try {
    checkCreateInputParameter(data)
    const newData = {
      id: uuidv4(),
      ...data,
    }
    const user = new User(instance, newData)
    return NextResponse.json({ data: user.save() })
  } catch (e) {
    return handleError(e)
  }
}

export { POST }
