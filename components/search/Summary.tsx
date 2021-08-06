import { SearchResults } from 'domain/index';

interface Props {
  query: string;
  results?: SearchResults;
}

export const Summary: React.FC<Props> = ({ results, query }) => {
  if (!results)
    return (
      <div className="space-y-1">
        <div className="bg-white bg-opacity-5 animate-pulse h-8 w-96 rounded" />
        <div className="bg-white bg-opacity-5 animate-pulse h-7 w-72 rounded" />
      </div>
    );

  return (
    <div className="space-y-1">
      <h2 className="text-xl">
        GitHub users with &quot;<span className="font-bold">{query}</span>&quot; in their
        name
      </h2>
      <h3>
        Showing <span className="font-bold">{results.search.edges.length}</span> people
      </h3>
    </div>
  );
};
