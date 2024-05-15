import useHiddenValue from '@/hooks/useHiddenValue';
import { renderHook, act } from '@testing-library/react';

describe('useHiddenValue', () => {
  describe('hide by default', () => {
    it('should return hidden value', () => {
      const originValue = 'Jimmy Liao';

      const { result } = renderHook(() => useHiddenValue(originValue));

      const [value] = result.current;
      expect(value).toBe('••••••••••');
    });

    it('should return origin value after calling display', () => {
      const originValue = 'Jimmy Liao';
      const { result } = renderHook(() => useHiddenValue(originValue));
      const [, display] = result.current;

      act(() => {
        display();
      });

      const [value] = result.current;
      expect(value).toBe(originValue);
    });

    it('should return hidden value after calling hide', () => {
      const originValue = 'Jimmy Liao';
      const { result } = renderHook(() => useHiddenValue(originValue));
      const [, display, hide] = result.current;
      act(() => {
        display();
      });

      act(() => {
        hide();
      });

      const [value] = result.current;
      expect(value).toBe('••••••••••');
    });
  });

  describe('display by default', () => {
    it('should return origin value', () => {
      const originValue = 'Jimmy Liao';

      const { result } = renderHook(() => useHiddenValue(originValue, false));

      const [value] = result.current;
      expect(value).toBe(originValue);
    });

    it('should return hidden value after calling hide', () => {
      const originValue = 'Jimmy Liao';
      const { result } = renderHook(() => useHiddenValue(originValue, false));
      const [, , hide] = result.current;

      act(() => {
        hide();
      });

      const [value] = result.current;
      expect(value).toBe('••••••••••');
    });

    it('should return origin value after calling display', () => {
      const originValue = 'Jimmy Liao';
      const { result } = renderHook(() => useHiddenValue(originValue, false));
      const [, display, hide] = result.current;
      act(() => {
        hide();
      });

      act(() => {
        display();
      });

      const [value] = result.current;
      expect(value).toBe(originValue);
    });
  });
});
