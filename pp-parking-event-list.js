// Clear only payload.row in the successful event-list JSON response.
try {
  const responseBody = JSON.parse($response.body);
  const rows = responseBody &&
    responseBody.payload &&
    responseBody.payload.row;

  if (Array.isArray(rows)) {
    responseBody.payload.row = [];

    const headers = {};
    const originalHeaders = $response.headers || {};
    Object.keys(originalHeaders).forEach((name) => {
      if (name.toLowerCase() !== "content-length") {
        headers[name] = originalHeaders[name];
      }
    });

    console.log("[PP 停车去广告] bonus/user/event/list: payload.row 已清空");
    $done({
      status: $response.status,
      headers: headers,
      body: JSON.stringify(responseBody)
    });
  } else {
    // Leave unexpected response shapes untouched.
    $done({});
  }
} catch (error) {
  // Keep the original response if the body is not valid JSON.
  console.log("[PP 停车去广告] event-list JSON 解析失败，保留原响应");
  $done({});
}
