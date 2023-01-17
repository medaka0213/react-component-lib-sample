import { BaseModel, Fields } from './baseModel';

const taskState: any = {
  a000_TODO: {
    name: '通常タスク',
    desc: 'この作業の担当者は、まだ割り当てられていません。',
    color: 'warning',
  },
  a001_WARN: {
    name: '緊急タスク',
    desc: 'ただちに担当者を割り当てて、作業を完了してください。',
    color: 'error',
  },
  a010_ASSIGNED: {
    name: '作業中',
    desc: '担当者は割り当て済みです。',
    color: 'info',
    isWIP: true,
  },
  a011_COMPLETED: {
    name: '作業完了',
    desc: '管理者の方は、作業完了を確認してください。',
    color: 'success',
    isWIP: true,
    isDone: true,
  },
  a012_REVISION: {
    name: '修正依頼',
    desc: '担当者の方は、作業メモを参考に修正を行ってください。',
    color: 'warning',
    isWIP: true,
    isDone: true,
  },
  a100_CONFIRMED: {
    name: '作業完了を確認',
    desc: 'お疲れ様でした。',
    color: 'info',
    isDone: true,
  },
  a101_IGNORED: {
    name: 'やらなくていい',
    desc: '他の作業を優先してください。',
    color: 'info',
    isDone: true,
  },
};

export class Task extends BaseModel {
  public readonly launch: string = '';
  public readonly event: string = '';
  public readonly meetup: string = '';
  public readonly user: string = '';
  public readonly wiki: string = '';

  public readonly status: string = '';
  public readonly name: string = '';
  public readonly type: string = '';
  public readonly name_JP: string = '';
  public readonly description: string = '';

  public readonly warn: string = '';
  public readonly created: string = '';
  public readonly assigned: string = '';
  public readonly completed: string = '';
  public readonly confirmed: string = '';

  constructor(props: Fields<Task>) {
    super(props);
    Object.assign(this, props);
  }

  get_target_type() {
    const target: any = this;
    for (let key of ['launch', 'event', 'meetup']) {
      let _value = target[key] || '';
      if (_value != '') return key;
    }
  }
  isStatusDone() {
    return taskState[this.status].isDone;
  }
  isStatusWIP() {
    return taskState[this.status].isWIP;
  }
  statusDesc() {
    return taskState[this.status].desc;
  }
  statusColor() {
    return taskState[this.status].color;
  }
  statusName(isShort = false) {
    return taskState[this.status].name + (isShort ? '' : ` (${this.status})`);
  }
}
