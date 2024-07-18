import useSendSMSVerify from '@/hooks/useSendSMSVerify';
import { act, renderHook } from '@testing-library/react';
import createMirageServer from '../../__mocks__/MirageServer';
import { toast } from 'react-toastify';
import { Server } from 'miragejs';

// Method 2. Mocked by jest.fn()
describe('useSendSMSVerify()', () => {
  let server: Server;

  const arrangeSendSMSVerify = (sendSMSVerifyStatus?: number) => {
    server = createMirageServer({ sendSMSVerifyStatus }, 'test');
    const { result } = renderHook(() => useSendSMSVerify('+8886954658745'));
    const { send } = result.current;

    const actionSend = () =>
      act(async () => {
        await send();
      });

    return { result, actionSend };
  };

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    server.shutdown();
  });

  it('should send SMS and toast success message', async () => {
    const { actionSend } = arrangeSendSMSVerify();
    const mockSuccess = jest.spyOn(toast, 'success');
    const mockError = jest.spyOn(toast, 'error');

    await actionSend();

    expect(mockSuccess).toBeCalledWith('send-sms-verify-success');
    expect(mockError).not.toBeCalled();
  });

  it('should send SMS, passing 60 seconds and button is enabled', async () => {
    jest.useFakeTimers({ advanceTimers: true });
    const { result, actionSend } = arrangeSendSMSVerify();
    await actionSend();

    await act(async () => {
      await jest.advanceTimersByTimeAsync(60 * 1000);
    });

    const { disabled } = result.current;
    expect(disabled).toBe(false);
  });

  it('should send SMS and disable button', async () => {
    const { result, actionSend } = arrangeSendSMSVerify();

    await actionSend();

    const { disabled } = result.current;
    expect(disabled).toBe(true);
  });

  it('should send SMS failed and toast error message', async () => {
    const { actionSend } = arrangeSendSMSVerify(400);
    const mockSuccess = jest.spyOn(toast, 'success');
    const mockError = jest.spyOn(toast, 'error');

    await actionSend();

    expect(mockSuccess).not.toBeCalled();
    expect(mockError).toBeCalledWith('send-sms-verify-failed');
  });

  it('should send SMS failed and enable button', async () => {
    const { result, actionSend } = arrangeSendSMSVerify(400);

    await actionSend();

    const { disabled } = result.current;
    expect(disabled).toBe(false);
  });
});
