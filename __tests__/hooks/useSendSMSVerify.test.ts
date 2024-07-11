import useSendSMSVerify from '@/hooks/useSendSMSVerify';
import { act, renderHook } from '@testing-library/react';
import createMirageServer from '../../__mocks__/MirageServer';
import { toast } from 'react-toastify';

describe('useSendSMSVerify()', () => {
  // Method 2. Mocked by jest.fn()
  it('should return send function and disabled state', async () => {
    createMirageServer({}, 'test');
    jest.mock('react-toastify');
    const { result } = renderHook(() => useSendSMSVerify('+8886954658745'));
    const { send } = result.current;
    const mockSuccess = jest.fn();
    toast.success = mockSuccess;
    expect(mockSuccess).not.toBeCalled();

    await act(async () => {
      await send();
    });

    const { disabled } = result.current;
    expect(disabled).toBe(true);
    expect(mockSuccess).toBeCalledWith('send-sms-verify-success');
  });
});
