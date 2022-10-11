export const QUERY_PARAMS = (params: object) => {
    console.info(params)
  const SORT = params['sort'] || '-createdAt';
  const LIMIT = params['limit'] || 5;
  const paramkeys = Object.keys(params);
  const filter = {};
  for (let i = 0; i < paramkeys.length; i++) {
    if (paramkeys[i] != 'page') {
      filter[paramkeys[i]] = params[paramkeys[i]];
    }
  }
  filter['sort'] = SORT;
  filter['limit'] = LIMIT;
  filter['skip'] = (params['page'] - 1) * LIMIT;
  return filter;
};
