import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { login } from '../services/login.service';

const passportConfigInit = () => {
  // passport.use(
  //   new LocalStrategy((userId, password, done) => {
  //     const user = users.find((user) => user.username === username && user.password === password);
  //     if (user) {
  //       return done(null, user);
  //     } else {
  //       return done(null, false, { message: 'Incorrect username or password' });
  //     }
  //   }),
  // );
  // passport.serializeUser((user, done) => {
  //   done(null, user);
  // });
  // passport.deserializeUser((user, done) => {
  //   done(null, user);
  // });
};

export { passportConfigInit };
