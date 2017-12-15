import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default history => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, routerMiddleware(history)));
    const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);

    return { persistor, store };
}