/* =====================================================
   BASE API SERVICE
===================================================== */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =====================================================
   BUILD URL
===================================================== */

function buildUrl(path, params = {}) {
  const url = new URL(
    `${API_BASE}${path}`
  );

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        url.searchParams.append(
          key,
          value
        );
      }
    }
  );

  return url.toString();
}

/* =====================================================
   REQUEST
===================================================== */

async function request(
  path,
  {
    method = "GET",
    params = {},
    body = null,
    headers = {},
  } = {}
) {
  const response = await fetch(
    buildUrl(path, params),
    {
      method,

      headers: {
        "Content-Type":
          "application/json",

        ...headers,
      },

      body: body
        ? JSON.stringify(body)
        : null,
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        `Request failed (${response.status})`
    );
  }

  return data;
}

/* =====================================================
   HTTP METHODS
===================================================== */

export function get(
  path,
  params = {}
) {
  return request(path, {
    method: "GET",
    params,
  });
}

export function post(
  path,
  body = {}
) {
  return request(path, {
    method: "POST",
    body,
  });
}

export function put(
  path,
  body = {}
) {
  return request(path, {
    method: "PUT",
    body,
  });
}

export function patch(
  path,
  body = {}
) {
  return request(path, {
    method: "PATCH",
    body,
  });
}

export function del(path) {
  return request(path, {
    method: "DELETE",
  });
}

/* =====================================================
   EXPORT
===================================================== */

const api = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default api;