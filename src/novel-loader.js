// src/novel-loader.js
// URLからスラッグを取得し、対応するMarkdownを読み込み・HTML化する
// Markdown先頭の見出し(#...)を<title>に反映（作品名 - 著者 形式）

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("novel-container");

  // URLをslugに変換(例:/novels/remon/→remon)
  const m = location.pathname.match(/\/novels\/([^\/]+)/);
  const slug = (m && m[1]) || document.body.dataset.slug;

  if (!slug) {
    container.innerHTML =
      '<p style="color:red;">作品スラッグを特定できませんでした。</p>';
    return;
  }

  try {
    const mdUrl = new URL(`/assets/texts/${slug}.md`, document.baseURI).href;
    const res = await fetch(mdUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();

    // title用にmdファイルの1行目を抽出
    const firstHeadingMatch = md.match(/^#\s+(.+)/m);
    if (firstHeadingMatch) {
      const headingFull = firstHeadingMatch[1].trim();
      document.title = `${headingFull} - 青空文庫デモ`;
    }

    // 本文描画
    container.innerHTML = simpleMdToHtml(md);
  } catch (e) {
    console.error(e);
    container.innerHTML =
      '<p style="color:red;">本文を読み込めませんでした。</p>';
  }
});
