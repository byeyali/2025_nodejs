const models = require("../models");
const bcrypt = require("bcryptjs");

createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "ok", data: user });
};

findAllUser = async (req, res) => {
  const users = await models.User.findAll();
  res.status(200).json({ message: "ok", data: users });
};

updateUser = async (req, res) => {
  const id = req.params.id;

  const { password, name } = req.body;
  const user = await models.User.findByPk(id);
  if (user) {
    if (password) user.password = password;
    if (name) user.name = name;
    await user.save();
    res.status(200).json({ message: "ok", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const result = await models.User.destroy({
    where: {
      id: id,
    },
  });

  if (result) {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

// login에 사용
const findUserByEmail = async (req, res) => {
  const user = await models.User.findOne({
    where: { email: email },
  });
  return user;
};

module.exports = {
  createUser,
  findAllUser,
  updateUser,
  deleteUser,
  findUserByEmail,
};
