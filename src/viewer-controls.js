// /src/viewer-controls.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleDirectionBtn = document.getElementById("toggleDirection");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const novel = document.getElementById("novelContainer");
  const range = document.getElementById("paddingControl");
  const valueEl = document.getElementById("paddingValue");
  const root = document.documentElement;

  // 初期テーマをブラウザのpreferenceに合わせる
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }

  function updateValue(v) {
    valueEl.textContent = `${v}%`;
    range.setAttribute("aria-valuenow", String(v));
    range.setAttribute("aria-valuetext", `${v}%`);
  }

  // 余白コントローラーの動作
  function applyMargin() {
    const v = Number(range.value); // e.g. 35 -> 35%
    if (novel.classList.contains("vertical")) {
      // 縦書きの場合は上下だけ変更
      novel.style.paddingTop = v + "%";
      novel.style.paddingBottom = v + "%";
      novel.style.paddingLeft = "";
      novel.style.paddingRight = "";
    } else {
      // 横書きの場合は左右だけ変更
      novel.style.paddingLeft = v + "%";
      novel.style.paddingRight = v + "%";
      novel.style.paddingTop = "";
      novel.style.paddingBottom = "";
    }
    updateValue(v);
  }

  // テーマトグルボタンの動作
  toggleThemeBtn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme"); // デフォルトに戻す
    } else {
      root.setAttribute("data-theme", "dark");
    }
  });

  // 縦書きトグルボタンの動作
  toggleDirectionBtn.addEventListener("click", () => {
    const vertical = novel.classList.toggle("vertical");
    toggleDirectionBtn.setAttribute("aria-pressed", String(vertical));
    toggleDirectionBtn.textContent = vertical ? "縦書き：オン" : "縦書き：オフ";
    applyMargin(); //マージン再適用
  });

  range.addEventListener("input", applyMargin);

  // 初期化
  applyMargin();
});
