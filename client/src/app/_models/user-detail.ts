import { UserAuthority } from './user-authority';

export class UserDetail {
    password: string;
    username: string;
    userDetails: [UserAuthority];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
}
