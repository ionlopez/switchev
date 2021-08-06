export interface User {
  node: {
    databaseId: string;
    name: string;
    location?: string;
    avatarUrl: string;
    login: string;
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

interface Repository {
  name: string;
  url: string;
}

export interface UserRepositories {
  user: {
    email: string;
    name: string;
    avatarUrl: string;
    repositories: { nodes: Repository[] };
  };
}
