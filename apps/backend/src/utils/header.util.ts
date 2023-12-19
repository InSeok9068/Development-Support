const getUid = (headers: any) => {
  return headers['authorization'];
};

export { getUid };
