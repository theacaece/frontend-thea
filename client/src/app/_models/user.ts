import { UserDetail } from './user-detail';

export class User {
    userDetails: UserDetail;
    admin: boolean;
    jwttoken?: string;
}