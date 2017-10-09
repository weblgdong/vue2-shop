import axios from 'axios';
import {CTX, commonParams} from 'api/config';

export function messageManger(type = '10A') {
  const url = CTX + '/messageManger.app';
  let data = Object.assign({}, commonParams, {
    type: type
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
