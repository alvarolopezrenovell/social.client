import {User} from "./user";

export class Publication {
  constructor (
    public _id: string,
    public text: string,
    public file: string,
    public user: User,
    public created_at: string,
  ) {}
}
