import { YogaInitialContext } from 'graphql-yoga';

export interface CustomContext {
  uid: string;
}

const customContext = (context: YogaInitialContext): CustomContext => {
  const uid = context.request.headers.get('uid') ?? '';

  return {
    uid,
  };
};

export { customContext as context };
