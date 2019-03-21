import pipe from "../shared/pipe";

export default function init(options, sharedStateActionName = 'shared_state_update') {
    // Connect to the service provider using openfin channel
    const clientP = fin.desktop.InterApplicationBus.Channel.connect("redux-example", options);
    
    function createClientMiddleWare(shouldDispatchAction = (action) => action.type === sharedStateActionName ? false : action) {
        return store => next => action => {
            const toD = shouldDispatchAction(action);
            if (toD) {
                clientP.then(client => client.dispatch('dispatch-action', toD));
            }
            else {
                next(action);
            }
        };
    }

    function defaultReducer(state = {}, action) {
        return action.type === sharedStateActionName ? action.payload : state;
    }

    async function connect(store, updateActionCreator = (payload) => ({ type: sharedStateActionName, payload })) {
        // Get connect to service provider
        const client = await clientP;

        const update = pipe(updateActionCreator, store.dispatch.bind(store));

        // Register the state-change channel action from provider, triggering redux store
        client.register('state-change', update);

        // Get the initial state from the provider
        const initialState = await client.dispatch('getState');

        update(initialState);

        // Return the connection
        return client;
    }

    return {
        createClientMiddleWare, connect, defaultReducer
    };
}