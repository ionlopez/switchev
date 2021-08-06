import { NextPageContext } from 'next';

export const Index = ({ id }) => <div>hello {id}</div>;

Index.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  };
};

export default Index;
