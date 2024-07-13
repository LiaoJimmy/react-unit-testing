import useSendSMSVerify from '@/hooks/useSendSMSVerify';
import { act, renderHook } from '@testing-library/react';
import createMirageServer from '../../__mocks__/MirageServer';
import { toast } from 'react-toastify';

describe('useSendSMSVerify()', () => {
  // Method 2. Mocked by jest.fn()
  it('should return send function and disabled state', async () => {
    createMirageServer({}, 'test');
    jest.mock('react-toastify');
    const mockSuccess = jest.fn();
    toast.success = mockSuccess;
    const { result } = renderHook(() => useSendSMSVerify('+8886954658745'));
    const { send } = result.current;

    await act(async () => {
      await send();
    });

    expect(mockSuccess).toBeCalledWith('send-sms-verify-success');
  });
});
