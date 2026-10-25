// Simulate the API's observed "no advertising plan" response.
function makeSeqno() {
  let seqno = "";
  for (let i = 0; i < 32; i += 1) {
    seqno += Math.floor(Math.random() * 10).toString();
  }
  return seqno;
}

const responseBody = {
  code: "1002",
  message: "暂无满足投放名单需求的投放计划",
  hint: "检查广告投放设置",
  seqno: makeSeqno(),
  data_node: "CN-South/HS5-1",
  time_cost: 0,
  payload: {
    user_id: "",
    push_id: "0",
    plan_id: "0",
    name: "",
    poster: "",
    content: "",
    link: "",
    duration: 0,
    show_type: "",
    space_name: "",
    provider_name: "",
    policy_id: "0",
    cajole_text: "",
    push_type: "",
    render_type: "",
    extra: {}
  }
};

$done({
  response: {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(responseBody)
  }
});
