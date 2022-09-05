# 透过inode来理解硬链接和软链接

## 什么是inode？

每个文件都对应一个唯一的inode，inode用来存储文件的元信息，包括：

* 对应的文件
* 文件字节数
* 文件数据块的位置
* 文件的inode号码
* 文件的硬链接数
* 文件的读写权限
* 文件的时间戳

在Linux系统下，创建一个文件```hello.txt```

```bash
echo 'hello world' -> 'hello.txt'
```

接着使用stat命令查看```hello.txt```的inode信息：

```bash
stat hello.txt
```

```bash
文件：hello.txt
大小：14        	块：8          IO 块：4096   普通文件
设备：fd00h/64768d	Inode：34025713    硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
环境：unconfined_u:object_r:admin_home_t:s0
最近访问：2022-08-18 15:44:56.158501724 +0800
最近更改：2022-08-18 15:44:56.158501724 +0800
最近改动：2022-08-18 15:44:56.158501724 +0800
创建时间：2022-08-18 15:44:56.158501724 +0800
```

## inode和文件名

操作系统使用inode号码来识别文件，而人使用文件名来识别文件

人在打开文件的时候，文件系统实际上是先通过文件名找到对应的inode号码，然后根据inode号码找到文件inode信息，根据inode信息找到文件内容所在的数据块，最后读取数据。

## 硬链接
文件和inode的关系是一对一，而文件名和inode的关系则是一对多，系统允许多个文件名对应一个inode

<img src="/public/inode_relation.png" height="240" />

inode信息中的硬链接（Links）数，就表示当前有几个文件名对应着该inode，换句话说，每个文件名就是文件的一个硬链接

### 增加硬链接
使用ln命令为```hello.txt```生成一个硬链接，格式：```ln 源文件名 硬链接文件名```
```bash
ln hello.txt hello-hard-link.txt
```
再用```stat hello.txt```查看源文件的硬链接数，值从1变为2

### 删除硬链接

```
rm -f hello-hard-link.txt
```
再次查看硬链接数，值从2变为1

当一个文件的硬链接大于1时，删除一个硬链接（也就是文件名），不会影响源文件，只有当硬链接数等于0，系统才会删除源文件



### 修改源文件
修改源文件内容，会影响所有硬链接，因为硬链接都是指向同一个源文件的数据块

## 软链接
软链接也叫符号链接，很好理解，可以理解为window系统里的快捷方式

先创建一个硬链接:
```bash
ln hello.txt hello_hard_link.txt
```

然后，创建一个软链接：
```bash
ln -s hello.txt hello_s.txt
```

此时，文件```hello.txt```有2个硬链接和1个软链接，接下来，删除刚刚用来创建软链接的文件名hello.txt：
```bash
rm -f hello.txt
```
这个时候，打开文件```hello_s.txt```就会报错“No such file or directory”。

刚才只是删除了一个文件名，并没有影响到源文件，但是通过软链接打开文件却报错了，并不是因为源文件不存在了，而是因为软链接指向的硬链接被删除了。

这就是软链接和硬链接的区别，软链接指向的是文件名（也就是硬链接），硬链接指向的是文件的inode号码。

<img src="/public/ln.png" height="240" />

