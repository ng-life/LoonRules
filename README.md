# LoonRules

按策略拆分的 Loon 远程规则。每个文件名为「策略名.list」，文件内不包含策略字段，由订阅配置的 `policy` 参数指定。

## 使用

在 Loon 配置的 `[Remote Rule]` 段添加以下内容。自定义策略需要提前创建；

```ini
[Remote Rule]
https://raw.githubusercontent.com/ng-life/LoonRules/main/Home.list, policy=Home, tag=Home, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/YJP.list, policy=YJP, tag=YJP, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/AI.list, policy=AI, tag=AI, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/Proxy.list, policy=Proxy, tag=Proxy, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/DIRECT.list, policy=DIRECT, tag=DIRECT, enabled=true
https://raw.githubusercontent.com/ng-life/LoonRules/main/RejectDict.list, policy=REJECT_DICT, tag=RejectDict, enabled=true
```

## PP 停车去广告插件

在 Loon 中添加以下插件地址：

```text
https://raw.githubusercontent.com/ng-life/LoonRules/main/4Pyun.plugin
```

插件处理两类接口：

- 广告拉取接口返回抓包中出现过的 `code=1002` 无广告响应。
- `GET /rest/2.0/bonus/user/event/list` 由 Request Script 在请求发出前直接返回本地模拟数据，不访问服务端；响应沿用抓包中的成功结构和分页字段，只将 `payload.row` 设为空数组。

插件声明了 `ad-api.4pyun.com` 和 `user-api.4pyun.com` 的 MitM 域名。首次使用需在 Loon 中安装并信任 MitM 证书，并启用 HTTPS 解密。

脚本：[广告拉取响应](https://github.com/ng-life/LoonRules/blob/main/pp-parking-ad.js)、[活动列表本地模拟](https://github.com/ng-life/LoonRules/blob/main/pp-parking-event-list.js)。

参考：[Loon 插件文档](https://nsloon.app/docs/Plugin/) 和 [MitM 指南](https://nsloon.app/docs/MitM/)。
