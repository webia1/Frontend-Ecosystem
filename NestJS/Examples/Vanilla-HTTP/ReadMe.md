# Vanilla HTTP Examples

## Vanilla HTTP GET Request

```typescript

import * as https from 'https';

// Controller class method
someHttpGetCall(): any {
  try {
    const auth = 'Basic ' + Buffer.from('user_name' + ':' + 'password').toString('base64');
    const agent = new https.Agent({
      /**
       * NOTE: this will disable client verification
       * Use this only for testing purposes if you get
       * 'unable to verify the first certificate' error
       */
      rejectUnauthorized: false,
    });
    const options = {
      hostname: 'without-http-s-and-without-port-only-domain',
      port: 3333, // change this to your port
      path: '/your/gateway/path',
      method: 'GET',
      headers: {
        Authorization: auth
      },
      agent: agent,
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(data); // Process the data as needed
      });
      res.on('error', (error) => {
        console.error(error);
        return error;
      });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}

```
