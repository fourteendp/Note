---
title: Flutter - Web跨域
uid: 1723161953416
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-09 08:05:53
updateTime: 2024-08-12 17:13:21
---

## 浏览器安全设置问题

在开发过程中，如果遇到即使设置了 CORS 但应用仍然无法运行的情况，可能是因为浏览器的安全设置。可以尝试修改 Flutter 的 `chrome.dart` 文件，添加 `--disable-web-security` 参数来禁用浏览器的同源策略。

## 本地开发环境的跨域问题

在运行 Flutter Web 应用时，可以使用命令行参数来禁用浏览器的同源策略。例如，使用以下命令来运行应用：

```
flutter run -d chrome --web-renderer canvaskit --web-browser-flag "--disable-web-security"
```

## 线上环境的跨域问题

在生产环境中，需要服务器端进行配置以允许跨域请求。例如，可以在 Nginx 配置文件中添加相应的跨域响应头，允许来自不同源的请求：

```
location /proxyLoadPicture-pro {
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization,Refreshtoken,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type' always;
    …
}
```

## 使用代理服务器

在开发过程中，可以使用 `shelf_proxy` 插件来创建一个本地代理服务器，转发请求到目标服务器，并设置响应头以允许跨域请求：

```dart
server.defaultResponseHeaders.add('Access-Control-Allow-Origin', '*');
server.defaultResponseHeaders.add('Access-Control-Allow-Credentials', true);
```

## 第三方库问题

在某些情况下，使用第三方库（如 retrofit）可能会导致跨域问题，特别是在 release 模式下。如果遇到这种情况，可能需要考虑使用其他库（如 dio）或者等待库的更新以解决混淆问题。

## 跨域请求的详细解释

跨域问题通常由浏览器拦截，即使服务器可以接收到请求并返回数据。如果服务器未设置允许跨域的响应头，浏览器会拦截这些数据。对于复杂请求，浏览器会先发送一个预检请求（OPTIONS 请求），如果服务器响应允许，则会发送实际的请求。

请注意，上述解决方案中的一些可能仅适用于开发环境，而在生产环境中，需要更安全的跨域策略，如通过服务器端设置 CORS 响应头来允许特定的源进行请求。

## 参考

 - [[跨域]]
