import axios from 'axios';
import {CTX, BUTTONTYPE, commonParams} from './config';

export function getSubjectList(typeId) {
  const url = CTX + '/getSpecialSubjectDate.app';
  const data = Object.assign({}, commonParams, {
    buttonType: typeId || BUTTONTYPE
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
