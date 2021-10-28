/*
 * SOURCE: https://github.com/tagZero/use-text-width
 * npm:    https://www.npmjs.com/package/@imagemarker/use-text-width
*/

import { RefObject, useMemo } from 'react';

const getContext = () => {
  const fragment = document.createDocumentFragment();
  const canvas = document.createElement('canvas');
  fragment.appendChild(canvas);
  return canvas.getContext('2d');
};

const getTextWidth = (currentText, font) => {
  const context = getContext();
  context.font = font;

  if (Array.isArray(currentText)) {
    return Math.max(...currentText.map((t) => context.measureText(t).width));
  } else {
    const metrics = context.measureText(currentText);
    return metrics.width;
  }
};

export const useTextWidth = (options) => {
  const textOptions = useMemo(() => ('text' in options ? options : undefined), [options]);
  const refOptions = useMemo(() => ('ref' in options ? options : undefined), [options]);

  return useMemo(() => {
    if (refOptions?.ref.current?.textContent) {
      const context = getContext();
      const computedStyles = window.getComputedStyle(refOptions.ref.current);
      context.font = computedStyles.font;
      const metrics = context.measureText(refOptions.ref.current.textContent);

      return metrics.width;
    } else if (textOptions?.text) {
      return getTextWidth(textOptions.text, textOptions.font ?? '16px times');
    }

    return NaN;
  }, [textOptions?.text, textOptions?.font, refOptions?.ref]);
};
