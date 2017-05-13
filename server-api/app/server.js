import express from 'express';
//import expressSession from 'express-session';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import router from './router';
const LocalStrategy = require('passport-local').Strategy;
import User from './models/user';
import cors from 'cors';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/books-evaluate');

const app = express();
app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(passport.initialize());
passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    (login, password, done) => {
        User.findOne({ login: login }, (err, user) => {
            if (err) { 
                return done(err);
            }
            if (!user) {
                 return done({ msg: 'Usuário não encontrado' }, false);
            }
            if (user) {
                if (user.isAdmin) {
                    if (!user.isValidPassword(password, user.password)) {                 
                        return done({ msg: 'Senha inválida' }, false);
                    }
                } else {
                    return done({ msg: 'Usuário não tem permissão para acessar esta área.' }, false);
                }
            }
            
            return done(null, user);
        });
    }    
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//app.use('/v1', router);
router.init(app);

// error handler for all the applications
app.use(function (err, req, res, next) {
    return res.send(err);
});

const server = app.listen(3001, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
})

export default app;