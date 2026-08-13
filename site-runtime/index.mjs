const MIME_TYPES = {
  ".css": "text/css; charset=UTF-8",
  ".html": "text/html; charset=UTF-8",
  ".js": "text/javascript; charset=UTF-8",
  ".mjs": "text/javascript; charset=UTF-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function getContentType(pathname) {
  const extension = pathname.slice(pathname.lastIndexOf("."));
  return MIME_TYPES[extension] ?? "application/octet-stream";
}

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
      headers: {
        "content-type": "text/plain; charset=UTF-8",
        "x-content-type": getContentType(pathname),
      },
    });
  },
};

export default worker;
