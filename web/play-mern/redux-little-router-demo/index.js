import {
    combineReducers,
    compose,
    createStore,
    applyMiddleware,
} from 'redux';
import {
    routerForBrowser,
    initializeCurrentLocation,
} from 'redux-little-router';
import yourReducer from './your-app';

const routes = {
    '/messages': {
        title: 'Message',
    },
    '/messages/:user': {
        title: 'Message History',
    },
    '/': {
        title: 'Home',
        '/bio': {
            title: 'Biographies',
            '/:name': {
                title: 'Biography for:',
            },
        },
    },
};

const {
    reducer,
    middleware,
    enhancer,
} = routerForBrowser({
    routes,
    basename: '/example',
});

const clientOnlyStore = createStore(
    combineReducers({
        router: reducer,
        yourReducer,
    }),
    initialState,
    compose(enhancer, applyMiddleware(middleware))
);

const initialLocation = store.getState().router;
if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation));
}
