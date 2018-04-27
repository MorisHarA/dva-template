import React from 'react';
import dynamic from 'dva/dynamic';

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

export const dynamicWrapper = (app, models, component) => {
  // () => import()
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    component: () => {
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => React.createElement(Component, props);
      });
    },
  });
};
