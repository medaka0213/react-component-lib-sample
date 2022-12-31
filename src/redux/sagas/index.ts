import { all } from 'redux-saga/effects';
import { itemSaga } from './itemSaga';

const allSagas = [ ...itemSaga];

export default function* rootSaga() {
  yield all(allSagas.map((f) => f()));
}