import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import logo from 'public/logo.svg';
import Link from 'next/link';

export const Page: React.FC = ({ children }) => (
  <>
    <Head>
      <title>Switch EV Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="bg-background text-white min-h-screen font-sans flex flex-col justify-between">
      <header className="py-5 border-b border-gray-900">
        <div className="container mx-auto px-6">
          <Link href="/">
            <a className="space-y-1 block">
              <h1 className="font-bold text-xl">GitHub User Search</h1>
              <div className="flex items-center text-xs">
                <span className="mr-1">for</span>
                <Image src={logo} alt="Switch EV logo" />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-6 flex-1">{children}</main>
    </div>
  </>
);
