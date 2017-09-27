import axios from 'axios';
import {CTX, REQUESTNAME, SIGN, TIMESTAMP, commonParams} from 'config';

export function attributeView(goodsId) {
  const url = CTX + '/getGoodsDetail.app';
  let data = Object.assign({}, commonParams, {
    requestName: REQUESTNAME,
    sign: SIGN,
    timestamp: TIMESTAMP
  });

  axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
