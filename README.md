# Server-side Event (SSE) FE-BE node.js example

This project is to experiment and play around with SSE frontend-backend communication technology.

To run the project, all you have to do is:

```bash
# if you haven't done so
npm install -g yarn

yarn
# start the frontend
yarn start

# in another terminal
# start the server
yarn server

```

### Websocket vs SSE
- speed wise: the same, ref: Post [websocket-vs-sse](https://www.timeplus.com/post/websocket-vs-sse)
- browser reconnect: SSE. On the occasional events, such as the server restarts, the client (the browser) disconnect with the server, then the browser would try to recreate the connection automatically. As far as I know, in [my basic experiment](https://github.com/LD8/example-ws), the WebSocket doesn't do that.


### Notes

- Recommend to install [`Allow CORS`](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?gclid=Cj0KCQjw3JanBhCPARIsAJpXTx4lFZ994HKcmasrggpzXwyRLlbUGORHvbRzZnwwHroTJi1hI-1-uhgaApJgEALw_wcB) plugin on chrome, preventing any unexpected bahaviour of the react app
