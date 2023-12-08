export const paginationOptions = (offset?: number, limit?: number) => ({
  ...(offset && { skip: offset }),
  ...(limit && { take: limit }),
});
