import { mockList, fetchList } from '../utils';

const users = mockList({
  'list|50': [{
    'id|+1': 1,
    name: '@cname',
    mobile: /^1[0-9]{10}$/,
    createtime: '@datetime("2017-MM-DD HH:mm:ss")',
  }],
});

module.exports = {
  'GET /api/users': fetchList(users)
};

