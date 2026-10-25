---
name: loon-adblock-plugin
description: Analyze captured mobile app traffic and create or troubleshoot Loon ad-blocking plugins using request or response scripts, local mock responses, and MitM rules. Use when building, updating, diagnosing, or publishing a Loon plugin that removes advertisements or promotional placements from an app.
---

# Build a Loon ad-blocking plugin

## Workflow

1. **Inspect the source material.** Review supplied HAR/ZIP captures, request and response headers, bodies, and any existing plugin or repository files. Locate ad-fetch APIs, ad configuration responses, media requests, and promotional-list endpoints. Map each candidate to its host, path, method, query pattern, status, content type, and response shape.
2. **Separate ads from core behavior.** Confirm that a candidate is ad or promotion data. Keep authentication, payment, parking/charging actions, account state, entitlements, and unrelated business data intact. Prefer the narrowest endpoint and payload field that removes the requested placement.
3. **Choose the interception phase deliberately.**
   - Use a **request script mock** when the complete replacement response is known and the app can safely consume a static success response. It runs before the upstream request; `$done({response:{status,headers,body}})` returns the mock locally and skips the server request.
   - Use a **response script** when fields other than the target must remain current or cannot be reconstructed safely. Parse the server JSON, change only the requested ad field, preserve the rest of the body and response metadata, and fall back to the original response if parsing or shape checks fail.
   - Use a request rewrite or host block only when the app handles a missing response correctly. Avoid returning fabricated business errors unless captures show that exact response is accepted as a no-ad result.
4. **Build the smallest valid mock or edit.** Base JSON structure and success codes on captured responses. For a local mock, provide a valid status and `Content-Type`; do not copy authorization, cookies, device identifiers, or other secrets into the returned payload. If the user asks to empty a field such as `payload.row`, change only that field. Explain that other values in a request mock are fixed sample values and cannot stay server-current because there is no upstream request.
5. **Write the plugin rule.** Add a narrowly scoped method + URL condition under `[Script]`, point to the raw GitHub script URL, and use a clear tag and suitable timeout. Keep regex escaping consistent with Loon syntax. Add every intercepted HTTPS hostname to `[Mitm]`; HTTPS request interception requires Loon MitM certificate installation/trust and HTTPS decryption for those hosts.
6. **Update documentation and repository files.** Describe which APIs are mocked or rewritten, what data is changed, any fixed mock metadata, and the MitM requirement. Keep script names and raw URLs consistent. When asked to publish, update the user's repository using the available GitHub integration, with a concise commit message.
7. **Validate before reporting.** Check the plugin syntax, endpoint/method/host match, JSON validity, script completion path, and absence of copied credentials. Confirm the published files by fetching them back from the repository. Do not claim runtime validation in Loon unless it was actually performed.

## Troubleshoot when ads still appear

- Confirm the plugin is enabled and refreshed from its current URL.
- Check Loon logs for the rule tag. No match usually points to a different host, path, method, redirect, or query pattern.
- Confirm the hostname is in `[Mitm]`, the certificate is trusted, and HTTPS decryption is enabled.
- Look for cached content, another ad endpoint, image/video delivery, or promotional data embedded in a broader configuration response. Add rules only after identifying them in a capture.
- Ask for a fresh sanitized request/response capture when evidence is incomplete. Remove bearer tokens, cookies, user IDs, license plates, and device identifiers before sharing or committing captures.

## Response-script safeguards

- Verify every expected JSON object/array before changing it.
- Preserve all unrelated keys and values; omit or recalculate `Content-Length` when the body changes.
- On an unknown response shape or parse failure, pass the original response through unchanged.
- Keep logs generic; never log full URLs with sensitive query values or request headers.

## Request-mock safeguards

- Use a request rule for early interception and return a complete response object from the script.
- Match the response envelope the app expects, including its success code and nested object types.
- Do not promise that live metadata is preserved by a static mock. Reuse captured non-ad fields only when appropriate, and document that counts, sequence numbers, server node names, or timestamps may be stale.
- Keep the URL condition as specific as possible so unrelated API calls continue upstream.

## Example: return an empty list locally

For a captured successful JSON response with `payload.row`:

```js
const mock = {
  code: "1001",
  payload: {
    paging_header: { page_index: 1, page_size: 50 },
    row: []
  }
};

$done({
  response: {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(mock)
  }
});
```

Copy the actual required envelope and paging fields from a sanitized capture; the example is illustrative, not a universal API schema.
