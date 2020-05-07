import moment from 'moment'
import uuid from 'uuid/v4'

export const path = {
  // auth
  auth: '/u',
  login: '/u/login',
  signup: '/u/signup',
  profile: '/u/profile',
  resetPassword: '/u/reset-password',
  confirmEmail: '/u/confirm-email',

  // landing page
  landingPage: '/landing-page',

  // home
  home: '/home',
}

export const extOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Markup', value: 'markup' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
  { label: 'SQL', value: 'Sql' },
  { label: 'C-like', value: 'c' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Java', value: 'java' },
  { label: 'Dart', value: 'dart' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'JSON', value: 'json' },
  { label: 'Perl', value: 'perl' },
  { label: 'Rust', value: 'rust' },
  { label: 'Scala', value: 'scala' },
]

export const data = () => {
  const timestamp = moment().unix()

  // snippet
  const snippet = {
    id: uuid(),
    title: 'Welcome',
    desc: '簡単な操作方法の説明',
    contents: `
コピペっとへようこそ！

🐤 ＋ボタンより、スニペットを追加してみましょう。
🐤 追加したスニペットは、三点ドットメニューより、編集、削除できます。
🐤 スニペットはタグ、フォルダ、拡張子により、自動で分類されます。
🐤 右上の検索インプットより、スニペットをキーワード検索できます。
    `,
    ext: 'text',
    tags: ['サンプル', 'スニペット'],
    created: timestamp,
    updated: timestamp,
  }

  // folder
  const folder = {
    id: uuid(),
    title: 'ようこそ！',
    desc:
      'コピペっとはスニペット管理ツールです。普段使いまわしている定型文、ソースコードを追加・管理することで、作業の効率化を手助けします。',
    created: timestamp,
    updated: timestamp,
    snippets: [snippet],
  }

  // tags
  const tags = {
    サンプル: 1,
    スニペット: 1,
  }

  // extensions
  const exts = {
    text: 1,
  }

  return {
    folders: [folder],
    tags,
    exts,
  }
}
