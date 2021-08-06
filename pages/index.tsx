import { LocationMarkerIcon, SearchIcon } from '@heroicons/react/solid';
import { GraphQLClient } from 'graphql-request';
import useSWR from 'swr';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { Twitter } from 'components/logos/Twitter';
import { debounce } from 'lodash';
import { client } from 'helpers/api';
import { SearchResults } from 'domain/index';
import { userDetailQuery } from 'helpers/queries';

const fetcher = (query: string) => client.request(query);

export default function Home() {
  const [query, setQuery] = useState('ion');
  const [numberOfResults, setNumberOfResults] = useState(9);

  const { data, error } = useSWR<SearchResults>(
    userDetailQuery(query, numberOfResults),
    fetcher,
  );

  console.log(data, error);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            className="bg-white bg-opacity-10 w-96 rounded-full py-4 px-6 shadow-inner focus:outline-none focus:bg-opacity-20 transition-colors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for GitHub users by name"
          />
          <div className="absolute right-6 inset-y-0 flex items-center">
            <SearchIcon className="h-5 opacity-50" />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4 text-sm">
          <span>Number of results</span>
          <div className="flex items-center">
            <button className="p-2 rounded bg-white">15</button>
            <button className="p-2 rounded bg-white">30</button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {data ? (
          <div className="space-y-1">
            <h2 className="text-xl">
              GitHub users with &quot;<span className="font-bold">{query}</span>&quot; in
              their name
            </h2>
            <h3>
              Showing <span className="font-bold">{data.search.edges.length}</span> people
            </h3>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="bg-white bg-opacity-5 animate-pulse h-8 w-96 rounded" />
            <div className="bg-white bg-opacity-5 animate-pulse h-7 w-72 rounded" />
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 w-full">
          {data
            ? data.search.edges.map((u) => (
                <Link href={`/user/${u.node.databaseId}`} key={u.node.databaseId}>
                  <a className="rounded-lg overflow-hidden bg-white bg-opacity-5 hover:bg-opacity-10 flex items-center justify-between hover:shadow-lg transition-all px-4 py-3 space-x-4">
                    <div className="border-2 border-white rounded-full p-1 border-opacity-75">
                      <div
                        className="h-12 w-12 bg-cover rounded-full"
                        style={{ backgroundImage: `url(${u.node.avatarUrl})` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-lg">{u.node.name}</h2>
                      {u.node.location && (
                        <div className="flex items-center space-x-2 text-sm opacity-50">
                          <LocationMarkerIcon className="w-4" />
                          <p>{u.node.location}</p>
                        </div>
                      )}
                    </div>
                  </a>
                </Link>
              ))
            : Array(numberOfResults)
                .fill(0)
                .map((u, i) => (
                  <div
                    key={i}
                    className="bg-white bg-opacity-5 h-64 rounded w-full animate-pulse"
                  />
                ))}
        </div>
      </div>
    </div>
  );
}
