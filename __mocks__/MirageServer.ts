import { Response, createServer } from 'miragejs';

interface Config {
  paymentStatus: number;
  paymentStatusErrorStatus?: number;
}

const createMirageServer = (config?: Config) => {
  const { paymentStatus = 1, paymentStatusErrorStatus } = config || {};
  const mirageServer = createServer({
    routes() {
      this.namespace = 'api';

      this.get('/payment-status', () => {
        if (paymentStatusErrorStatus) {
          return new Response(paymentStatusErrorStatus);
        }
        return {
          status: paymentStatus,
        };
      });
    },
  });

  return mirageServer;
};

export default createMirageServer;
