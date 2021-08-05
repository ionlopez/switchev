import { SearchIcon } from '@heroicons/react/outline';
import { GraphQLClient, request } from 'graphql-request';
import useSWR from 'swr';
import Image from 'next/image';
import { useState } from 'react';

const token = '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';
const endpoint = 'https://api.github.com/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const fetcher = (query: string) => graphQLClient.request(query);

interface User {
  node: {
    name: string;
    email: string;
    databaseId: string;
    login: string;
    avatarUrl: string;
  };
}

interface SearchResults {
  search: {
    edges: User[];
  };
}

export default function Home() {
  const [query, setQuery] = useState('ion');
  const { data, error } = useSWR<SearchResults>(
    `query {
      search(query: "${query}", type: USER, first: 15) {
        edges {
          node {
            ... on User {
             databaseId
             login
             avatarUrl
             email
             bio
             location
             name,
             twitterUsername
             url
            }
          }
        }
      }
  }`,
    fetcher,
  );

  console.log(data, error);
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <input
          className="w-80 border rounded-md p-3 shadow-inner focus:outline-none focus:border-yellow-400 focus:shadow-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute right-3 inset-y-0 flex items-center">
          <SearchIcon className="h-5 opacity-50" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 w-full">
        {data
          ? data.search.edges.map((u) => (
              <div
                key={u.node.databaseId}
                className="rounded-lg overflow-hidden bg-white p-4 shadow hover:shadow-lg"
              >
                <div
                  className="h-44 bg-gray-100 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${u.node.avatarUrl})` }}
                />
                <div className="py-4">
                  <h2 className="font-medium">{u.node.name}</h2>
                  <h3 className="opacity-50 text-sm">{u.node.email}</h3>
                </div>
              </div>
            ))
          : Array(15)
              .fill(0)
              .map((u, i) => (
                <div key={i} className="bg-gray-100 h-44 rounded w-full animate-pulse" />
              ))}
      </div>
    </div>
  );
}
