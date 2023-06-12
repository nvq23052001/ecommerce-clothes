const columns = [
  'name',
  'category',
  'price',
  'stock',
  'description',
  'image',
  'promotion_price',
  'promotion_start',
  'promotion_end'
];

const getIdCategoryByName = (list = [], name = '') => list.find((item) => item.name === name)?._id || '';

export const transformDataExcel = (data = [], categories = []) =>
  data
    .filter((_, index) => index > 0)
    .map((rows) =>
      columns
        .map((column, index) => ({
          [column]: rows[index]
        }))
        .reduce((object, current) => Object.assign(object, current), {})
    )
    .map((product) => ({ ...product, category: getIdCategoryByName(categories, product.category) }));
