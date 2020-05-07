import uuid from 'uuid/v4'
import moment from 'moment'

const timestamp = moment().unix()

export default {
  folders: [
    {
      id: uuid(),
      title: 'ビジネスメール',
      desc: 'ビジネスメール定型文 (https://sample.com)',
      created: timestamp,
      updated: timestamp,
      snippets: [
        {
          id: uuid(),
          title: '署名',
          desc: '署名の書き方',
          contents: `
-------------------------------------
株式会社〇〇
〇〇部△△課
氏名（氏名が読みにくい場合は読み仮名）
メールアドレス
郵便番号・住所（〒〇〇〇-〇〇〇〇 △△県〇〇区〇〇）
電話番号（TEL〇〇〇-〇〇〇〇-〇〇〇〇）
-------------------------------------
          `,
          ext: 'text',
          tags: ['サンプル', 'スニペット'],
          created: timestamp,
          updated: timestamp,
        },
        {
          id: uuid(),
          title: '挨拶',
          desc: '入り',
          contents: `
お世話になっております。
株式会社○○の△△でございます。
          `,
          ext: 'text',
          tags: ['サンプル', 'スニペット'],
          created: timestamp,
          updated: timestamp,
        },
      ],
    },
    {
      id: uuid(),
      title: 'HTML, CSS',
      desc: 'ウェブサイト作成',
      created: timestamp,
      updated: timestamp,
      snippets: [
        {
          id: uuid(),
          title: 'HTML基本',
          desc: 'HTMLの基本',
          contents: `
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
          `,
          ext: 'markup',
          tags: ['html', '基本'],
          created: timestamp,
          updated: timestamp,
        },
      ],
    },
  ],
  tags: {
    ビジネス: 2,
    基本: 2,
    HTML: 1,
  },
  exts: {
    text: 2,
    markup: 1,
  },
}
