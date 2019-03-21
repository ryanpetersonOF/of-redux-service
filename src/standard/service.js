import {createStore} from 'redux';

import counter from '../reducers/counter'
import connect from "../service";

const store = createStore(counter, 0);

connect(store).then(() => console.log('store connected'))

