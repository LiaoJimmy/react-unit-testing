import { useDISendSMSVerify } from '@/hooks/di/useSendSMSVerify';
import { act, renderHook } from '@testing-library/react';
import createMirageServer from '../../../__mocks__/MirageServer';

describe('useSendSMSVerify()', () => {
  // Method 1. Dependency Injection
  it('should return send function and disabled state', async () => {
    createMirageServer({}, 'test');
    const mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };
    const { result } = renderHook(() =>
      useDISendSMSVerify('+8886954658745', mockToast)
    );
    const { send } = result.current;
    expect(mockToast.success).not.toBeCalled();

    await act(async () => {
      await send();
    });

    const { disabled } = result.current;
    expect(disabled).toBe(true);
    expect(mockToast.success).toBeCalledWith('send-sms-verify-success');
  });
});
