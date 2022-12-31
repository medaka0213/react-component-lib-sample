import { createAction } from '@reduxjs/toolkit';

export const GET_CONFIG = createAction<any>('GET_CONFIG');
export const GET_CONFIG_SUCCEEDED = createAction<any>('GET_CONFIG_SUCCEEDED');

export const GET_ALL_CONFIG = createAction<any>('GET_ALL_CONFIG');
export const GET_ALL_CONFIG_SUCCEEDED = createAction<any>(
  'GET_ALL_CONFIG_SUCCEEDED'
);

export const GET_ITEMS = createAction<any>('GET_ITEMS');
export const GET_ITEMS_SUCCEEDED = createAction<any>('GET_ITEMS_SUCCEEDED');

export const GET_SINGLE_ITEM = createAction<any>('GET_SINGLE_ITEM');
export const GET_SINGLE_ITEM_SUCCEEDED = createAction<any>(
  'GET_SINGLE_ITEM_SUCCEEDED'
);

export const DELETE_ITEM = createAction<any>('DELETE_ITEM');
export const DELETE_ITEM_SUCCEEDED = createAction<any>('DELETE_ITEM_SUCCEEDED');
export const DELETE_ITEM_FAILED = createAction<any>('DELETE_ITEM_FAILED');

export const POST_ITEM = createAction<any>('POST_ITEM');
export const POST_ITEM_SUCCEEDED = createAction<any>('POST_ITEM_SUCCEEDED');
export const POST_ITEM_FAILED = createAction<any>('POST_ITEM_FAILED');

export const PUT_ITEM = createAction<any>('UPDATE_ITEM');
export const PUT_ITEM_SUCCEEDED = createAction<any>('UPDATE_ITEM_SUCCEEDED');
export const PUT_ITEM_FAILED = createAction<any>('UPDATE_ITEM_FAILED');

//関連アイテム
export const GET_RELATION = createAction<any>('GET_RELATION');
export const GET_RELATION_SUCCEEDED = createAction<any>(
  'GET_RELATION_SUCCEEDED'
);

export const POST_RELATION = createAction<any>('POST_RELATION');
export const POST_RELATION_SUCCEEDED = createAction<any>(
  'POST_RELATION_SUCCEEDED'
);
export const POST_RELATION_FAILED = createAction<any>('POST_RELATION_FAILED');

export const DELETE_RELATION = createAction<any>('DELETE_RELATION');
export const DELETE_RELATION_SUCCEEDED = createAction<any>(
  'DELETE_RELATION_SUCCEEDED'
);
export const DELETE_RELATION_FAILED = createAction<any>(
  'DELETE_RELATION_FAILED'
);

//参照アイテム
export const GET_REFERENCE = createAction<any>('GET_REFERENCE');
export const GET_REFERENCE_SUCCEEDED = createAction<any>(
  'GET_REFERENCE_SUCCEEDED'
);

export const POST_REFERENCE = createAction<any>('POST_REFERENCE');
export const POST_REFERENCE_SUCCEEDED = createAction<any>(
  'POST_REFERENCE_SUCCEEDED'
);
export const POST_REFERENCE_FAILED = createAction<any>('POST_REFERENCE_FAILED');

export const DELETE_REFERENCE = createAction<any>('DELETE_REFERENCE');
export const DELETE_REFERENCE_SUCCEEDED = createAction<any>(
  'DELETE_REFERENCE_SUCCEEDED'
);
export const DELETE_REFERENCE_FAILED = createAction<any>(
  'DELETE_REFERENCE_FAILED'
);
