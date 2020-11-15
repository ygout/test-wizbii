import { UserInfo } from '.';

export interface Comment {
    author: UserInfo;
    content: string;
    date: string;
    likes: number;
    feedItemId: string;
}
