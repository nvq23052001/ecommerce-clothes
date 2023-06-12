/**
 * Add column number to the table
 * @param item
 * @param index
 * @param page
 */
export const addNumber = (item, index, page, pageSize) => {
  return { ...item, number: index + 1 };
}
