// TODO: passport를 사용한 로컬 로그인
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User, { LoginData } from "../schema/User";

passport.use(
	new JWTStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET_KEY || "SECRET" }, async (data: LoginData, done) => {
		try {
			let user = await User.findOne({ userid: data.userid });
			if (await user.checkPassword(data.passwd)) {
				done(null, user);
			} else {
				done("비밀번호가 일치하지 않음");
			}
		} catch (err) {
			return done(err);
		}
	})
);

export const jwtAuthenticate = passport.authenticate("jwt", {
	failWithError: true,
	session: false,
});
