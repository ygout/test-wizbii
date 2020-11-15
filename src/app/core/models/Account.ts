export interface Account {
  access_token: string;
  profile: Profile;
  user: User;
}

interface Profile {
  _id: string;
  name: string;
  slug: string;
  date_created: string;
  date_modified: string;
  language: string;
  locale: string;
  original_locale: string;
  first_name: string;
  last_name: string;
  sex: string;
  mobile: string;
  status: string;
  date_birthday: string;
}

interface User {
  _id: string;
  slug: string;
  username: string;
  emails: string[];
  roles: string[];
  uniq_user_id: string;
}