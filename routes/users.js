var express = require('express');
var router = express.Router();

const { checkBody } = require('../modules/checkBody');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* POST user/signUp. */
router.post('/signup', (req, res) => {
  console.log(req.body)

  // Check if fields are empty :
  // if (!checkBody(req.body, ['username', 'password'])) {
  //   res.json({ result: false, error: 'Missing or empty fields' });
  //   return;
  // }

  // Check if the user has not already been registered:
  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: hash,
        token: uid2(32),
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        naissance: req.body.naissance,
        isConnected: false,
        idVerified: false,
        telVerified: false,
        avatarUri: req.body.avatarUri,
        lastPosition: {
          latitude: req.body.latitude,
          longitude: req.body.longitude
        },
        userActions: req.body.userActions,
        isAvaible: false,
        nombreAide: null,
        settings: req.body.settings,
        favouritesHelpers: [null]
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, user: newDoc });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
})

/* POST user/signin. */
router.post('/signin', (req, res) => {
  // if (!checkBody(req.body, ['email', 'password'])) {
  //   res.json({ result: false, error: 'Missing or empty fields' });
  //   return;
  // }

  User.findOne({ email: req.body.email }).then(user => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ result: true, userInfos: {email : user.email, prenom: user.prenom, nom : user.nom, token : user.token} });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

/* update user/isconnected.*/
router.post('/isconnected', (req, res) => {

  User.updateOne(
    {email: req.body.email},
    {isConnected: req.body.isConnected}
  ).then(userStatus =>{
    res.json({ result: true, updatedUser: userStatus})
  })
})

module.exports = router;
