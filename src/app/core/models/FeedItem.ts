export interface FeedItem {
  id: string;
  type: string;
  reasons: Reason[];
  date: string;
  date_cached: string;
  publication: Publication;
}

interface Publication {
  _id: string;
  type: string;
  visibility: string;
  status: string;
  date_created: string;
  date_modified: string;
  language: string;
  locale: string;
  poster_type: string;
  poster_slug: string;
  poster: Poster;
  company: Company;
  content: string;
  tags: Tag[];
  attachment_picture: string;
  attachment_picture_source: string;
  attachment_picture_width: number;
  attachment_picture_height: number;
  comments: any[];
  likes: any[];
  reports: any[];
  delta: number;
  shared_object_id: string;
  shared_object_type: string;
  shared_job: Sharedjob;
  shares: any[];
  mentions: any[];
  data_bag: any[];
}

interface Sharedjob {
  _id: string;
  slug: string;
  creator_slug: string;
  state: string;
  company_slug: string;
  start_date: string;
  duration: string;
  contract: Contract;
  location: Location2;
  salary: string;
  salary_type: string;
  date_created: string;
  date_modified: string;
  language: string;
  locale: string;
  title: string;
  mission: string;
  profile: string;
  source: string;
  source_type: string;
  online: boolean;
  domaine: string;
  new_domain: Newdomain;
  skills: Tag[];
  languages: any[];
  company: Company;
  is_index: boolean;
  project: boolean;
  duplicates: any[];
  description_company: string;
  right_now: boolean;
  unique_key: string;
  shares: any[];
}

interface Newdomain {
  _id: string;
  source: string;
}

interface Location2 {
  type: string;
  city_place_id: string;
  display_value: string;
  city: string;
  zip_code: string;
  department: string;
  department_short: string;
  state: string;
  state_short: string;
  country: string;
  country_short: string;
  points: Points;
  geo: Center;
  extra: Extra;
}

interface Contract {
  id: string;
  slug: string;
  title: string;
  title_short: string;
  order: number;
  date_created: string;
  date_modified: string;
  language: string;
  locale: string;
  duration: boolean;
}
interface Recruitmenttab {
  id: string;
  slug: string;
  title: string;
  nb_jobs: number;
}

interface Hometab {
  id: string;
  slug: string;
  title: string;
  description: string;
}

interface Location {
  points: Points;
  geo: Center;
  extra: Extra;
}

interface Extra {}

interface Points {
  center: Center;
}

interface Center {
  lat: number;
  lon: number;
}
interface Tag {
  _id: string;
  slug: string;
  name: string;
  type: string;
  date_created: string;
  date_modified: string;
}

interface Company {
  _id: string;
  slug: string;
  date_created: string;
  date_modified: string;
  date_client: string;
  status: string;
  state: string;
  name: string;
  tag_line: string;
  is_client: boolean;
  employees_number: string;
  is_autocomplete: boolean;
  industry: string;
  location: Location;
  locale: string;
  links: Link[];
  logo: string;
  banner: string;
  banner_info: Bannerinfo;
  home_tab: Hometab;
  recruitment_tab: Hometab;
  tabs: any[];
  aliases: any[];
  subsidiaries: any[];
  should_redirect: boolean;
  twitter_username: string;
  website: string;
  followed: boolean;
  external_feeds: Externalfeed[];
  high_res_logo: string;
  high_res_banner: string;
  options: any[];
  partners_validator_emails: any[];
}

interface Externalfeed {
  type: string;
  url: string;
}

interface Hometab {
  id: string;
  slug: string;
  title: string;
  description: string;
}

interface Bannerinfo {
  offset: Offset;
  zoom: number;
}

interface Offset {
  x: number;
  y: number;
}

interface Link {
  type: string;
  url: string;
  date_created: string;
  date_modified: string;
  title?: string;
}

interface Location {
  geo: Geo;
  extra: Extra;
}

interface Extra {}

interface Geo {
  lat: number;
  lon: number;
}

interface Poster {
  slug: string;
  type: string;
  displayName: string;
}

interface Reason {
  type: string;
  reason_steps: any[];
}
