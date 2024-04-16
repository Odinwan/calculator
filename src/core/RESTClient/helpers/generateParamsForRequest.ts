const generateParamsForRequest = <T>(url: string, filterObject: T) => {
  const params = Object.keys(filterObject as object).reduce((acc: string, k: string, i: number) => {
    const value = filterObject[k as keyof T];
    if (value !== '') {
      acc += `${i === 0 ? '' : '&'}${String(k)}=${value}`;
    }
    return acc;
  }, '');

  return params !== '' ? `${url}?${params}` : url;
};

export default generateParamsForRequest;
