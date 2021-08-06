import React, { useState } from 'react';
import useSWR from 'swr';

import { client } from 'helpers/api';
import { userDetailQuery } from 'helpers/queries';
import { SearchResults } from 'domain/index';

import { SearchIcon } from '@heroicons/react/solid';
import { ResultList } from 'components/search/ResultList';
import { Summary } from 'components/search/Summary';

const fetcher = (query: string) => client.request(query);

export default function Home() {
  const [query, setQuery] = useState('ion');
  const [numberOfResults, setNumberOfResults] = useState(12);

  const { data, error } = useSWR<SearchResults>(
    userDetailQuery(query, numberOfResults),
    fetcher,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center justify-between">
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
          <div className="flex items-center space-x-1">
            <button
              className={`py-2 w-10 rounded bg-white bg-opacity-10 hover:bg-opacity-20 border-2 ${
                numberOfResults === 12 ? 'border-white' : 'border-transparent'
              }`}
              onClick={() => setNumberOfResults(12)}
            >
              12
            </button>
            <button
              className={`py-2 w-10 rounded bg-white bg-opacity-10 hover:bg-opacity-20 border-2 ${
                numberOfResults === 24 ? 'border-white' : 'border-transparent'
              }`}
              onClick={() => setNumberOfResults(24)}
            >
              24
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Summary query={query} results={data} />
        <ResultList results={data} numberOfResults={numberOfResults} />
      </div>
    </div>
  );
}
