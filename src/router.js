import React, { createElement } from 'react';
import { Route, Switch, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import Error from './components/Error';

dynamic.setDefaultLoadingComponent(() => {
  return <div>loading</div>;
});

const { ConnectedRouter } = routerRedux;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

const dynamicWrapper = (app, models, component) => {
  // () => import()
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    component: () => {
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, props);
      });
    },
  });
};

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
