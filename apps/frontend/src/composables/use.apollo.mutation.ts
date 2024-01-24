type DocumentParameter<TResult, TVariables> =
  | DocumentNode
  | Ref<DocumentNode>
  | ReactiveFunction<DocumentNode>
  | TypedDocumentNode<TResult, TVariables>
  | Ref<TypedDocumentNode<TResult, TVariables>>
  | ReactiveFunction<TypedDocumentNode<TResult, TVariables>>;
type OptionsParameter<TResult, TVariables> =
  | UseMutationOptions<TResult, TVariables>
  | Ref<UseMutationOptions<TResult, TVariables>>
  | ReactiveFunction<UseMutationOptions<TResult, TVariables>>;

import { useLoading } from '@/composables/loading';
import { useToast } from '@/composables/toast';
import type { DocumentNode, FetchResult, TypedDocumentNode } from '@apollo/client/core';
import type { OperationVariables } from '@apollo/client/core/types';
import { useMutation, type UseMutationOptions } from '@vue/apollo-composable';
import type { ReactiveFunction } from '@vue/apollo-composable/dist/util/ReactiveFunction.js';
import type { Ref } from 'vue';
const { toast } = useToast();
const { loading } = useLoading();

const useApolloMutation = <TResult = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentParameter<TResult, TVariables>,
  options?: OptionsParameter<TResult, TVariables>,
) => {
  const { mutate } = useMutation(document, options);

  const apolloMutation = () =>
    new Promise<FetchResult<TResult>>((resolve, reject) => {
      loading.value = true;
      mutate()
        .then((result) => {
          loading.value = false;
          if (result) {
            if (!result.data) {
              reject('no data');
            }

            resolve(result);
          }
        })
        .catch((error) => {
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
    apolloMutation,
  };
};

export { useApolloMutation };
