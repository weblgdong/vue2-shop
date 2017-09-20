import axios from 'axios';
import {CTX, commonParams} from './config';

export function getShoppingCartList() {
  const url = CTX + '/getShoppingCartList.app';

  return axios.get(url, {
    params: commonParams
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
