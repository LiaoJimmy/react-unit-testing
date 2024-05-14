import { useState } from 'react';

const useHiddenValue = (
  originValue: string,
  defaultHidden = true
): [value: string, display: () => void, hide: () => void] => {
  const hiddenValue = originValue
    .split('')
    .map(() => '•')
    .join('');
  const [isHidden, setIsHidden] = useState(defaultHidden);

  const value = isHidden ? hiddenValue : originValue;

  const display = () => {
    setIsHidden(false);
  };

  const hide = () => {
    setIsHidden(true);
  };

  return [value, display, hide];
};

export default useHiddenValue;
