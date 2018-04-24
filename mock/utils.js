import moment from 'moment';
import Mock from 'mockjs';

export const fetchList = (data) => {
  return (req, res) => {
    const list = (typeof data === 'function') ? data(req.params, req.query) : data;
    if (!Array.isArray(list)) {
      res.status(404).send(null);
      return;
    }
    const start = parseInt(req.query.start, 10) || 0;
    const size = parseInt(req.query.size, 10) || 10;
    const result = {
      total: list.length,
      data: list.slice(start, start + size),
    };
    res.json(result);
  };
};

// ensure time rfc3339
export const mockList = (data) => {
  if (!Mock.Random.datetime_old) {
    Mock.Random.datetime_old = Mock.Random.datetime;
  }
  if (Mock.Random.datetime_old === Mock.Random.datetime) {
    Mock.Random.datetime = (format) => {
      return moment(Mock.Random.datetime_old(format)).format('YYYY-MM-DDTHH:mm:ssZ');
    };
  }
  return Mock.mock(data).list || [];
};
