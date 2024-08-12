import useSendSMSVerify from '@/hooks/useSendSMSVerify';
import { act, renderHook } from '@testing-library/react';
import { toast } from 'react-toastify';
import { verify } from '@/api/SMS';
// import * as SMS from '@/api/SMS';

jest.mock('@/api/SMS', () => ({
  verify: jest.fn(),
}));
// jest.mock('@/api/SMS', () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

describe('useSendSMSVerify()', () => {
  const stubVerifyResolved = () => (verify as jest.Mock).mockResolvedValue({});
  // const stubVerifyResolved = () =>
  //   (SMS.default as jest.Mock).mockResolvedValue({});

  const stubVerifyRejected = () => (verify as jest.Mock).mockRejectedValue({});
  // const stubVerifyRejected = () =>
  //   (SMS.default as jest.Mock).mockRejectedValue({});

  const arrangeSendSMSVerify = () => {
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
  });

  it('should send SMS and toast success message', async () => {
    stubVerifyResolved();
    const { actionSend } = arrangeSendSMSVerify();
    const mockSuccess = jest.spyOn(toast, 'success');
    const mockError = jest.spyOn(toast, 'error');

    await actionSend();

    expect(mockSuccess).toBeCalledWith('send-sms-verify-success');
    expect(mockError).not.toBeCalled();
  });

  it('should send SMS, passing 60 seconds and button is enabled', async () => {
    stubVerifyResolved();
    jest.useFakeTimers({ advanceTimers: true });
    const { result, actionSend } = arrangeSendSMSVerify();
    await actionSend();

    act(() => {
      jest.advanceTimersByTime(60 * 1000);
    });

    const { disabled } = result.current;
    expect(disabled).toBe(false);
  });

  it('should send SMS and disable button', async () => {
    stubVerifyResolved();
    const { result, actionSend } = arrangeSendSMSVerify();

    await actionSend();

    const { disabled } = result.current;
    expect(disabled).toBe(true);
  });

  it('should send SMS failed and toast error message', async () => {
    stubVerifyRejected();
    const { actionSend } = arrangeSendSMSVerify();
    const mockSuccess = jest.spyOn(toast, 'success');
    const mockError = jest.spyOn(toast, 'error');

    await actionSend();

    expect(mockSuccess).not.toBeCalled();
    expect(mockError).toBeCalledWith('send-sms-verify-failed');
  });

  it('should send SMS failed and enable button', async () => {
    stubVerifyRejected();
    const { result, actionSend } = arrangeSendSMSVerify();

    await actionSend();

    const { disabled } = result.current;
    expect(disabled).toBe(false);
  });
});
