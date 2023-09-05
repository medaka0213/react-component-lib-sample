module.exports = {
  // Jest がテストとして認識するファイルのパターンを指定します
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(jsx?|tsx?)$',

  // モジュールファイル拡張子のリスト
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // ts-jest トランスフォーマーを使用して TypeScript ファイルをトランスパイルします。
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // この設定は、Node.js 環境での実行を前提としています。
  testEnvironment: 'node',
};
