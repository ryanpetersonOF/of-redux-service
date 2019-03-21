import pipe from "../shared/pipe";

/**
 * Initializes the openfin channel and wires channel + redux actions
 * @param store A redux store
 * @param actionHelper Reducer
 */
export async function initializeProviderStore(store, actionHelper = a => a) {
    // Create the openfin channel 'redux-example'
    const provider = await fin.desktop.InterApplicationBus.Channel.create("redux-example");

    // Register the 'dispatch-action' channel action and reduces in redux
    provider.register('dispatch-action', pipe(actionHelper, store.dispatch.bind(store)));

    // Subscribe Redux, triggering a channel publish of the state
    store.subscribe(() => provider.publish('state-change', store.getState()));

    // Register the 'getState' channel action, returning the redux state
    provider.register('getState', () => store.getState());

    // Return the channel provider
    return provider;
}