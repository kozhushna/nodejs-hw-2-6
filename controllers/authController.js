const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const register = async (req, res) => {
  console.log(req.body);

  const newUser = await User.create(req.body);
  res.json({
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
