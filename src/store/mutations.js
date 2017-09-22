import * as types from './mutation-types';

const mutataions = {
  [types.SET_SUBJECT](state, subject) {
    state.subject = subject;
  }
};
export default mutataions;
