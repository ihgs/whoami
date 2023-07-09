interface User {
  mail: string
  name: string
}

interface IDatabase {
  save: (id: string, datum: any) => any
}
