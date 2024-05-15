import { useEffect, useState } from 'react';

const useHiddenValue = (
  originValue: string
): [value: string, display: () => void, hide: () => void] => {
  const hiddenValue = originValue
    .split('')
    .map(() => '•')
    .join('');
  const [isHidden, setIsHidden] = useState(false);

  const value = isHidden ? hiddenValue : originValue;

  const display = () => {
    setIsHidden(false);
  };

  const hide = () => {
    setIsHidden(true);
  };

  useEffect(() => {
    setIsHidden(true);
  }, [originValue]);

  return [value, display, hide];
};

export default useHiddenValue;
