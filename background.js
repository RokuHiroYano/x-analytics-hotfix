// 拡張機能ボタンがクリックされたとき
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  // 対象URLでない場合は何もしない（必要ならここで遷移させてもよい）
  const targetPrefix = 'https://x.com/i/account_analytics/audience';
  if (!tab.url || !tab.url.startsWith(targetPrefix)) {
    console.warn('[Xアナリティクス暫定修正] 対象URLではありません:', tab.url);
    return;
  }

  // 1. content.js を注入（applyGridFix 定義だけ読み込む）
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });

  // 2. そのあとで applyGridFix() を呼ぶ
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      if (typeof applyGridFix === 'function') {
        const ok = applyGridFix();
        console.log('[Xアナリティクス暫定修正] 実行結果:', ok);
      } else {
        console.warn('[Xアナリティクス暫定修正] applyGridFix が見つかりません。');
      }
    }
  });
});
