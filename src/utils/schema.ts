import * as Yup from 'yup';

export const requiredString = (name: string) => {
  return Yup.string().required(`${name}を入力してください`);
};

//文字数制限
function getLen(str: string) {
  let result = 0;
  for (var i = 0; i < str.length; i++) {
    let chr = str.charCodeAt(i);
    if (
      (chr >= 0x00 && chr < 0x81) ||
      chr === 0xf8f0 ||
      (chr >= 0xff61 && chr < 0xffa0) ||
      (chr >= 0xf8f1 && chr < 0xf8f4)
    ) {
      result += 1;
    } else {
      //それ以外の文字の場合は2を加算
      result += 2;
    }
  }
  //結果を返す
  return result;
}

export const limitedString = (name: string, length: number) => {
  return requiredString(name).test(
    'limit-length',
    `文字数制限: 全角${length * 2}字/半角${length}字`,
    (value: any) => {
      if (getLen(value) > length) {
        return false;
      } else {
        return true;
      }
    }
  );
};

export const password = requiredString('パスワード')
  .min(8, '8文字以上のパスワードを入力して下さい')
  .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/, {
    message: '半角大文字・小文字・数字を含むパスワードを入力してください',
  });
