const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');


router.get('/', verify, (req,res)=>{
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
      });
    });
module.exports = router;
