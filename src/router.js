import React from 'react';
import dynamic from 'dva/dynamic';
import { Route, Switch, Redirect, routerRedux } from 'dva/router';
import { dynamicWrapper } from './utils/utils';
import Error from './components/Error';

dynamic.setDefaultLoadingComponent(() => {
  return <div>loading</div>;
});

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  // route config
  const route = {
    '/example': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../routes/IndexPage')),
    },
  };
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact from="/" to="example" />
        {Object.keys(route).map(path => (
          <Route path={path} exact component={route[path].component} />
        ))}
        <Route component={Error} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
