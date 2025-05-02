const input = document.getElementById("input-text");
const first = document.getElementById("first");
const withPlaceholderForBlankLines = document.getElementById(
  "withPlaceholderForBlankLines"
);
const noLineBreaks = document.getElementById("noLineBreaks");
const withBlankLinesRestored = document.getElementById(
  "withBlankLinesRestored"
);
const splitAtPeriod = document.getElementById("splitAtPeriod");
const splitAtComma = document.getElementById("splitAtComma");
const final = document.getElementById("final");

input.addEventListener("input", () => {
  first.value = input.value;  

  // 空行トークン生成
  const withPlaceholderForBlankLinesText = input.value.replace(
    /\n{2,}/g,
    "\n__空行__\n"
  );
  withPlaceholderForBlankLines.value = withPlaceholderForBlankLinesText;

  // 改行除去
  const noLineBreaksText = withPlaceholderForBlankLinesText
    .replace(/([\x00-\x7F])\n([\x00-\x7F])/g, "$1 $2")
    .replace(/([\x00-\x7F])\n([^\x00-\x7F])/g, "$1$2")
    .replace(/([^\x00-\x7F])\n([\x00-\x7F])/g, "$1$2")
    .replace(/([^\x00-\x7F])\n([^\x00-\x7F])/g, "$1$2");
  noLineBreaks.value = noLineBreaksText;

  const withBlankLinesRestoredText = noLineBreaksText.replace(
    /__空行__/g,
    "\n\n"
  );
  withBlankLinesRestored.value = withBlankLinesRestoredText;

  // ピリオド・句点で改行
  const splitAtPeriodText = noLineBreaksText
    .replace(/([^.。．\n]{32,})\. (?=[^0-9])/g, "$1.\n")
    //    .replace(/\. (?=[^0-9])/g, '.\n')
    .replace(/。/g, "。\n")
    .replace(/．/g, "．\n");

  splitAtPeriod.value = splitAtPeriodText;

  // カンマ・読点で改行＋タブ
  const splitAtCommaText = splitAtPeriodText
    .replace(/([^,、，\n]{32,}), (?=[^0-9])/g, "$1,\n\t")
    //    .replace(/, (?=[^0-9])/g, ',\n\t')
    .replace(/、/g, "、\n\t")
    .replace(/，/g, "，\n\t");

  splitAtComma.value = splitAtCommaText;

  final.value = splitAtComma.value;
});
