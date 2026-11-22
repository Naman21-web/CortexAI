import proxy from "express-http-proxy";

export const proxyWithHeaders = (targetUrl) => {
  return proxy(targetUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Add any necessary headers to the proxy request
      console.log("srcReq: ",srcReq);
      if(srcReq.user && srcReq.user.userId) {
        proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
      }
      if(srcReq.cookies && srcReq.cookies.session) {
        proxyReqOpts.headers['x-session-id'] = srcReq.cookies.session;
      }
      console.log("proxyReqOpts: ",proxyReqOpts);
      return proxyReqOpts;
    }
  });
};