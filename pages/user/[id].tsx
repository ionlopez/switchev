import { NextPageContext } from 'next';

//@ts-ignore
export const Index = ({ id }) => <div>hello {id}</div>;

Index.getInitialProps = async (ctx: NextPageContext) => {
  return {
    id: ctx.query.id,
  };
};

export default Index;
