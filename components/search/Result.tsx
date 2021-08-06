import React from 'react';
import Link from 'next/link';

import { User } from 'domain/index';

import { LocationMarkerIcon } from '@heroicons/react/solid';

interface Props {
  user: User;
}

export const Result: React.FC<Props> = ({ user }) => (
  <Link href={`/user/${user.node.login}`}>
    <a className="rounded-lg overflow-hidden bg-white bg-opacity-5 hover:bg-opacity-10 flex items-center justify-between hover:shadow-lg transition-all px-4 py-3 space-x-4">
      <div className="border-2 border-white rounded-full p-1 border-opacity-75">
        <div
          className="h-12 w-12 bg-cover rounded-full"
          style={{ backgroundImage: `url(${user.node.avatarUrl})` }}
        />
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-lg">{user.node.name}</h2>
        {user.node.location && (
          <div className="flex items-center space-x-2 text-sm opacity-50">
            <LocationMarkerIcon className="w-4" />
            <p>{user.node.location}</p>
          </div>
        )}
      </div>
    </a>
  </Link>
);
