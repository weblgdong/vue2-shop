import axios from 'axios';
import {CTX, BUTTONTYPE, commonParams} from './config';

export function getIndexContent(typeId) {
  const url = CTX + '/getIndexContent.app';
  const data = Object.assign({}, commonParams, {
    buttonType: typeId || BUTTONTYPE
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
