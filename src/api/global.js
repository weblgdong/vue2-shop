import axios from 'axios';
import {CTX, commonParams} from 'api/config';

export function messageQueryMark() {
  const url = CTX + '/messageQueryMark.app';
  return axios.get(url, {
    params: commonParams
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function messageManger() {
  const url = CTX + '/messageManger.app';
  let data = Object.assign({}, commonParams, {
    type: '10C'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
