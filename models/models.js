const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Account = sequelize.define("account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login: { type: DataTypes.STRING, unique: true },
  confirmed: { type: DataTypes.BOOLEAN },
  password: { type: DataTypes.STRING },
});
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  patronymic: { type: DataTypes.STRING },
  fio: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  company: { type: DataTypes.STRING }, // Название компании
  post: { type: DataTypes.STRING }, //Должность
  city: { type: DataTypes.STRING },
});

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

const Token = sequelize.define("token", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  refresh_token: {
    type: DataTypes.STRING,
    unique: true,
  },
});

// Касаемо товаров и их заказов

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  datetime: {
    type: DataTypes.DATE,
  },
  sum: { type: DataTypes.REAL, defaultValue: 0 },
  delivery_type: { type: DataTypes.STRING },
  adress: { type: DataTypes.STRING },
});
//Корзина
const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type_name: { type: DataTypes.STRING },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
  sum: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Order_good = sequelize.define("order_good", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  sum: { type: DataTypes.REAL, defaultValue: 0 },
});

const Goods = sequelize.define("goods", {
  id_good: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  good_name: { type: DataTypes.STRING },
  article: {
    type: DataTypes.STRING,
  },
  price: { type: DataTypes.REAL, defaultValue: null },
  img: { type: DataTypes.ARRAY(DataTypes.STRING) },
  features: { type: DataTypes.ARRAY(DataTypes.STRING) }, //Характеристика товара
  good_name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  storage: { type: DataTypes.INTEGER, defaultValue: 0 }, // Кол-во товаров на складе
  secret: { type: DataTypes.BOOLEAN }, // Отображается ли товар у обычных пользователей
});
//Характеристика товара
const GoodInfo = sequelize.define("good_info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
});

//Бренды товаров
const Brand = sequelize.define("brand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_name: { type: DataTypes.STRING },
  brand_logo: {
    type: DataTypes.STRING,
  },
  description: { type: DataTypes.STRING },
  url: { type: DataTypes.STRING },
});

//Категории и подкатегории для товаров
const Types = sequelize.define("types", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type_name: { type: DataTypes.STRING },
  parent: { type: DataTypes.INTEGER, defaultValue: null },
  img: { type: DataTypes.STRING },
});

//Отдельный слайдер для домашней страницы с новостями и тд
const SliderHome = sequelize.define("slider_home", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: { type: DataTypes.STRING },
  src: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT },
  url: { type: DataTypes.STRING },
});

User.hasOne(Account);
Account.belongsTo(User);

Role.hasOne(Account);
Account.belongsTo(Role);

// Связи таблиц с Account
Account.hasOne(Token);
Token.belongsTo(Account);

Account.hasMany(Order);
Order.belongsTo(Account);

//Корзина
Account.hasOne(Cart);
Cart.belongsTo(Account);

Cart.hasMany(Goods);
Cart.belongsTo(Goods);

//Связи с товарами
Brand.hasMany(Goods);
Goods.belongsTo(Brand);

Order.hasMany(Order_good);
Order_good.belongsTo(Order);

Types.hasMany(Goods);
Goods.belongsTo(Types);

Goods.hasOne(GoodInfo);
GoodInfo.belongsTo(Goods);

Order_good.hasMany(Goods, { foreignKey: "id_good" });
Goods.belongsTo(Order_good, { foreignKey: "id_good" });

module.exports = {
  User,
  Cart,
  Types,
  Goods,
  GoodInfo,
  Order,
  Order_good,
  Brand,
  Token,
  Account,
  Role,
  SliderHome,
};
