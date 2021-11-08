---
title: WebSocket
date: 2021-04-01 15:37:35
tags: websocket
toc: true
declare: true
categories:
  - 通信协议
  - websocket
---

### websocket 简介

#### websocket 是什么

1，websocket 是一种网络通信协议。RFC6455 定义了它的通信标准。

2，websocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通信的协议。

#### websocket 协议的特点

1，其最大的特点就是服务器可以主动的向客户端推送消息，客户端也可以主动向服务器发送消息，是真正的双向平等对话，属于服务器推送技术的一种。

2，它建立在 TCP 协议之上，服务端的实现比较容易。

<!-- more -->

3，与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

4，可以发送文本，也可以发送二进制数据。

5，没有同源限制，客户端可以与任意服务器通信。

6，协议标识符是 ws（如果加密则为 wss），服务器网址就是 URL。

- 如：ws://example.com:80/some/path

#### http 协议

1，http 协议是一种无状态的、无连接的、单向的应用层协议。它采用了请求/响应模型。通信请求只能有客户端发起，服务端对请求做出应答处理。

#### 对比双工通信协议 http 协议的弊端

1，http 协议无法实现服务器主动向客户端发起消息。

2，这种单向请求的特点注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦，大多数 web 应用程序将通过频繁的异步 ajax 请求实现长轮询。轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。

3，http 协议与 websocket 协议对比：

![http 协议与 websocket 协议对比图](websocket.png)

4，websocket 协议分为两部分，分别为：握手（基于 http 协议）和数据传输。

- 来自客户端的握手看起来像如下形式：

```
GET ws://localhost/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Sec-webSocket-Key: dGh1IHNhbxBsZSBub25jZQ==
Sec-webSocket-Extensions: permessage-deflate
Sec-webSocket-Version: 13
```

- 来自服务器的握手看起来像如下形式：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-webSocket-Accept: s3pPLMBiTxaQ9KYGzzhZRbK+xOo=
Sec-webSocket-Extensions: permessage-deflate
```

- 字段说明：

Connection: Upgrade：标识该 HTTP 请求是一个协议升级请求。

Upgrade: websocket：协议升级为 websocket 协议。

Sec-webSocket-Version: 13：客户端支持 websocket 的版本。

Sec-webSocket-Key：客户端采用 base64 编码的 24 位随机字符序列，服务器接受客户端 HTTP 协议升级的证明。要求服务端响应一个对应加密的 Sec-webSocket-Accept 头信息作为应答。

Sec-webSocket-Extensions：标识协议扩展类型。

#### websocket 对象

1，实现 websocket 的 web 浏览器将通过 websocket 对象公开所有必需的客户端功能（主要指支持 Html5 的浏览器）。

2，以下 API 用于创建 websocket 对象：

```js
const ws = new websocket(url);
```

> 参数 url 格式说明：ws://ip 地址:端口号/资源名称

#### websocket 属性

1，**webSocket.readyState**：属性返回实例对象的当前状态，共有四种。

- CONNECTING：值为 0，表示正在连接。

- OPEN：值为 1，表示连接成功，可以通信了。

- CLOSING：值为 2，表示连接正在关闭。

- CLOSED：值为 3，表示连接已关闭，或者打开连接失败。

> 相关示例如下：

```js
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```

2，**webSocket.bufferedAmount**：实例对象的 bufferedAmount 属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```js
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

#### websocket 事件

1，**open**：在连接建立时触发。

- 对应事件处理程序：ws.onopen。

```js
ws.onopen = function () {
  ws.send("来了老弟！");
};
```

> 如果要指定多个回调函数，可以使用 addEventListener 方法。

```js
ws.addEventListener("open", function (event) {
  ws.send("来了老弟！");
});
```

2，**message**：客户端接收服务端数据时触发。

- 对应事件处理程序：ws.onmessage。

```js
ws.onmessage = function (event) {
  const data = event.data;
  // 处理数据
};

ws.addEventListener("message", function (event) {
  const data = event.data;
  // 处理数据
});
```

- **注意**：服务端数据可能是文本，也可能是二进制数据（blob 对象或 Arraybuffer 对象）。

```js
ws.onmessage = function (event) {
  if (typeof event.data === string) {
    console.log("Received data string");
  }

  if (event.data instanceof ArrayBuffer) {
    const buffer = event.data;
    console.log("Received arraybuffer");
  }
};
```

- 除了动态判断收到的数据类型，也可以使用 **binaryType** 属性，显示指定收到的二进制数据类型。

```js
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function (e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function (e) {
  console.log(e.data.byteLength);
};
```

3，**error**：通行发生错误时触发。

- 对应事件处理程序：ws.onerror。

```js
socket.onerror = function (event) {
  // handle error event
};

socket.addEventListener("error", function (event) {
  // handle error event
});
```

4，**close**：连接关闭时触发。

- 对应事件处理程序：ws.onclose。

```js
ws.onclose = function (event) {
  const code = event.code;
  const reason = event.reason;
  const wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function (event) {
  const code = event.code;
  const reason = event.reason;
  const wasClean = event.wasClean;
  // handle close event
});
```

#### websocket 方法

1，**send**()：该方法用于在与服务器连接成功时向服务器发送数据。

- 发送文本的示例如下：

```js
ws.send("message");
```

- 发送 Blob 对象的示例如下：

```js
const file = document.querySelector('input[type = "file"]').files[0];
ws.send(file);
```

- 发送 ArrayBuffer 对象的示例如下：

```js
// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```

#### 服务端相关

1，Tomcat 的 7.0.5 版本开始支持 websocket，并且实现了 Java WebSocket 规范（JSR356）。

2，Java WebSocket 应用由一系列的 WebSocketEndpoint 组成。Endpoint 是一个 Java 对象，代表 websocket 链接的一端，对于服务器，我们可以视为处理具体 WebSocket 消息的接口，就像 Servlet 与 http 请求一样。

3，我们可以通过两种方式定义 Endpoint：

- 第一种是编程式，即继承类 javax.websocket.Endpoint 并实现其方法。

- 第二种是注解式，即定义一个 POJO，并添加 @ServerEndpoint 相关注解。

4，Endpoint 实例在 WebSocket 握手时创建，并在客户端与服务端连接过程中有效，最后在连接关闭时结束。在 Endpoint 接口中明确定义了与其声明周期相关的方法，规范实现者确保声明周期的各个阶段调用实例的相关方法，声明周期方法如下：

- onClose：当会话关闭时调用。对应注解为：@OnClose。

- onOpen：当开启一个新的会话时调用，该方法是`客户端与服务端握手成功后调用`的方法。对应注解为：@OnOpen。

- onError：当连接过程中异常时调用。对应注解为：@OnError。

5，服务端如何接收客户端发送的数据？

- 通过为 Session 添加 MessageHandler 消息处理器来接收消息。而当采用注解方式定义 Endpoint 时，我们可以通过 @OnMessage 注解指定接收消息的方法。

6，服务端如何推送数据给客户端？

- 发送消息则由 RemoteEndpoint 完成，其实例由 Session 维护，根据数据使用情况，我们可以通过 **Session.getBasicRemote** 获取同步消息发送的实例，然后调用其 sendXxx() 方法就可以发送消息，可以通过 **Session.getAsyncRemote** 获取异步消息发送实例。

7，服务端相关代码：

```java
@ServerEndpoint("/robin")
public class ChatEndPoint {
  private static Set<ChatEndPoint> webSocket = new HashSet<>();

  private Session session;

  @OnMessage
  public void onMessage(String message, Session session) throws IOException {
    System.out.println('接收的消息时：' + message);
    System.out.println(session);
    // 将消息发送给其他的用户
    for (Chat chat: websocketSet) {
      if (chat != this) {
        chat.session.getBasicRemote().sendText(message);
      }
    }
  }

  @OnOpen
  public void onOpen(Session session) {
    this.session = session;
    websocketSet.add(this);
  }

  @OnClose
  public void onError(Session session) {
    System.out.println('连接关闭了...');
  }

  @OnError
  public void onError(Session session.Throwable error) {
    System.out.println('出错误了...' + error.getMessage());
  }
}
```

#### 前端建立 websocket 相关代码

1，心跳检测相关思路与说明：

- 每隔一段指定的时间（计时器），向服务器发送一个数据，服务器收到数据后再发送给客户端，正常情况下客户端通过 onmessage 事件是能监听到服务器返回的数据的，说明请求正常。

- 如果再这个指定时间内，客户端没有收到服务器端返回的响应消息，就判定连接断开了，使用 websocket.close 关闭连接。

- 这个关闭连接的动作可以通过 onclose 事件监听到，因此在 onclose 事件内，我们可以调用 websocketReconnect 事件进行重连操作。

```js
export let ws;
// lockReconnect用于避免重复连接
let lockReconnect = false;
// 连接ws的url
const wsUrl = "ws://127.0.0.1:8000";

// 请求数据
export const QUERY_ALL_FRAME = {
  action: 'queryMessage',
};

// 心跳检测
export const HEARTBEAT_FRAME = {
  action: 'heartBeat',
};

// 删除消息
export const DELETE_FRAME = {
  action: 'deleteMessageAll',
}

// 创建websocket
function createWebSocket() {
  try {
    // 创建前先关闭创建好的ws
    closeSocket();
    ws = new WebScoket(wsUrl);
    websocketInit();
  } catch (e) {
    console.log("catch");
    // 出现异常时，重新连接ws
    websocketReconnect(wsUrl);
  }
}

// 初始化ws事件
function websocketInit() {
  ws.onopen = function (event) {
    onOpen(event);
  };
  ws.onmessage = function (event) {
    onMessage(event);
  };
  // 断开连接时重新连接ws
  ws.onclose = function (event) {
    onClose(event);
    websocketReconnect(event);
  };
  // 连接出现异常时重新连接ws
  ws.onerror = function (event) {
    onError(event);
    websocketReconnect(event);
  };
}

// 关闭ws连接
function closeSocket() {
  if (ws) {
    ws.onclose = function () {};
    ws.close();
  }
}

// 重新连接ws
function websocketReconnect(url) {
  if (lockReconnect) return;
  lockReconnect = true;
  wstime && clearTimeout(wstime);
  // 连接断开时每个5s再次连接
  const wstime = setTimeout(function () {
    createWebSocket(url);
    lockReconnect = false;
  }, 5000);
}

// 设置心跳检测
const heartCheck = {
  timeout: 50000;
  timeoutObj: null;
  serverTimeoutObj: null;
  start: function () {
    const self = this;
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    // 每隔50000进行心跳检测
    this.timeoutObj = setTimeout(function () {
      sendMessage(JSON.stringify(HEARTBEAT_FRAME));
      // 如果50000之内没有操作关闭ws连接
      self.serverTimeoutObj = setTimeout(function () {
        ws.close();
      }, self.timeout);
    }, this.timeout);
  },
}

// 发送消息
export function sendMessage(msg) {
  if (ws && ws.readyState === 1) {
    try {
      ws.send(msg);
    } catch (e) {
      console.log(e);
    }
  }
}

// ws连接成功
function onOpen (event) {
  sendMessage(JSON.stringify(QUERY_ALL_FRAME));
  // 发送消息之后重新进行心跳检测
  heartCheck.start();
}

// 收到服务端数据
function onMessage (event) {
  try {
    const data = JSON.parse(event.data);
    if (data.code === 200) { // 心跳数据不处理
      // 所需的正常操作
      if (data.action === 'heartBeat') {
        console.log(event.data);
      } else {
        // 解析处理数据
        if (data.action === 'queryMessage') {
          initTaskList(data.data || []);
        } else if (data.action === 'saveMessage') {
          addTask(data.data || null);
        }
      }
    } else {
      console.log('收到非格式化数据');
    }
  } catch (e) {
    console.log(e);
  }
  // 拿到任何消息都说明当前连接是正常的，此时从新进行心跳检测
  heartCheck.start();
}

// 关闭连接
function onClose (event) {
  console.log(event);
}

// 连接出错
function onError (event) {
  console.log(event);
}
```
