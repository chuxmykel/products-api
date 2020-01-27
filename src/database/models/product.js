export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      category: DataTypes.STRING,
      image: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {},
  );
  return Product;
};
