module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });


    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find({user: req.user.local.email}).toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out.')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      let teslaArr= ['img/Model S Solid Black.jpeg', 'img/Model S Red Multi Coat.jpeg','img/Model S Pearl White.jpeg','img/Model X Solid Black.jpeg','img/Model X Red Multi Coat.jpeg','img/Model X Pearl White.jpeg','img/Tesla Roadster Solid Black.jpeg','img/Tesla Roadster Red Multi Coat.jpeg','img/Tesla Roadster Pearl White.jpeg', 'img/Model 3 Pearl White.jpeg', 'img/Model 3 Red Multi Coat.jpeg', 'img/Model 3 Solid Black.jpeg', 'img/Model Y Pearl White.jpeg', 'img/Model Y Red Multi Coat.jpeg', 'img/Model Y Solid Black.jpeg']
      let customTesla = ''
      let teslaConcatImg = 'img/' + req.body.one + ' ' + req.body.five + '.jpeg'
      console.log(teslaConcatImg, teslaArr[6])
      for (let i = 0; i < teslaArr.length; i++){
        if(teslaConcatImg == teslaArr[i]){
          customTesla = teslaArr[i]
          console.log('hi', customTesla, teslaArr)
        }
      }
      db.collection('messages').save({name: req.body.name, one: req.body.one, two: req.body.two, three: req.body.three, four: req.body.four, five: req.body.five, user: req.user.local.email, customTesla: customTesla}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/messages', (req, res) => {
      let newTeslaColor = 'img/' + req.body.one + ' ' + 'Red Multi Coat' + '.jpeg'
      let customTesla = 'img/' + req.body.one + ' ' + req.body.five + '.jpeg'
      console.log("customTesla", customTesla)
      console.log(req.body.one)
      //find img/Model X Pearl White.jpeg
      //update img/Model X Red Multi Coat.jpeg
      db.collection('messages').findOneAndUpdate({five: req.body.five, customTesla: customTesla}, {
        $set: {
          customTesla: newTeslaColor,
          five: 'Red Multi Coat'
        }
      }, (err, result) => {
        if (err) return res.send(err)
        console.log('hello')
        res.redirect('/profile') 
      })
    })
    app.put('/white', (req, res) => {
      let newTeslaColor = 'img/' + req.body.one + ' ' + 'Pearl White' + '.jpeg'
      let customTesla = 'img/' + req.body.one + ' ' + req.body.five + '.jpeg'
      console.log("customTesla", customTesla)
      console.log(req.body.one)
      //find img/Model X Pearl White.jpeg
      //update img/Model X Red Multi Coat.jpeg
      db.collection('messages').findOneAndUpdate({five: req.body.five, customTesla: customTesla}, {
        $set: {
          customTesla: newTeslaColor,
          five: 'Pearl White'
        }
      }, (err, result) => {
        if (err) return res.send(err)
        console.log('hello')
        res.redirect('/profile') 
      })
    })

    app.put('/black', (req, res) => {
      let newTeslaColor = 'img/' + req.body.one + ' ' + 'Solid Black' + '.jpeg'
      let customTesla = 'img/' + req.body.one + ' ' + req.body.five + '.jpeg'
      console.log("customTesla", customTesla)
      console.log(req.body.one)
      //find img/Model X Pearl White.jpeg
      //update img/Model X Red Multi Coat.jpeg
      db.collection('messages').findOneAndUpdate({five: req.body.five, customTesla: customTesla}, {
        $set: {
          customTesla: newTeslaColor,
          five: 'Solid Black'
        }
      }, (err, result) => {
        if (err) return res.send(err)
        console.log('hello')
        res.redirect('/profile') 
      })
    })
   

        app.delete('/dates', (req, res) => {
          db.collection('messages').findOneAndDelete({name: req.body.name.trim(),}, (err, result) => {
            
            if (err) return res.send(500, err)
            res.send('Message deleted!')
          })
        })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, one: req.body.one, two: req.body.two, three: req.body.three, four: req.body.four, five: req.body.five }, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
