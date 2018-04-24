import queryString from 'query-string';

export default {

  namespace: 'route',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'sync',
          payload: {
            ...location,
            query: queryString.parse(location.search),
          },
        });
      });
    },
  },

  effects: {
  },

  reducers: {
    sync: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },

};
