import "reflect-metadata"
import User from "@/app/components/data/user";
import MemStorage from "@/app/components/db/mem";
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';
import { container } from "tsyringe";

const instance = container.resolve(MemStorage)
const POST = async (request: NextRequest) => {
    const data = await request.json()
    const newData = {
        id: uuidv4(),
        ...data
    }
    const user = new User(instance, newData)
    return NextResponse.json(user.save())
}

export { POST }