import faker from 'faker';

const getProducts = date => {
  let number = 10;
  const { commerce, lorem } = faker;
  const arr = [];
  while (number > 0) {
    const obj = {
      name: commerce.productName(),
      description: lorem.sentence(),
      price: commerce.price(),
      category: ['sports', 'fashion', 'entertainment'][
        Math.floor(Math.random() * 3)
      ],
      image: `https://picsum.photos/id/${Math.floor(
        Math.random() * 100,
      ) + 1}/200/300`,
      color: commerce.color(),
      createdAt: date,
      updatedAt: date,
    };
    arr.push(obj);
    number -= 1;
  }
  return arr;
};

getProducts(2);
export const up = (queryInterface, Sequelize) =>
  queryInterface.bulkInsert(
    'Products',
    getProducts(Sequelize.fn('NOW')),
    {},
  );

export const down = queryInterface =>
  queryInterface.bulkDelete('Products', null, {});
