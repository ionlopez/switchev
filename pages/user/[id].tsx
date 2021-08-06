import { CodeIcon } from '@heroicons/react/solid';
import { UserRepositories } from 'domain/index';
import { client } from 'helpers/api';
import { userRepositoriesQuery } from 'helpers/queries';
import { NextPageContext } from 'next';
import useSWR from 'swr';

const fetcher = (query: string) => client.request(query);

//@ts-ignore
export const Index = ({ id }) => {
  //TODO: Error handling
  const { data, error } = useSWR<UserRepositories>(userRepositoriesQuery(id), fetcher);

  if (!data) {
    return (
      <div className="flex space-x-8 items-start animate-pulse">
        <div className="bg-white bg-opacity-10 p-6 rounded-lg space-y-3 w-72 h-60"></div>
        <div className="space-y-4 flex-1">
          <div className="bg-white bg-opacity-10 w-64 h-12" />
          <ul className="grid grid-cols-4 gap-4 flex-1">
            <li className="border rounded h-12 w-full" />
            <li className="border rounded h-12 w-full" />
            <li className="border rounded h-12 w-full" />
            <li className="border rounded h-12 w-full" />
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-8 items-start">
      <div className="bg-white bg-opacity-10 p-6 rounded-lg space-y-3 w-72">
        <div
          className="h-16 w-16 rounded-full bg-cover border-2 border-white border-opacity-70"
          style={{ backgroundImage: `url(${data.user.avatarUrl})` }}
        />
        <div>
          <h2 className="text-xl font-bold">{data.user.name}</h2>
          <h3 className="text-sm opacity-50">{data.user.email}</h3>
          <h3 className="text-sm opacity-50">{id}</h3>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-lg">
          {data.user.name}&apos;s repositories ({data.user.repositories.nodes.length})
        </h2>
        <ul className="grid grid-cols-4 gap-4">
          {data.user.repositories.nodes.map((r) => (
            <li key={r.name}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 hover:underline border rounded-md border-opacity-40 p-4"
              >
                <CodeIcon className="h-4" />
                <span>{r.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  };
};

export default Index;
