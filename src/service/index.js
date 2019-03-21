import {createStore} from 'redux';

import counter from '../reducers/counter'
import {initializeProviderStore} from "./utils";

// Create Redux Store on Service
const store = createStore(counter, 0);

// Wire the store and channel provider
initializeProviderStore(store).then(() => console.log('store connected')).catch(console.error);

