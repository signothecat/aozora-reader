# aozora-reader

HTML・CSS・JavaScript で制作した青空文庫のリーダー

## Demo

[https://aozora-reader-phi.vercel.app/](https://aozora-reader-phi.vercel.app/)

## Feature

- トップページの小説タイトルをクリックすると各作品ページに移動
- assets/texts/内にある`<作品名>.md`ファイルを`md-to-html.js`で parse し、`novel-loader.js`で取得して表示

## Note

- 現状『こころ』『人間失格』『檸檬』の 3 作品のみ
