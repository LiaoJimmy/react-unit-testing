import useSendSMSVerify from '@/hooks/useSendSMSVerify';
import { act, renderHook } from '@testing-library/react';
import createMirageServer from '../../__mocks__/MirageServer';
import { toast } from 'react-toastify';
import { Server } from 'miragejs';

// Method 2. Mocked by jest.fn()
describe('useSendSMSVerify()', () => {
  let server: Server;

  const arrangeSendSMSVerify = () => {
    server = createMirageServer({}, 'test');
    const { result } = renderHook(() => useSendSMSVerify('+8886954658745'));
    return result;
  };

  afterEach(() => {
    jest.restoreAllMocks();
    server.shutdown();
  });

  it('should return send function and toast success message', async () => {
    const result = arrangeSendSMSVerify();
    const mockSuccess = jest.spyOn(toast, 'success');
    const mockError = jest.spyOn(toast, 'error');
    const { send } = result.current;

    await act(async () => {
      await send();
    });

    expect(mockSuccess).toBeCalledWith('send-sms-verify-success');
    expect(mockError).not.toBeCalled();
  });

  it('should return send function and disabled state', async () => {
    const result = arrangeSendSMSVerify();
    const { send } = result.current;

    await act(async () => {
      await send();
    });

    const { disabled } = result.current;
    expect(disabled).toBe(true);
  });
});
