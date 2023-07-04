/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import httpMocks from 'node-mocks-http'
import {POST} from "@/app/api/users/route"

describe('/users', ()=> {

    test('responds 200 with created user to POST', async () => {
        const user: User = {mail: 'test@test.com', name: 'testuser'}
        const req = httpMocks.createRequest<Request>({
            method: 'POST',
            body:  JSON.stringify(user) // TODO 
          })

        
        const res = await POST(new NextRequest('http://localhost:3000/api/users', req))
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.id).not.toBeUndefined()
        expect(body.mail).toEqual('test@test.com')
        expect(body.name).toEqual('testuser')
    })
})