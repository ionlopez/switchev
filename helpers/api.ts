import { GraphQLClient } from 'graphql-request';

export const token = process.env.GITHUB_TOKEN;
export const endpoint = 'https://api.github.com/graphql';

console.log(token);

export const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
