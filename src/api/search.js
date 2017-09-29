import {CTX, commonParams} from './config';
import axios from 'axios';

// 获得商品搜索热词
export function getGoodSearchKey() {
  const url = CTX + '/getGoodSearchKey.app';
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}

// 获得专题搜索热词
export function getSubjectSearchKey() {
  const url = CTX + '/getSubjectSearchKey.app';
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}

// 历史搜索记录   搜索类型(10A商品，10B专题)
export function searchRecordList(type = '10A') {
  const url = CTX + '/searchRecordList.app';
  let data = Object.assign({}, commonParams, {
    searchType: type
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

// 根据关键字搜索专题/商品
export function getGoodOrSubjectByKey(key, type = '10A') {
  const url = CTX + '/getGoodOrSubjectByKey.app';
  let data = Object.assign({}, commonParams, {
    searchType: type,
    key: key
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
