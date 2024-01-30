import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";

const secret = 'abanerjee-secret-key';

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};


function verify(payload: any, done: VerifiedCallback) {

    const { email } = payload;

    if (email === 'abc@xyz.com') {

        const user = {
            id: 1,
            email: email,
            fullName: 'Aniruddha Banerjee'
        };

        return done(null, user);
    }

    done(null, false);

}

export function generateToken(payload: object) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function jwtStrategy() {
    return new Strategy(strategyOptions, verify);
}

export function authorize() {
    return passport.authenticate('jwt', { session: false });
}