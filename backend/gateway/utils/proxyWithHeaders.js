import proxy from "express-http-proxy";

export const proxyWithHeaders = (targetUrl) => {
  return proxy(targetUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Add any necessary headers to the proxy request
      if(srcReq.user && srcReq.user.id) {
        proxyReqOpts.headers['x-user-id'] = srcReq.user.id;
      }
    //   return proxyReqOpts;
    }
  });
};