export interface User {
  node: {
    databaseId: string;
    name: string;
    location?: string;
    avatarUrl: string;
  };
}

export interface SearchResults {
  search: {
    edges: User[];
  };
}

export interface UserDetail extends User {
  email: string;
  login: string;
  bio?: string;
  twitterUsername?: string;
  url: string;
  websiteUrl?: string;
}
