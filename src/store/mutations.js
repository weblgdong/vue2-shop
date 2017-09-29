import * as types from './mutation-types';

const mutataions = {
  [types.SET_SUBJECT](state, subject) {
    state.subject = subject;
  },
  [types.SET_SORT](state, sort) {
    state.sort = sort;
  },
  [types.SET_GOODS](state, goods) {
    state.goods = goods;
  },
  [types.SET_SSUBJECT](state, subjectList) {
    state.subjectList = subjectList;
  }
};
export default mutataions;
