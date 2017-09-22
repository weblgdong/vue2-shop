import axios from 'axios';
import {CTX, commonParams} from './config';

export function getAllParentType() {
  const url = CTX + '/getAllParentType.app';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getAllTypeByParent(id) {
  const url = CTX + '/getAllTypeByParent.app';

  const data = Object.assign({}, commonParams, {
    parentId: id || ''
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getAllGoodsByType(id, sortType, orderType, key) {
  const url = CTX + '/getAllGoodsByType.app';

  const data = Object.assign({}, commonParams, {
    type: id,
    sortType: sortType,
    orderType: orderType || '',
    key: key || ''
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
