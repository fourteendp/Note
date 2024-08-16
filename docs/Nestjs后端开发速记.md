---
title: Nestjs后端开发速记
uid: 562949955148476
aliases: 
categories: 
tags: 
archive: false
draft: false
todo: false
createTime: 2024-05-13 19:00:50
updateTime: 2024-08-02 13:59:53
---

<https://zhuanlan.zhihu.com/p/555833984>

## nestjs 之后端开发速记

### 架构流程

Controller -> Service -> Repository -> Database

Controller: 负责接收请求，处理请求参数，调用 Service 层的方法，返回结果给客户端

- 只能被注入

Service: 业务逻辑处理层，负责处理业务逻辑，调用 Repository 层的方法

- 能够被注入，也可以注入别的对象

Repository: 数据库操作层，负责数据库的增删改查操作

Database: 数据库

### 什么是 IoC

IoC(Inversion of Control): 控制反转，是一种设计原则，它将传统的程序控制流程反转，由被调用者控制调用

者。这样，对象之间的关系从原来的直接依赖变为间接依赖，从而实现了控制反转。

DI(Dependency Injection): 依赖注入，是 IoC 的一种实现方式，通过依赖注入，可以将依赖对象的创建和维护交

给外部容器，从而实现了控制反转。

[基于TypeScript实现IoC容器](https://juejin.cn/post/7061510864708304933)

后端系统有很多的对象，这些对象之间的关系错综复杂，如果手动创建并组装对象比较麻烦，所以后端框架一般都

提供了 IoC 机制。

IoC 机制是在 class 上标识哪些是可以被注入的，它的依赖是什么，然后从入口开始扫描这些对象和依赖，自动

创建和组装对象。

Nest 里通过 @Controller 声明可以被注入的 controller，通过 @Injectable 声明可以被注入也可以注入别的对

象的 provider，然后在 @Module 声明的模块里引入。

并且 Nest 还提供了 Module 和 Module 之间的 import，可以引入别的模块的 provider 来注入。

虽然 Nest 这套实现了 IoC 的模块机制看起来繁琐，但是却解决了后端系统的对象依赖关系错综复杂的痛点问

题。

#### NestJS 中的 IoC 简单使用

nest 会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。

所以 AppController 只是声明了对 AppService 的依赖，就可以调用它的方法了

nest 在背后自动做了对象创建和依赖注入的工作。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5245830454164037a3001c6c4288a8b3~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp)

nest 也能够导入其他模块，比如这里的 AppModule 导入了 UserModule，那么 UserModule 里的对象也会被 nest

创建和注入。

**NestJS 中的依赖注入示例**

```typescript
// user.module.ts
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
// app.module.ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// 通过 @Module 声明模块，其中 controllers 是控制器，只能被注入。
// providers 里可以被注入，也可以注入别的对象，比如这里的 AppService。
@Module({
  imports: [UserModule], // 导入其他模块，UserModule 里的对象也可以被注入。
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// app.controller.ts
import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
// @Controller，代表这个 class 可以被注入，nest 也会把它放到 IoC 容器里。
// Controller 只需要被注入，所以 nest 单独给它加了 @Controller 的装饰器。
@Controller()
export class AppController {
  @Inject(AppService)
  private readonly appService: AppService;
  constructor() {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// app.service.ts
import { Injectable } from "@nestjs/common";
// @Injectable，代表这个 class 可注入，那么 nest 就会把它的对象放到 IOC 容器里。
// Service 是可以被注入也是可以注入到别的对象的，所以用 @Injectable 声明。
@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

### 多种依赖注入方式

一般情况下，provider 是通过 @Injectable 声明，然后在 @Module 的 providers 数组里注册的 class。

默认的 token 就是 class，这样不用使用 @Inject 来指定注入的 token。

但也可以用字符串类型的 token，不过注入的时候要用 @Inject 单独指定。

除了可以用 useClass 指定注入的 class，还可以用 useValue 直接指定注入的对象。

如果想动态生成对象，可以使用 useFactory，它的参数也注入 IOC 容器中的对象，然后动态返回 provider 的对

象。

如果想起别名，可以用 useExisting 给已有的 token，指定一个新 token。

灵活运用这些 provider 类型，就可以利用 Nest 的 IOC 容器中注入任何对象。

### 如何调试 NestJS

NestJS 项目的调试和普通的 Node.js 项目一样，可以通过 VSCode 或 浏览器的开发者工具来调试。

复杂的代码需要用断点调试查看调用栈和作用域，也就是代码的执行路线，然后单步执行。

node 代码可以加上 --inspect 或者 --inspect-brk 启动调试 ws 服务，然后用 Chrome DevTools 或者 vscode

debugger 连上来调试。

nest 项目的调试也是 node 调试，可以使用 nest start --debug 启动 ws 服务，然后在 vscode 里 attach 上

来调试，也可以添加个调试配置来运行 npm run start:dev。

nest 项目最方便的调试方式还是在 VSCode 里添加 npm run start:dev 的调试配置。

此外，我们还理解了 logpoint、条件断点、异常断点等断点类型。

学会了 nest 项目的调试，就可以直接在代码里打断点了。

#### 使用浏览器开发者工具调试 NestJS

```bash
npm run start:debug
```

会开启一个调试端口，然后在浏览器的开发者工具里打开这个端口，就可以在浏览器里调试 NestJS 项目了。

打开 <chrome://inspect/，可以看到可以调试的目标：>

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a0ff69dc97e47ef9d6eccd1ae9d8501~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9ae4e138a374a62b5dd67b4e7592210~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp)

#### 使用 VSCode 调试 NestJS

1. 在 .vscode 文件夹下创建 launch.json 文件，配置调试信息

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debug nest",
      "runtimeExecutable": "npm",
      "args": ["run", "start:dev"],
      "skipFiles": ["<node_internals>/**"], // 跳过 node 内部文件
      "console": "integratedTerminal" // 调试时在终端里显示
    }
  ]
}j
```

### AOP

![](https://liushuaiyang.oss-cn-shanghai.aliyuncs.com/nest-docs/image/%E7%AC%AC09%E7%AB%A0-3.png)

其实 Express 的中间件的洋葱模型也是一种 AOP 的实现，因为你可以透明的在外面包一层，加入一些逻辑，内层

感知不到。

而 Nest 实现 AOP 的方式更多，一共有五种，包括

Middleware、Guard、Pipe、Interceptor、ExceptionFilter。

Middleware: 中间件，是一种 AOP 的实现，可以在请求到达 Controller 之前或者之后，做一些通用的逻辑处

理。

Guard: 守卫，是一种 AOP 的实现，可以在请求到达 Controller 之前，做一些权限校验。

Pipe: 管道，是一种 AOP 的实现，可以在请求到达 Controller 之前，做一些参数校验。

Interceptor: 拦截器，是一种 AOP 的实现，可以在请求到达 Controller 之前或者之后，做一些通用的逻辑处

理。

ExceptionFilter: 异常过滤器，是一种 AOP 的实现，可以在请求到达 Controller 之前或者之后，做一些异常处

理。

这五种 AOP 的实现方式，可以在请求到达 Controller 之前或者之后，做一些通用的逻辑处理，比如日志、权限

校验、参数校验、异常处理等。

### 常用装饰器

- @Module： 声明 Nest 模块
- @Controller：声明模块里的 controller
- @Injectable：声明模块里可以注入的 provider
- @Inject：通过 token 手动指定注入的 provider，token 可以是 class 或者 string
- @Optional：声明注入的 provider 是可选的，可以为空
- @Global：声明全局模块
- @Catch：声明 exception filter 处理的 exception 类型
- @UseFilters：路由级别使用 exception filter
- @UsePipes：路由级别使用 pipe
- @UseInterceptors：路由级别使用 interceptor
- @SetMetadata：在 class 或者 handler 上添加 metadata
- @Get、@Post、@Put、@Delete、@Patch、@Options、@Head：声明
  get、post、put、delete、patch、options、head 的请求方式
- @Param：取出 url 中的参数，比如 /aaa/:id 中的 id
- @Query: 取出 query 部分的参数，比如 /aaa?name=xx 中的 name
- @Body：取出请求 body，通过 dto class 来接收
- @Headers：取出某个或全部请求头
- @Session：取出 session 对象，需要启用 express-session 中间件
- @HostParm： 取出 host 里的参数
- @Req、@Request：注入 request 对象
- @Res、@Response：注入 response 对象，一旦注入了这个 Nest 就不会把返回值作为响应了，除非指定
  passthrough 为 true
- @Next：注入调用下一个 handler 的 next 方法
- @HttpCode： 修改响应的状态码
- @Header：修改响应头
- @Redirect：指定重定向的 url
- @Render：指定渲染用的模版引擎

### 整体流程

![](https://liushuaiyang.oss-cn-shanghai.aliyuncs.com/nest-docs/image/%E7%AC%AC22%E7%AB%A0-6.png)

### 常见中间见

网关：Nginx、Kong、Zuul 缓存：Redis、MemCached、OsCache、EhCache 搜索：ElasticSearch、Solr 熔

断：Hystrix、resilience4j 负载均衡：DNS、F5、LVS、Nginx、OpenResty、HAproxy 注册中

心：Eureka、Zookeeper、Redis、Etcd、Consul 认证鉴权：JWT、SpringSecurity 消费队

列：RabbitMQ、Kafka、RocketMQ、ActiveMQ、Redis 系统监

控：Grafana、Prometheus、Influxdb、Telegraf、Lepus 文件系统：OSS、NFS、FastDFS、MogileFS RPC 框架：

Dubbo、Motan、Thrift、grpc 构建工具：Maven、Gradle 集成部署：Docker、Jenkins、Git、Maven 分布式配

置：Disconf、Apollo、Spring Cloud Config、Diamond 压测：LoadRunner、JMeter、AB、webbench 数据

库：MySQL、Redis、MongoDB、PostgreSQL、Memcache、HBase 网络：专用网络 VPC、弹性公网 IP、CDN 数据库中间

件：DRDS、Mycat、360 Atlas、Cobar 分布式框架：Dubbo、Motan、Spring-Could 分布式任

务：XXL-JOB、Elastic-Job、Saturn、Quartz 分布式追踪：Pinpoint、CAT、zipkin 分布式日

志：elasticsearch、logstash、Kibana 、redis、kafka 版本发布：蓝绿部署、A/B 测试、灰度发布/金丝雀发布
