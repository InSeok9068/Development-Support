import { DefaultError } from "../helpers/error";

const getError = <E extends Error>(error: E) => {
  const COMMON_ERROR_CODE = 400;

  return {
    code: error instanceof DefaultError ? error.code : COMMON_ERROR_CODE,
    error: {
      errors: {
        body: error.message.split(":::"),
      },
    },
  };
};

export { getError };
