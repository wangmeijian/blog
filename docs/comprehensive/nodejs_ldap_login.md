# Nodejs接入LDAP认证，解决ConnectionError问题

LDAP，轻型目录访问协议（英文：Lightweight Directory Access Protocol，缩写：LDAP），通常用来做公司内部系统的登录认证。它的结构类似于一个树形目录，目录的条目由存储的数据的属性组成。如果要查询某个条目，需要将条目所在的路径组合起来，这个组件叫专有名称（distinguished name，DN），比如“ou=people,dc=wikipedia,dc=org”。

```bash
         dc=org
 
      |dc=github
       /          \
 ou=people     ou=groups
```

LDAP认证的大概步骤：

* 创建客户端
* 绑定查询账户（可以理解为管理员账号）
* 查询登录员工信息
* 验证登录员工密码
* 认证成功

```js
// nodejs ldap扩展
const ldap = require("ldapjs");
// 根据实际项目配置
const config = {
  ldapURL: "ldap://xxxx.xxx:xxx",
  adminDN: "xx=xxxx,xx=xxxx",
  bashDN: "xx=xxxx,xx=xxxx",
  adminPwd: "xxxxxxx",
};
// 员工登录时输入的账号密码
const inputData = {
  username: "xxxxxx",
  password: "xxxxxx",
};

// 创建客户端
const client = ldap.createClient({
  url: config.ldapURL,
  reconnect: true,
});

client.on("error", (err) => {
  console.log("error", err);
  client.unbind();
});

// 绑定查询帐户
client.bind(config.adminDN, config.adminPwd, function () {
  const opts = {
    // 根据项目情况配置，假设用户名存储的key为sAMAccountName
    filter: `(sAMAccountName=${inputData.username})`, //查询条件过滤器，查找指定用户名的账号信息
    scope: "sub", //查询范围
    timeLimit: 10, //查询超时,单位秒
  };

  // 查询员工信息
  client.search(config.bashDN, opts, function (err, res) {
    //查到员工信息
    res.on("searchEntry", function (entry) {
      SearchSuccess = true;

      // 解析结果
      const user = entry.object;
      // 获取用户DN
      const userDN = user.dn;
      // 校验登录员工密码
      client.bind(userDN, inputData.password, (err, res) => {
        // 没报错即校验成功
        if (err) {
          console.log("验证失败！" + err);
        } else {
          console.log("验证通过！" + res);
        }
        // 查询完成，解除绑定
        client.unbind();
      });
    });

    // 验证密码错误
    res.on("error", function (err) {
      SearchSuccess = false;
      client.unbind();
    });
    // 验证密码结束
    res.on("end", err => {
      console.log(err);
      // 切勿在这里解除客户端绑定
    })
  });
});
```

注意：切勿在验证密码结束事件回调里面执行```client.unbind()```解除客户端绑定，由于回调函数都是异步执行，无法保证执行顺序，可能会影响“校验登录员工密码”那一步的回调，导致```ConnectionError```错误。