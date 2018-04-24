
import { delay } from 'roadhog-api-doc';

const mock = {};

require('fs').readdirSync(require('path').join(__dirname + '/mock/data/')).forEach((file) => {
	Object.assign(mock, require('./mock/data/' + file));
})

export default delay(mock, 100);

