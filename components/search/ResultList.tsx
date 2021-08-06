import React from 'react';
import Link from 'next/link';

import { SearchResults } from 'domain/index';

import { Result } from './Result';

interface Props {
  results?: SearchResults;
  numberOfResults: number;
}

export const ResultList: React.FC<Props> = ({ results, numberOfResults }) => {
  if (!results)
    return (
      <ResultsContainer>
        {Array(numberOfResults)
          .fill(0)
          .map((u, i) => (
            <div
              key={i}
              className="bg-white bg-opacity-5 h-20 rounded w-full animate-pulse"
            />
          ))}
      </ResultsContainer>
    );
  if (results.search.edges.length === 0) return <div>NO RESULTS BABE</div>;

  return (
    <ResultsContainer>
      {results.search.edges.map((r) => (
        <Result key={r.node.databaseId} user={r} />
      ))}
    </ResultsContainer>
  );
};

const ResultsContainer: React.FC = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
    {children}
  </div>
);
