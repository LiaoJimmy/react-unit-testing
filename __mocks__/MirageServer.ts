import { createServer } from 'miragejs';

interface Config {
  paymentStatus?: 1 | 0;
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

      this.get('/payment-methods/pre-pay', () => {
        return [
          {
            id: 1,
            name: 'Credit Card',
          },
          {
            id: 2,
            name: 'Line Pay',
          },
          {
            id: 3,
            name: 'Jkopay',
          },
          {
            id: 4,
            name: 'Apple Pay',
          },
        ];
      });
      this.get('/payment-methods/post-pay', () => {
        return [
          {
            id: 1,
            name: 'Credit Card',
          },
          {
            id: 2,
            name: 'Line Pay',
          },
          {
            id: 3,
            name: 'Jkopay',
          },
          {
            id: 4,
            name: 'Apple Pay',
          },
          {
            id: 5,
            name: 'ATM',
          },
          {
            id: 6,
            name: 'Convenience Store',
          },
        ];
      });
    },
    timing: 1000,
  });

  return mirageServer;
};

export default createMirageServer;
