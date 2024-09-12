---
title: Nodejs - 相关技术
uid: 20240123112806996
aliases: []
categories: []
tags:
  - 计算机/技术
  - Nodejs
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-09 08:41:35
---

## 爬虫

- [puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/)：Puppeteer 是一个 Node 库，它提供了一
  个高级 API 来通过 DevTools 协议控制 Chrome 或 Chromium。Puppeteer 可以用来生成最新的，自动化的，可
  交互的页面截图或者是页面的 PDF。它还可以用来创建最新的，自动化的，有测试意义的，无头的浏览
  器。Puppeteer 可以在任何平台上运行，支持 Linux, Mac OS X 和 Windows。
- [cheerio](https://cheerio.js.org/)：Cheerio 是一个 Node.js 库，它使服务器端的 jQuery 语法变得可
  用。它可以解析 HTML 并在服务器端执行 jQuery 语法。
- [request](https://github.com/request/request/)：Request 是一个简单的 HTTP 请求库，它可以让你发起
  HTTP 请求。
- [superagent](https://visionmedia.github.io/superagent/)：SuperAgent 是一个轻量级、渐进式的 Ajax
  API，可读性好、学习成本低、可编写测试用例、支持 Node.js。
- [axios](https://www.axios-http.cn/)：Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js
  中。

## 框架

- [express](https://www.expressjs.com.cn/)：基于 Node.js 平台，快速、开放、极简的 Web 开发框架
- [koa](https://koajs.com/)：Koa 是一个新的 web 框架，致力于成为 web 应用和 API 开发的一致性解决方
  案。
- [egg](https://eggjs.org/zh-cn/)：为企业级框架和应用而生
- [nest](https://docs.nestjs.cn/7/firststeps)：一个用于构建高效、可扩展的 Node.js 服务器端应用程序的
  框架。使用 TypeScript 编写，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应编程）
  的元素。
- [fastify](https://www.fastify.cn/)：Fastify 是一个低开销的高性能 Web 框架，支持 HTTP2。
- [midway](https://midwayjs.org/midway/)：基于 Egg.js 的企业级 Node.js 框架，提供了更多的约定和更强
  的扩展性，让开发者更专注于业务开发。
- [thinkjs](https://thinkjs.org/zh-cn/)：基于 Koa2 的 Node.js 框架，支持 TypeScript，提供了
  ORM、WebSocket、模板引擎、多进程管理等一系列功能。
- [sails](https://sailsjs.com/)：Sails 是一个基于 Node.js 的 MVC 框架，它可以帮助你快速构建企业级应
  用程序。
- [adonisjs](https://adonisjs.com/)：AdonisJs 是一个 Node.js 框架，它有助于构建高性能的 Web 应用程
  序。它是基于 MVC 架构的，它的设计目标是让开发人员专注于编写业务逻辑，而不是处理应用程序的基础设
  施。
- [feathers](https://docs.feathersjs.com/)：Feathers 是一个基于 Node.js 的实时应用程序框架，它可以让
  你轻松地构建实时 API 和实时应用程序。
- [meteor](https://www.meteor.com/)：Meteor 是一个用于构建现代 web 和移动应用程序的完整平台。它是一
  个完全开源的平台，它的核心是一个用于构建应用程序的 JavaScript 库，它还包括一个完整的应用程序开发工
  具链，包括数据层（MongoDB），一个构建工具（Babel 和 webpack），一个开发服务器（Meteor Development
  Server），以及一个包管理器（Meteor Package System）。
- [loopback](https://loopback.io/)：LoopBack 是一个开源的 Node.js 框架，它可以让你轻松地创建 REST
  APIs 和连接到后端数据源（如数据库、SOAP 和 REST 服务）。

## 工具

- [pm2](https://pm2.keymetrics.io/)：PM2 是一个带有负载均衡功能的生产进程管理器。
- [nodemon](https://nodemon.io/)：Nodemon 是一个用于开发的实用程序，它会监视 Node.js 应用程序中的任
  何更改并自动重新启动服务器。
- [forever](https://github.com/foreverjs/forever)：Forever 是一个简单的 CLI 工具，用于确保 Node.js
  脚本在服务器上永远运行。

## 数据库

- [mongoose](https://mongoosejs.com/)：Mongoose 是一个 MongoDB 对象建模工具，它提供了一种简单的、灵
  活的、强大的方式来与 MongoDB 进行交互。
- [sequelize](https://sequelize.org/master/)：Sequelize 是一个基于 Promise 的 Node.js ORM，它支持
  PostgreSQL、MySQL、SQLite 和 MSSQL，并且具有强大的事务支持、关系映射、读取复制和其他重要功能。
- [typeorm](https://typeorm.io/#/)：TypeORM 是一个使用 TypeScript 编写的 ORM，它可以运行在 NodeJS、
  浏览器、Cordova、PhoneGap、Ionic、React Native、NativeScript、Expo 和 Electron 平台上。
- [waterline](https://sailsjs.com/documentation/concepts/models-and-orm)：Waterline 是一个用于
  Node.js 的 ORM，它可以与多种数据库引擎（如 MySQL、MongoDB、PostgreSQL、SQLite、Redis 等）进行交
  互。
- [lowdb](https://github.com/typicode/lowdb/)：LowDB 是一个小巧的本地 JSON 数据库，它使用 lowdb 这个
  小巧的库来存储数据。
- [nedb](https://github.com/louischatriot/nedb/)：NeDB 是一个轻量级的嵌入式数据库，它使用 Node.js 编
  写，可以在 Node.js 中使用，也可以在浏览器中使用。
- [mongodb](https://www.mongodb.com/)：MongoDB 是一个基于分布式文件存储的开源数据库系统。
- [mysql](https://www.mysql.com/)：MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前
  属于 Oracle 公司。
- [redis](https://redis.io/)：Redis 是一个开源（BSD 许可）、内存中的数据结构存储，用作数据库、缓存和
  消息代理。
- [sqlite](https://www.sqlite.org/index.html)：SQLite 是一个软件库，它实现了自给自足、服务器小型、零
  配置、事务性 SQL 数据库引擎。
- [postgresql](https://www.postgresql.org/)：PostgreSQL 是一个功能强大的开源对象关系数据库系统，它使
  用和 PostgreSQL 兼容的 SQL 语言作为查询语言。
- [mariadb](https://mariadb.org/)：MariaDB 是一个开源的关系型数据库管理系统，它是 MySQL 的一个分支，
  由 MySQL 的创始人 Michael Widenius、David Axmark 和 Allan Larsson 开发。
- [mssql](https://www.microsoft.com/en-us/sql-server/sql-server-2019)：Microsoft SQL Server 是一个关
  系型数据库管理系统，由微软公司开发。
- [oracle](https://www.oracle.com/database/)：Oracle 数据库是一个关系型数据库管理系统，由美国甲骨文
  公司开发。
- [couchdb](https://couchdb.apache.org/)：Apache CouchDB 是一个开源的文档数据库，它是 NoSQL 数据库的
  一种。
- [elasticsearch](https://www.elastic.co/cn/elasticsearch/)：Elasticsearch 是一个开源的分布
  式、RESTful 风格的搜索和数据分析引擎。
- [neo4j](https://neo4j.com/)：Neo4j 是一个图形数据库，它使用图形数据模型来存储数据。
- [memcached](https://memcached.org/)：Memcached 是一个高性能的分布式内存对象缓存系统，它通过在内存
  中缓存数据和对象来减少读取数据库的次数，从而提高动态 Web 应用程序的速度。

## 服务端渲染

- [nuxt](https://zh.nuxtjs.org/)：Nuxt.js 是一个基于 Vue.js 的通用应用框架。
- [next](https://nextjs.org/)：Next.js 是一个轻量级的 React 服务端渲染应用框架。
- [umi](https://umijs.org/zh-CN/)：Umi 是一个可插拔的企业级 react 应用框架。

## 服务端

- [socket.io](https://socket.io/)：Socket.IO 是一个实时应用程序框架，它使得实时、双向和基于事件的通
  信变得简单。
- [ws](https://github.com/websockets/ws)：ws 是一个用于 Node.js 的 WebSocket 客户端和服务器实现。
- [mqtt](https://www.emqx.cn/mqtt)：MQTT 是一个基于发布/订阅（publish/subscribe）模式的 " 轻量级 "
  通讯协议，该协议构建于 TCP/IP 协议之上，由 IBM 在 1999 年发布。
- [node-ipc](https://github.com/RIAEvangelist/node-ipc)：node-ipc 是一个 Node.js 的进程间通信模块。
