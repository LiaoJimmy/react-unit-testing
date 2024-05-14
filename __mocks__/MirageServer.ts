import { createServer } from 'miragejs';

interface Config {
  paymentStatus?: number;
}

const createMirageServer = (config?: Config) => {
  const { paymentStatus = 1 } = config || {};
  const mirageServer = createServer({
    routes() {
      this.namespace = 'api';

      this.get('/payment-status', () => {
        return {
          status: paymentStatus,
        };
      });
    },
  });

  return mirageServer;
};

export default createMirageServer;
