export interface User {
  id: string;
  email?: string;
}

export class UserService {
  get(id: string): User {
    return { id };
  }
}
