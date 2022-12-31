import { put, call, takeEvery } from '@redux-saga/core/effects';
import * as api from '../../utils/rest';
import {
  GET_CONFIG,
  GET_CONFIG_SUCCEEDED,
  GET_ALL_CONFIG,
  GET_ALL_CONFIG_SUCCEEDED,
  GET_ITEMS,
  GET_ITEMS_SUCCEEDED,
  GET_SINGLE_ITEM,
  GET_SINGLE_ITEM_SUCCEEDED,
  DELETE_ITEM,
  DELETE_ITEM_SUCCEEDED,
  DELETE_ITEM_FAILED,
  POST_ITEM,
  POST_ITEM_SUCCEEDED,
  POST_ITEM_FAILED,
  PUT_ITEM,
  PUT_ITEM_SUCCEEDED,
  PUT_ITEM_FAILED,
  GET_RELATION,
  GET_RELATION_SUCCEEDED,
  POST_RELATION,
  POST_RELATION_SUCCEEDED,
  POST_RELATION_FAILED,
  DELETE_RELATION,
  DELETE_RELATION_SUCCEEDED,
  DELETE_RELATION_FAILED,
  GET_REFERENCE,
  GET_REFERENCE_SUCCEEDED,
  POST_REFERENCE,
  POST_REFERENCE_SUCCEEDED,
  POST_REFERENCE_FAILED,
  DELETE_REFERENCE,
  DELETE_REFERENCE_SUCCEEDED,
  DELETE_REFERENCE_FAILED,
} from '../actions/itemActions';
import { ERROR } from '../actions/error';

import { GetModel } from '../../models';

function parse_items(items = []) {
  let _res = {};
  let _items = items || [];
  _items.forEach((i) => {
    const type = i.sk.replace('_item', '');

    const Model = GetModel(type);
    i = new Model(i);

    if (type in _res) {
      _res[type].push(i);
    } else {
      _res[type] = [i];
    }
  });
  return _res;
}

interface ParamItem {
  key: string;
  value: number | string;
}

interface Query {
  type: string;
  pk?: string;
  params?: ParamItem[];
}

interface Submission extends Query {
  submission: any;
  overwrite?: boolean;
  relations?: any[];
  references?: any[];
}

export function* getConfig(action: any) {
  let { payload, error } = yield call(fetchGetConfig, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  yield put(GET_CONFIG_SUCCEEDED(payload));
}
async function fetchGetConfig({ type }: Query) {
  let res = await api.get(`/q/${type}/describe`);
  if ('payload' in res) {
    res.payload.type = type;
  }
  const Model = GetModel('config');
  res.payload.Item = new Model(res.payload.Item);
  return res;
}

export function* getAllConfig(action: any) {
  let { payload, error } = yield call(fetchGetAllConfig);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  yield put(GET_ALL_CONFIG_SUCCEEDED(payload));
}
async function fetchGetAllConfig() {
  const Model = GetModel('config');
  const res = (await api.get('/config')) || {};
  if (!res.payload) {
    return {
      payload: {
        Items: [],
      },
    };
  }
  for (let k of Object.keys(res.payload.Items)) {
    res.payload.Items[k] = new Model(res.payload.Items[k]);
  }
  return res;
}

export function* getItems(action: any) {
  let { payload, error } = yield call(fetchGetItems, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  yield put(GET_ITEMS_SUCCEEDED(payload));
}
async function fetchGetItems({ type, params }: Query) {
  let res = await api.get(
    `/q/${type}/?${(params || []).map((p) => `${p.key}=${p.value}`).join('&')}`
  );
  if ('payload' in res) {
    res.payload.type = type;
  }
  const Model = GetModel(type);
  let newItems: any = {};
  console.log(res.payload);
  newItems[type] = (res.payload.Items || []).map((i: any) => new Model(i));
  res.payload.Items = newItems;
  return res;
}

export function* getSingleItem(action: any) {
  let { payload, error } = yield call(fetchGetSingleItem, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  yield put(GET_SINGLE_ITEM_SUCCEEDED(payload));
}
async function fetchGetSingleItem({ type, pk }: Query) {
  const res = await api.get(`/q/${type}/i/${encodeURI(pk || '')}`);
  if ('payload' in res) {
    res.payload.type = type;
  }
  const Model = GetModel(type);
  res.payload.Item = new Model(res.payload.Item);
  return res;
}

export function* deleteItem(action: any) {
  let { payload, error } = yield call(fetchDeleteItem, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  if (payload.result) {
    yield put(DELETE_ITEM_SUCCEEDED(payload));
    if (action.payload.onSubmit) {
      yield call(action.payload.onSubmit, payload);
    }
  } else {
    yield put(DELETE_ITEM_FAILED(payload));
  }
}
async function fetchDeleteItem({ type, pk }: Query) {
  const res = await api.del(`/q/${type}/i/${encodeURI(pk || '')}`);
  console.log(res);
  return Object.assign({}, res, {
    type,
  });
}

export function* postItem(action: any) {
  let { payload, error } = yield call(fetchPostItem, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  if (payload.result) {
    yield put(POST_ITEM_SUCCEEDED(payload));
    if (action.payload.onSubmit) {
      yield call(action.payload.onSubmit, payload);
    }
  } else {
    yield put(POST_ITEM_FAILED(payload));
  }
}
async function fetchPostItem({
  type,
  submission,
  relations,
  references,
}: Submission) {
  let res = await api.post(`/q/${type}/`, {
    submission,
  });
  const { pk } = res.payload.Item || {};
  if (pk && relations) {
    res['relations'] = relations.map(async (r) => {
      const submission = { pk: r.pk };
      return await api.post(`/q/${type}/i/${encodeURI(pk || '')}/rel`, {
        submission,
      });
    });
  }
  if (pk && references) {
    res['references'] = references.map(async (r) => {
      const submission = { pk: r.pk };
      return await api.post(`/q/${type}/i/${encodeURI(pk || '')}/ref`, {
        submission,
      });
    });
  }
  return Object.assign({}, res, {
    type,
  });
}

export function* putItem(action: any) {
  let { payload, error } = yield call(fetchPutItem, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  if (payload.result) {
    yield put(PUT_ITEM_SUCCEEDED(payload));
    if (action.payload.onSubmit) {
      yield call(action.payload.onSubmit, payload);
    }
  } else {
    yield put(PUT_ITEM_FAILED(payload));
  }
  yield put(PUT_ITEM_SUCCEEDED(payload));
}
async function fetchPutItem({
  type,
  submission,
  overwrite,
  relations,
  references,
}: Submission) {
  let res = await api.put(`/q/${type}?overwrite=${overwrite || 'False'}`, {
    submission,
  });
  const { pk } = res.payload.Item || {};
  if (pk && relations) {
    res['relations'] = relations.map(async (r) => {
      const submission = { pk: r.pk };
      return await api.post(`/q/${type}/i/${encodeURI(pk || '')}/rel`, {
        submission,
      });
    });
  }
  if (pk && references) {
    res['references'] = references.map(async (r) => {
      const submission = { pk: r.pk };
      return await api.post(`/q/${type}/i/${encodeURI(pk || '')}/ref`, {
        submission,
      });
    });
  }
  return Object.assign({}, res, {
    type,
  });
}

//関連アイテム
export function* getRelation(action: any) {
  let { payload, error } = yield call(fetchGetRelation, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  yield put(GET_RELATION_SUCCEEDED(payload));
}
async function fetchGetRelation({ type, pk }: Query) {
  let res = await api.get(`/q/${type}/i/${encodeURI(pk || '')}/rel`);
  if ('payload' in res) {
    res.payload.type = type;
  }
  res.payload.Items = parse_items(res.payload.Items);
  return res;
}

export function* postRelation(action: any) {
  let { payload, error } = yield call(fetchPostRelation, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  if (payload.result) {
    yield put(POST_RELATION_SUCCEEDED(payload));
    if (action.payload.onSubmit) {
      yield call(action.payload.onSubmit, payload);
    }
  } else {
    yield put(POST_RELATION_FAILED(payload));
  }
}
async function fetchPostRelation({ type, pk, submission }: Submission) {
  const res = await api.post(`/q/${type}/i/${encodeURI(pk || '')}/rel`, {
    submission,
  });
  return Object.assign({}, res, {
    type,
  });
}

export function* deleteRelation(action: any) {
  let { payload, error } = yield call(fetchDeleteRelation, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  if (payload.result) {
    yield put(DELETE_RELATION_SUCCEEDED(payload));
    if (action.payload.onSubmit) {
      yield call(action.payload.onSubmit, payload);
    }
  } else {
    yield put(DELETE_RELATION_FAILED(payload));
  }
}
async function fetchDeleteRelation({ type, pk, submission }: Submission) {
  const res = await api.del(`/q/${type}/i/${encodeURI(pk || '')}/rel`, {
    submission,
  });
  return Object.assign({}, res, {
    type,
  });
}

//参照アイテム
export function* getReference(action: any) {
  let { payload, error } = yield call(fetchGetReference, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  yield put(GET_REFERENCE_SUCCEEDED(payload));
}
async function fetchGetReference({ type, pk }: Query) {
  let res = await api.get(`/q/${type}/i/${encodeURI(pk || '')}/ref`);
  if ('payload' in res) {
    res.payload.type = type;
  }
  res.payload.Items = parse_items(res.payload.Items);
  return res;
}

export function* postReference(action: any) {
  let { payload, error } = yield call(fetchPostReference, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  if (payload.result) {
    yield put(POST_REFERENCE_SUCCEEDED(payload));
    if (action.payload.onSubmit) {
      yield call(action.payload.onSubmit, payload);
    }
  } else {
    yield put(POST_REFERENCE_FAILED(payload));
  }
}
async function fetchPostReference({ type, pk, submission }: Submission) {
  const res = await api.post(`/q/${type}/i/${encodeURI(pk || '')}/ref`, {
    submission,
  });
  return Object.assign({}, res, {
    type,
  });
}

export function* deleteReference(action: any) {
  let { payload, error } = yield call(fetchDeleteReference, action.payload);
  if (error) {
    yield put(ERROR(error));
    return;
  }
  if (payload.result) {
    yield put(DELETE_REFERENCE_SUCCEEDED(payload));
    if (action.payload.onSubmit) {
      yield call(action.payload.onSubmit, payload);
    }
  } else {
    yield put(DELETE_REFERENCE_FAILED(payload));
  }
}
async function fetchDeleteReference({ type, pk, submission }: Submission) {
  const res = await api.del(`/q/${type}/i/${encodeURI(pk || '')}/ref`, {
    submission,
  });
  return Object.assign({}, res, {
    type,
  });
}

function* watchItemList() {
  yield takeEvery(GET_CONFIG, getConfig);
  yield takeEvery(GET_ALL_CONFIG, getAllConfig);

  yield takeEvery(GET_ITEMS, getItems);
  yield takeEvery(GET_SINGLE_ITEM, getSingleItem);
  yield takeEvery(DELETE_ITEM, deleteItem);
  yield takeEvery(POST_ITEM, postItem);
  yield takeEvery(PUT_ITEM, putItem);

  yield takeEvery(GET_RELATION, getRelation);
  yield takeEvery(POST_RELATION, postRelation);
  yield takeEvery(DELETE_RELATION, deleteRelation);

  yield takeEvery(GET_REFERENCE, getReference);
  yield takeEvery(POST_REFERENCE, postReference);
  yield takeEvery(DELETE_REFERENCE, deleteReference);
}

export const itemSaga = [watchItemList];
