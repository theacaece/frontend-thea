import { Role } from './role';
import { UserPhoto } from './user-photo';
export class UserData {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    roles: Array<Role>;
    photos: Array<UserPhoto>;
}
