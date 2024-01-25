import { useLoading } from '@/composables/loading';
import { useToast } from '@/composables/toast';
import type { ApolloQueryResult, OperationVariables } from '@apollo/client/core/types';
import { useQuery } from '@vue/apollo-composable';
import type { DocumentParameter, VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';
const { toast } = useToast();
const { loading } = useLoading();

const useApolloQuery = <TResult = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentParameter<TResult, TVariables>,
  variables: VariablesParameter<TVariables>,
) => {
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
        toast.value = {
          ...toast.value,
          detail: error.message,
        };
        console.error(error);
        reject(error);
      });
    });

  return {
    apolloQuery,
  };
};

export { useApolloQuery };
