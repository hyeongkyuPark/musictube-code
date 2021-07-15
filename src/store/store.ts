import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { createBrowserHistory } from 'history';
import userReducer from '../modules/userModule';
import vedioReducer from '../modules/videoModule'
import { all, fork } from 'redux-saga/effects';
import { videoSaga } from '../modules/videoModule';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
    context: {
        history: customHistory,
    }
})

const rootReducer = combineReducers({ user: userReducer, video: vedioReducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function* rootSaga() {
    yield all([
        fork(videoSaga),
    ]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export default store;