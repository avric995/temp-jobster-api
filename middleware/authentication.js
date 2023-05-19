const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const testUser = payload.userId === '64661a2538227f5f90ae7fdd';
    ///// **** DRUGI NACIN
    // const user = await User.findById({ _id: payload.userId }).select(
    //   '-password'
    // );
    // console.log(user);
    // req.user = user;

    ///// **** PRVI NACIN
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
