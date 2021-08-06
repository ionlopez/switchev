# A GitHub user search page [Switch EV code test]

(This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app))

I am using Tailwind CSS for styling, and SWR to interact with the API.

## How to run

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Alternatively, you can see a deployed version [here](https://switchev.vercel.app/).

## Todo

- I haven't added any error handling or empty states.
- I haven't written tests.
- I haven't broken up the "User" page into separate components.
- I haven't cleaned up the GraphQL queries to return a cleaner data structures.
- In the search page, I haven't debounced the search input `onChange` callback.
