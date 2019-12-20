import { combineReducers } from 'redux';
import common, { ICommonReducer } from '../modules/common/common.reducer';

export interface IStore {
  common: ICommonReducer;
}

export default combineReducers({
  common,
});
