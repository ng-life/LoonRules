// Return a local success response before the request reaches the upstream server.
// Based on the captured event-list response; only payload.row is emptied.
const mockResponse = {
  code: "1001",
  seqno: "8dd9012baaf8211bde7751e202a769f1",
  data_node: "CN-South/HS3-2",
  time_cost: 18,
  payload: {
    paging_header: {
      total_count: 1853,
      page_index: 1,
      page_size: 50,
      page_count: 38,
      paging_timestamp: "1970-01-01T00:00:00Z"
    },
    row: []
  }
};

console.log("[PP 停车去广告] bonus/user/event/list: 已本地模拟空 row 响应");
$done({
  response: {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(mockResponse)
  }
});
