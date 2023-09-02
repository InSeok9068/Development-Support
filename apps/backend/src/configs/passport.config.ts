import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as db from '../models';
import { logger } from './logger.config';

const passportConfigInit = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userId',
        passwordField: 'passowrd',
      },
      async (userId, password, done) => {
        try {
          const user = await db.getUserByUserIdAndPassword(userId, password);
          if (!user) {
            return done(null, false, { message: '로그인 실패 ' });
          } else {
            return done(null, user, { message: '로그인 성공' });
          }
        } catch (e) {
          logger.error(e);
          return done(e);
        }
      },
    ),
  );

  passport.serializeUser<any, any>((_req, user, done) => {
    done(null, user);
  });

  // passport.deserializeUser((id, done) => {
  //   done(null, id);
  // });
};

export { passportConfigInit };
