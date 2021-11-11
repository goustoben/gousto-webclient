import _ from "lodash";

export type User = { authUserId: string, marketingUnsubscribeToken: string }
export type State = { users?: [User] };

export function createState() {
    let state: State = {};

    function setState(newState: State): void {
        state = _.cloneDeep(newState);
    }

    function getState(): State {
        return _.cloneDeep(state);
    }

    return {getState, setState}
}
