export function dynamicStateHandlerMap(stateHandlerFactory: (state: any) => () => Promise<void>) {
    return new Proxy({}, {
        get(target, props) {
            const stateKey = props as string;

            if (stateKey === "null") {
                return () => Promise.resolve()
            }

            const state = JSON.parse(stateKey);
            return stateHandlerFactory(state)
        }
    });
}
