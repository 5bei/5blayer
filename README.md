## 5BLayer

>pc 版弹出层

这是一个简单的pc弹层工具，不依赖任何包

#### 安装

```bash
	npm install b5layer
```

1.浏览器端使用
```
	<link rel="stylesheet" href="./node_modules/5blayer/dist/index.min.js">
	<script src="./node_modules/5blayer/dist.min.js"></script>
```

your own codes:
```
	b5layer.modal({
		title: title,
		msg: msg
	})
```

2.es6使用
```
	import 5blayer from '5blayer'

	5blayer.modal()
	5blayer.alert()
	5blayer.confirm()
	5blayer.loading()
```

### 参数说明
～待更新