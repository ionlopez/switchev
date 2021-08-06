export const userFields = `databaseId
                            login
                            avatarUrl
                            location
                            name`;

export const userDetailFields = `email
                                    login
                                    bio
                                    twitterUsername
                                    url
                                    websiteUrl`;

export const userQuery = ``;

export const userDetailQuery = (query: string, numberOfResults: number) => `query {
    search(query: "${query}", type: USER, first: ${numberOfResults}) {
      edges {
        node {
          ... on User {
           ${userFields}
           ${userDetailFields}
          }
        }
      }
    }
}`;

export const userRepositoriesQuery = (login: string) => `query {
    user(login: "${login}") {
        name
        email
        avatarUrl
        repositories(first: 50, isFork: false) { 
            nodes { 
                name 
                url 
                } 
        } 
    }
}`;
