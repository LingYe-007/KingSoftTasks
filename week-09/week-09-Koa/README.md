## Note

#### 2021 7月7日

> 哟哟,今天写着Note,昨天学了Node,还看完了Webpack,感觉自己像个geek~

昨天因为mongo只用了解增删查改,之前有用过就没复习。主要是看自己买的书,阿里居玉皓写webpack调优与进阶,终于看完了,有几点我觉得收获比较深：

- webpack的基本概念。什么chunk,bundle,loader,plugin,WDS,万物皆模块这些就是老生常谈了。热模块刷新倒是一个对我来说不太了解的概念,它实际上是WDS对网页有了一个websocket的长连接,然后你编译后通过chunk的hash值来对比是否刷新,比较关键的是它用了HMR技术来实现局部刷新。
- 对于软件工程来说,好的优化方案不是说上来就构建,而是项目达到一定规模后再针对性的去优化。
- 一些优化方案。这里就说一下大体思路吧。
  - 去除死代码。其实我觉得common.js之所以要被淘汰是因为他是动态的,无法对语言进行静态分析,而ES6 module则是静态的。同时common.js是只是对之前值的一个copy,而ES module则是映射。而对于webpack来说,打包去除没用到的代码就要用到tree-shaking（个人感觉听起来还是比较好用的）
  - 利用缓存,这个就不说了,common.js它会使用之前的缓存,如果你不刷新的话。同时就是如果能使用缓存就使用缓存,如果你想新发布一个东西,同时让所有用户都不使用之前的缓存,可以直接改变你的资源连接,或是利用chunk的hash值进行版本更新。
  - 打包范围.什么vendor,exclude,include,代码分片后提取公共部分,noprase,IgnorePrase之类的。
  - 资源压缩

然后就再看朴灵写的深入浅出Node.js，目前收获:

- Node的一些运行规则,和Node的背景
- common.JS的一些规范。
- NPM包的详细由来与使用方法

就这么多啦

#### 2021 7月8日

> 不要想着一蹴而就,要脚踏实地

昨天早上看了会<深入浅出Node.js>,发现自己一旦涉及到操作系统或是C/C++时就看不懂了,还是自己段位不够吧。准备先读iting5的<狼书>，这本好像简单一点。而计算机网络,我觉得还是有一个大体的印象后再去读书会好很多。所以准备看看mooc上的课程。下周之类看完吧。

工作这边就,昨天布置了任务,然后写了几个小时,完成了album的编写吧。不过mongoDB好像连接出了问题。准备今天把这个任务完成。感觉难度并不是很大。

早点写完！不写完就加班！早点下ban

#### 2021 7月9日

> 加油吧，伍勋高

今天一天就在写老师的任务,只是还没有写完,食言了...主要是我爸妈来看我了,不然一定加班了。

下午领了甜点后好像就开始摸鱼了....一直在看掘金。

周末一定要写完呀...