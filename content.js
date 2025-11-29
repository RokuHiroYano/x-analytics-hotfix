const GRID_XPATH =
  "/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[2]/div/section/div[3]/div";

function findGridByXPath() {
  const result = document.evaluate(
    GRID_XPATH,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue;
}

function applyGridFix() {
  const grid = findGridByXPath();
  if (!grid) return false;

  grid.style.gridTemplateColumns = "repeat(7, minmax(0, 1fr)) auto";
  grid.style.gridTemplateRows = "repeat(24, minmax(0, 1fr)) auto";

  // デバッグ用
  console.log("[Xアナリティクス暫定修正] グリッドを修正しました。", grid);
  return true;
}
