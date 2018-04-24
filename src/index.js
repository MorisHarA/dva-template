import '@babel/polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import fastclick from 'fastclick';
import global from './models/global';
import route from './models/route';
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(global);
app.model(route);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


fastclick.attach(document.body, {});
