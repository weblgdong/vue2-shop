import axios from 'axios';
import {CTX, commonParams} from './config';

/**
 * @function getGoodsDetail 商品详情
 * @param  {String} goodsId {商品Id}
 * @return {Object} {商品列表}
 */
export function getGoodsDetail(goodsId) {
  const url = CTX + '/getGoodsDetail.app';
  let data = Object.assign({}, commonParams, {
    id: goodsId
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
};
