---
title: B端系统
uid: 10133099162635682
aliases: []
categories: []
tags:
  - B端
archive: false
draft: false
todo: false
createTime: 2024-04-17 09:55:17
updateTime: 2024-08-07 10:24:41
---

`toB` 是指面向企业的服务，即 `Business to Business`，与 `toC` 相对应，`toC` 是指面向消费者的服务，即

`Business to Consumer`。

`toB` 系统是指为企业提供服务的系统，例如 `ERP`、`CRM`、`SCM` 等。

## 系统之间的关系

![[assets/339cc91fabe92369a5ae7681b3ca4392_MD5.jpeg]]

**ERP 和其他系统：** ERP 系统是企业统一的管理平台，负责整合财务、人力资源、生产、供应链、销售等方面的信息。它与 MES、WMS、SCM 等系统集成，以获取生产现场的实时数据、库存信息和供应链状态，实现企业资源的有效规划和管理。

**WMS 和 MES：** WMS 与 MES 的整合效益主要体现在追溯链的打通、库存透明化及指导仓库作业和生产。

**OMS 和 WMS、CRM：** OMS 通过与 WMS 的协同，能够实时掌握库存情况，避免缺货或超卖等问题；同时，通过 CRM 系统收集的客户数据，OMS 可以更好地预测客户需求，优化订单处理策略。

**MES 和其他系统：** MES 适用于生产管理比较细的企业，ERP 里面也包含生产管理，但计算的需求分析没 MES 准确，适用生产比较简单的企业。

**WMS 和 ERP/SCM：** WMS 负责管理仓库内的物流活动，与 ERP 系统集成可以确保库存数据的准确性和及时更新，与 SCM 集成则支持整个供应链的效率。

- [[ERP(企业资源计划 Enterprise Resource Planning)]]
- [[CRM(客户关系管理 Customer Relationship Management)]]
- [[SCM(供应链管理 Supply Chain Management)]]
- [[MES(制造执行 Manufacturing Execution)]]
- [[WMS(仓库管理 Warehouse Management)]]
- [[PLM(产品生命周期管理 Product Lifecycle Management)]]
- [[SRM(供应商关系管理 Supplier Relationship Management)]]
- [[OMS(订单管理 Order Management)]]
- [[TMS(运输管理 Transportation Management)]]
- [[OA(办公自动化 Office Automation)]]
- [[QMS(质量管理系统 Quality Management System)]]
- [[MRP(物料需求计划 Material Requirements Planning)]]
- [[MPS(主生产计划 Master Production Schedule)]]
- [[BOM(物料清单 Bill of Materials)]]
- [[JIT(即时生产 Just In Time)]]
- [[VMI(供应商管理库存 Vendor Managed Inventory)]]
- [[APS(高级计划与排程 Advanced Planning and Scheduling)]]

## 参考

- [古茗前端第二十六期周刊 (qq.com)](https://mp.weixin.qq.com/s/cWuiJzR_1Aih3cc_HMhEUQ)
- [【知识分享】一文详解，MES、ERP、WMS、OMS、TMS、CRM、SCM、SRM、PLM…… (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU2MTkzMDgyNQ==&mid=2247491380&idx=1&sn=92b3f14bc86e371d2abbda248eb5698f&scene=21#wechat_redirect)
