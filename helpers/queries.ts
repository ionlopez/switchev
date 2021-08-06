export const userFields = `databaseId
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
