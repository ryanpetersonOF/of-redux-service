import pipe from "../shared/pipe";

export default async function connectStoreToProvider(store, actionHelper = a => a) {
    const provider = await fin.desktop.InterApplicationBus.Channel.create("redux-example");
    provider.register('dispatch-action', pipe(actionHelper, store.dispatch.bind(store)))
    store.subscribe(() => provider.publish('state-change', store.getState()))
    provider.register('getState', () => store.getState())
    return provider
}