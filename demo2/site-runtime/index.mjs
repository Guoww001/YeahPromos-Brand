const worker = {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
    const assetUrl = new URL(request.url);
    assetUrl.pathname = pathname;

    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (response.status !== 404) {
      return response;
    }

    return new Response("Not Found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=UTF-8" },
    });
  },
};

export default worker;
