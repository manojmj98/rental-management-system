const User  = require('../models/userModel.js');
const jwt = require('jsonwebtoken')
const constants = require('../constants/constants.js')
const merchant = async (req, res, next) => {
  try {
    let token;

    token = req.cookies.jwt;

    if (token) {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select('-password');
        console.log(decoded)
        if (req.user.role == constants.ROLE.Merchant){
          next()
        }
        else
        {
          res.status(401).json({error: 'Not authorized, only owners are able to perform this operation'});
        }

  }
}
  catch(error){
    res.status(401).json({error});
  }

}

module.exports = merchant;