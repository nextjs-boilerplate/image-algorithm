# image-algorithm

图片处理演示程序

## 使用方法

###  将图片处理可执行文件放到tools/bin目录下，并赋予可执行权限

```
cp /path/to/thresh_test tools/bin/
chmod +x tools/bin/thresh_test
```

### 在pages/filters目录下新建一个空的js文件，填入一下内容，注意替换对应的信息

```
import { Component } from 'react'
import Layout from '../../components/LayoutBlank.js'
import ImgFilter from '../../components/ImgFilter'

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <div className="container">
        <h1>图形处理工具</h1>
        <ImgFilter
          cmd="thresh_test"
          inputPrifix="-i "
          outputPrifix="-o "
          params={[
            {
              title: '阈值',
              name: '-t',
              value: 127,
              input: {
                type: 'range',
                min: 0,
                max: 255,
                step: 1,
              },
            }
          ]}
        />
      </div>
    </div>)
  }
}

export default Layout(Index)
```

`<h1>图形处理工具</h1>`可替换标题

`cmd="thresh_test"`可替换命令名称

`params={...}`可替换参数列表

`inputPrifix="-i "` 输入参数前缀

`outputPrifix="-o "` 输出参数前缀

### 启动服务与访问

```
chmod +x ./build-restart.sh
./build-restart.sh
```

http://localhost/



### 调整端口和域名

server.js

```
httpserver.listen(80, (err) => {
```

static/js/io.js

```
window.socket = io('http://localhost:80');
```