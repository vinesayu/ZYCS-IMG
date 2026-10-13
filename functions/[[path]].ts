export const onRequest: PagesFunction = async (context) => {
  const user = context.env.BASIC_USER || "admin";
  const pass = context.env.BASIC_PASS;

  if (!pass) {
    return context.next();
  }

  const auth = context.request.headers.get("Authorization");

  if (!auth || !auth.startsWith("Basic ")) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="ZYCS-IMG"',
      },
    });
  }

  const base64 = auth.split(" ")[1];
  const decoded = atob(base64);
  const [u, p] = decoded.split(":");

  if (u !== user || p !== pass) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="ZYCS-IMG"',
      },
    });
  }

  return context.next();
};
