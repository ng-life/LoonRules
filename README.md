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

## 插件

在 Loon 中添加以下插件地址：

```text
https://raw.githubusercontent.com/ng-life/LoonRules/main/4Pyun.plugin
```

插件根据抓包识别到的广告拉取接口，拦截专用广告域名 `ad-api.4pyun.com`。会员、奖励等业务接口使用的 `user-api.4pyun.com` 不受影响。

参考：[Loon 规则文档](https://nsloon.app/docs/category/%E8%A7%84%E5%88%99/)。
