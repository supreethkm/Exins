// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import validate from 'validate.js';
import type { Store } from '../reducers/types';
import Routes from '../components/Routes';
import Home from '../components/Home';
import validators from '../common/validators';

validate.validators = {
  ...validate.validators,
  ...validators
};

type Props = {
  store: Store,
  history: {}
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Home />
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
