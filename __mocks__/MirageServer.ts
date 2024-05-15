import { createServer } from 'miragejs';

interface Config {
  paymentStatus?: number;
}

const createMirageServer = (config?: Config, environment = 'test') => {
  const { paymentStatus = 1 } = config || {};
  const mirageServer = createServer({
    environment,
    routes() {
      this.namespace = 'api';

      this.get('/payment-status', () => {
        return {
          status: paymentStatus,
        };
      });
    },
    timing: 1000,
  });

  return mirageServer;
};

export default createMirageServer;
