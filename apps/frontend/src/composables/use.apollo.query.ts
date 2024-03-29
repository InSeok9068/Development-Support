import { useLoading } from '@/composables/loading';
import { useToast } from '@/composables/toast';
import type { ApolloQueryResult, OperationVariables } from '@apollo/client/core/types';
import { useQuery } from '@vue/apollo-composable';
import type { DocumentParameter, VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';

const useApolloQuery = <TResult = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentParameter<TResult, TVariables>,
  variables: VariablesParameter<TVariables>,
) => {
  const { toast } = useToast();
  const { loading } = useLoading();

  const { onResult, onError } = useQuery(document, variables, {
    fetchPolicy: 'network-only',
  });

  const apolloQuery = () =>
    new Promise<ApolloQueryResult<TResult>>((resolve, reject) => {
      loading.value = true;
      onResult((result) => {
        if (!result.loading) {
          loading.value = false;

          if (!result.data) {
            reject('no data');
          }
          resolve(result);
        }
      });
      onError((error) => {
        loading.value = false;
        const message = (error.graphQLErrors[0].extensions.originalError as any).message;
        toast.value = {
          ...toast.value,
          detail: message ?? error.message,
        };
        console.error(error);
        console.error(error.graphQLErrors);
        reject(error);
      });
    });

  return {
    apolloQuery,
  };
};

export { useApolloQuery };
