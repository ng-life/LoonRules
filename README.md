# LoonRules

按策略拆分的 Loon 远程规则。每个文件名为「策略名.list」，文件内不包含策略字段，由订阅配置的 `policy` 参数指定。

## 使用

在 Loon 配置的 `[Remote Rule]` 段添加以下内容。自定义策略需要提前创建；`RejectDict` 保留原名，需要自行绑定有效策略。

```ini
[Remote Rule]
https://raw.githubusercontent.com/ng-life/LoonRules/main/Home.list, policy=Home, tag=Home, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/YJP.list, policy=YJP, tag=YJP, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/RejectDict.list, policy=RejectDict, tag=RejectDict, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/AI.list, policy=AI, tag=AI, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/DIRECT.list, policy=DIRECT, tag=DIRECT, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/Proxy.list, policy=Proxy, tag=Proxy, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/Google.list, policy=Google, tag=Google, enabled=true
```

## 整理说明

- 修复 Gemini 部分的规则粘连，保留原文 `gemini.google`；拆出 `alkalicore-pa.clients6.google.com`，移除策略后的说明文字。
- 同一策略内重复的规则仅保留一条，包括三个 Gemini 后端域名和 `anthropic` 关键字。
- Claude 的 Fathom 域名无法可靠还原，原文保存在 `AI.list` 注释中，暂不启用；可确认的 `anthropic` 关键字已保留。
- 按要求移除 `DOMAIN-SUFFIX,v2ex.com,Available`，`v2ex.com` 仅保留在 `Proxy.list`。
- `AI.list` 应放在 `Google.list` 前，以便 Google AI 服务使用 AI 策略。拆分后无法完整复现原文穿插的规则顺序，应结合现有本地规则和订阅顺序检查实际命中。
- 保留原文中的 `197.168.*` 网段、`dot.com`、`io` 和 `org` 后缀，没有推测或扩大规则范围。
- 已检查文件命名、规则字段、CIDR 和重复项；尚未在 Loon 客户端验证实际命中。

参考：[Loon 规则文档](https://nsloon.app/docs/category/%E8%A7%84%E5%88%99/)。
