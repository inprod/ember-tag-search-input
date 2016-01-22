
export const KEYS = {
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  TAB: 9
};

export function stringStartsWith(valueString, checkString) {
  if (valueString && valueString.length > (checkString || '').length) {
    if (valueString.startsWith) {
      return valueString.startsWith(checkString);
    } else {
      return valueString.indexOf(checkString) > -1;
    }
  }
}

export function setCursor(node, pos) {
  if (node) {
    if (node.createTextRange) {
      var textRange = node.createTextRange();
      textRange.collapse(true);
      textRange.moveEnd(pos);
      textRange.moveStart(pos);
      textRange.select();
      return true;
    } else if (node.setSelectionRange) {
      node.setSelectionRange(pos,pos);
      return true;
    }
  }
  return false;
}
