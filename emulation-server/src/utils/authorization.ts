import Application from "koa";
import {State} from "../state";

export function isAuthorizedRequest(ctx: Application.DefaultContext, state: State) {
    return state.sessions && state.sessions.some(session => {
        const authorizationCookie = ctx.get('authorization');

        if (!authorizationCookie) {
            return false
        }

        const match = authorizationCookie.match(/^Bearer (\S+)$/);

        if (!match) {
            return false
        }

        const accessToken = match[1];

        return session.accessToken === accessToken;
    });
}
