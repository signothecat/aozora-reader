// src/md-to-html.js
// 見出し(#〜####)→h1〜h4、それ以外は全部<p>

function simpleMdToHtml(mdText) {
  return mdText
    .replace(/\r\n?/g, "\n") // 改行コード統一
    .split("\n") // 1行ごとに分割
    .map((line) => {
      // 見出しの処理
      if (/^#{5,}\s+/.test(line)) {
        return `<h4>${line.replace(/^#{5,}\s+/, "")}</h4>`;
      }
      if (/^####\s+/.test(line)) {
        return `<h4>${line.replace(/^####\s+/, "")}</h4>`;
      }
      if (/^###\s+/.test(line)) {
        return `<h3>${line.replace(/^###\s+/, "")}</h3>`;
      }
      if (/^##\s+/.test(line)) {
        return `<h2>${line.replace(/^##\s+/, "")}</h2>`;
      }
      if (/^#\s+/.test(line)) {
        return `<h1>${line.replace(/^#\s+/, "")}</h1>`;
      }
      // 見出し以外の処理
      return `<p>${line}</p>`;
    })
    .join("\n");
}
