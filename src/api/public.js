import axios from 'axios';
import {CTX, VERSIONNO, commonParams} from './config';

export function getAppBut() {
  const url = CTX + '/getAppBut.app';
  const data = Object.assign({}, commonParams, {
    versionNo: VERSIONNO
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
