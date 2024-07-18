import useSendSMSVerify, {
  useDISendSMSVerify,
} from '@/hooks/di/useSendSMSVerify';
import { act, renderHook } from '@testing-library/react';
import createMirageServer from '../../../__mocks__/MirageServer';
import { Server } from 'miragejs';

// Method 1. Dependency Injection
describe('useSendSMSVerify()', () => {
  it('should render hook correctly', () => {
    const { result } = renderHook(() => useSendSMSVerify('+8886954658745'));

    const { send, disabled } = result.current;

    expect(typeof send).toBe('function');
    expect(disabled).toBe(false);
  });

  describe('useDISendSMSVerify()', () => {
    let server: Server;

    const arrangeSendSMSVerify = (sendSMSVerifyStatus?: number) => {
      server = createMirageServer({ sendSMSVerifyStatus }, 'test');
      const mockToast = {
        success: jest.fn(),
        error: jest.fn(),
      };
      const { result } = renderHook(() =>
        useDISendSMSVerify('+8886954658745', mockToast)
      );
      const { send } = result.current;

      const actionSend = () =>
        act(async () => {
          await send();
        });

      return { result, actionSend, mockToast };
    };

    afterEach(() => {
      server.shutdown();
      jest.useRealTimers();
    });

    it('should send SMS and toast success message', async () => {
      const { actionSend, mockToast } = arrangeSendSMSVerify();

      await actionSend();

      expect(mockToast.success).toBeCalledWith('send-sms-verify-success');
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
      const { actionSend, mockToast } = arrangeSendSMSVerify(400);

      await actionSend();

      expect(mockToast.success).not.toBeCalled();
      expect(mockToast.error).toBeCalledWith('send-sms-verify-failed');
    });

    it('should send SMS failed and enable button', async () => {
      const { result, actionSend } = arrangeSendSMSVerify(400);

      await actionSend();

      const { disabled } = result.current;
      expect(disabled).toBe(true);
    });
  });
});
