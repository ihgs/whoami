import { singleton } from "tsyringe"

@singleton()
export default class MemStorage implements IDatabase {
  store: { [key: string]: any } = {}

  save(key: string, datum: any) {
    if (this.store[key] === undefined) {
      this.store[key] = {}
    }
    if (this.store[key][datum.id]) {
      throw new Error("Already exists.")
    }
    this.store[key][datum.id] = datum
    return datum
  }
}
