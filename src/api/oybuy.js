import axios from 'axios';
import {CTX} from './config';

export function getSeckillTime() {
  const url = CTX + '/getSeckillTime.app';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getSeckillGoods(time) {
  console.log(time);
  const url = CTX + '/getSeckillGoods.app';
  let data = {
    beginningTime: time
  };
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getAllGood10E() {
  const url = CTX + '/getAllGood10E.app?typeId=';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}
