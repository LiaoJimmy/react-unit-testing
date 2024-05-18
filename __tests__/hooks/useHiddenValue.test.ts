import useHiddenValue from '@/hooks/useHiddenValue';
import { renderHook, act } from '@testing-library/react';

describe('useHiddenValue', () => {
  it('should return origin value after calling display', () => {
    const originValue = 'Jimmy Liao';
    const { result } = renderHook(() => useHiddenValue(originValue));
    const [, display] = result.current;

    act(() => display());

    const [value] = result.current;
    expect(value).toBe(originValue);
  });

  it('should return hidden value after calling hide', () => {
    const originValue = 'Jimmy Liao';
    const { result } = renderHook(() => useHiddenValue(originValue));
    const [, display, hide] = result.current;
    act(() => display());

    act(() => hide());

    const [value] = result.current;
    expect(value).toBe('••••••••••');
  });

  it('should return hidden value after changing origin value', () => {
    let originValue = 'Jimmy Liao';
    const { result, rerender } = renderHook(() => useHiddenValue(originValue));
    const [, display] = result.current;
    act(() => display());

    originValue = 'Jimmy';
    rerender();

    const [value] = result.current;
    expect(value).toBe('•••••');
  });
});
