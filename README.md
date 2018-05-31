# react学习笔记
### 基础知识点
* 组件可变的是通过`state`属性改变
* 在组件生成之后的生命周期`props`是不可变的部分
* 组件的编写可以采用 `class Xxx extends Component`
* 组件需要有`render()`方法，返回js的dom（返回结构可以使用jsx编写）
* 单项数据流，如图所示

![](media/15272057553298/15272057872909.jpg)

* 关于组件方法，需要在构造函数内进行`bind(this)`或在构造函数内编写组件方法（不推荐），或者使用箭头函数
* 组件的创建有三种方式，通过class类继承方式，函数方式（无状态组件），React.createClass方式（已经不推荐了）
* 关于表单的控件，需要通过设置value值来使得可变dom部分可控`<input value={this.state.aaa} onChange={this.onChange}>`

* 拆分组件，如果传参时可以通过props传递state和方法，可以通过children属性进行组件的组合。`<Item>{children}</Item>`
* 函数式编程的原则(react)：不改变原有的值，通过函数处理，得到新的值

```
input-> fx ->output
```
### 进阶

* 组件的生命周期

```
//组件挂载
constructor()
componentWillMount()
render()
componentDidMount()// 组件挂载时，适合用于异步获取数据等操作

//组件更新
componentWillReceiveProps()
shouldComponentUpdate()//用于性能优化，可以在这里决定是否需要重新渲染
componentWillUpdate()
render()
componentDidUpdate()

componentDidCatch()//异常处理（react 16才有）

```

* 条件渲染
在组件的jsx中，可以使用js的条件表达式（if-else,&&,||,三目运算符）

```javascript
...
render() { 
return ({result &&
  <Table
    list={result.hits}
    pattern={searchTerm}
    onDismiss={this.onDismiss}
  />})
}
```


```javascript
class ExplainBindingsComponent extends Component {
  onClickMe = () => {
    console.log(this);
  }

  render() {
    return (
      <button
        onClick={this.onClickMe}
        type="button"
      >
              Click Me
      </button>
    );
  }
}
```
* 如果当前模块使用了JSX的无状态组件，必须引入`import React from 'react';
`
* PropTypes 允许你为组件定义测试检查

```
Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
//类型有：
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string

PropTypes.node
PropTypes.element
// 可以设置必选
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
```

* Jest 允许你为组件属性快照测试
* Enzyme 允许你为组件书写单元测试
* 引用DOM元素

```
 1.使用 DOM API（focus事件，媒体播放等）
 2.调用命令式 DOM 节点动画
 3.与需要 DOM 节点的第三方库集成
```
* 高阶组件：对已有组件进行封装，并且添加其他的处理逻辑，并返回一个新的组件

```javascript
const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);
```
* setState如果依赖原来的状态，得用函数方式设置

```javascript
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

# es6相关

### let和const的使用
```javascript
const a = 'aa'//不可变
let b = 'bb'// 可变，严格作用返回在作用域内，无法变量提升
```
### 箭头函数的使用
````javascript
const a = ()=> 'a'// 如果直接返回，不需要大括号和return
````
### class的使用

```javascirpt
class A extends B{

}
```
### 对象的解构

``` javascript
const user = {
  firstname: 'Robin',
  lastname: 'Wieruch',
};
const {firstname,lastname} = user;
```

#### 数组的解构

```javascript
const arr = ['aa','bb']
const [aa,bb] = arr
```

#### array的map,filter,incudes的使用
```javascript

arr = [1,2,3,4];
arr.map(val=>val+1)//对数组处理
arr.filter(val=>val%2 === 0?true:false) //筛选出结果
arr.incudes(3)//数组内是否存在传入的量
```
#### 数组和对象的扩展运算符

```
const userList = ['Robin', 'Andrew', 'Dan'];
const additionalUser = 'Jordan';
const allUsers = [ ...userList, additionalUser ];

const userNames = { firstname: 'Robin', lastname: 'Wieruch' };
const age = 28;
const user = { ...userNames, age };

console.log(user);
```
#### 字符串模板的语法

```javascript
const hello = '你好'；
const name = 'Bobby';
const test =`${hello} ${name}!`；
```

#### ES模块
模块导出变量和导入变量

```
const firstname = 'robin';
const lastname = 'wieruch';

export { firstname, lastname };

import { firstname, lastname } from './file1.js';

console.log(firstname);
// output: robin

//导入模块所有的变量
import * as person from './file1.js';

console.log(person.firstname);
// output: robin

//导入加别名
import { firstname as foo } from './file1.js';

console.log(foo);
// output: robin
```
导出默认变量

```
const robin = {
  firstname: 'robin',
  lastname: 'wieruch',
};

export default robin;
```

```
import developer from './file1.js';

console.log(developer);
// output: { firstname: 'robin', lastname: 'wieruch' }
```

# 更多

* 状态管理 （Redux,MobX）
* 代码结构 （ES Module）
* 连接到数据库和/或认证 (Graphql)
* 测试（e2e,快照测试，单元测试）
* 异步请求 (Graphql)
* 路由 （reate-router）
* 类型检查 （flow,propType）
* Webpack 和 Babel 相关工具（Webpack4的使用）
* React Native

# Redux

核心思想：

```
单一数据源
State 是只读的
使用纯函数来执行修改
```
Redux提供了如下功能：

```
* 存放应用程序状态的容器
* 一种把 action 分发到状态修改器的机制，也就是 reducer 函数
* 监听状态变化的机制
```

## 其他相关的有用类库

react-loadable: 按需加载组件

