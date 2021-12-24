import _ from "lodash";

export type User = { authUserId: string, marketingUnsubscribeToken: string }

export type Order = { id: string, recipeIds: string[], deliveryDate: Date, deliverySlot: { deliveryStart: string, deliveryEnd: string } }

export type Recipe = { id: string, uuid: string }

export type Session = {
    accessToken: string;
}

export type State = {
    recipes: Recipe[];
    sessions: Session[];
    orders: Order[];
    users: User[]
};

export function createState() {
    const getDefaultState = () => ({orders: [], recipes: [], sessions: [], users: []});

    let state: State = getDefaultState();

    function setState(newState: State): void {
        state = _.merge(getDefaultState(), _.cloneDeep(newState));
    }

    function getState(): State {
        return _.cloneDeep(state);
    }

    return {getState, setState}
}
