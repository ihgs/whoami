import { inject, injectable } from "tsyringe"


@injectable()
export default class User {

    id?: string
    name?: string
    mail?: string

    constructor(
        @inject('DATABASE')
        private database: IDatabase,
        data: any
    ){
        this.id  = data.id
        this.name = data.name
        this.mail = data.mail
    }

    save () {
        if (this.id) {
            return this.database.save('users', {id: this.id, name: this.name, mail: this.mail})
        }
    }
}


