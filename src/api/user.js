import axios from 'axios';
import {CTX, MEMBERID} from './config';

export function getMemberImgBy16Id() {
  const url = CTX + '/getMemberImgBy16Id.app';
  const data = {
    'memberId': MEMBERID.substring(0, 16)
  };

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
