# 四问HTTP缓存，你都了解吗？
缓存是将场景的静态资源保存到本地，当web请求抵达缓存时，如果本地有web请求需要的资源，就从本地读取而不是从服务器再次返回。  
缓存有几大优点：  
* 减少数据传输，降低服务器带宽
* 减少对服务器的请求
* 更快的加载速度

浏览器缓存处理流程图  

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/erweimademimi/20200315140946.png" width="600" />

举例：当浏览器发起一个GET请求去获取图片A，到了缓存这里   

1）判断图片A是否已经有缓存？如果没有，跳到5）  
2）判断图片A缓存是否过期？如果没有过期，跳到6）  
3）将缓存与服务器上的图片A对比，看看是内容是否变化？如果没有变化，更新缓存的过期时间然后跳到5）   
4）从服务器重新获取图片A并复制一份保存到本地缓存   
5）返回给浏览器

### 第一问
第2步，如何判断本地缓存是否过期？   

每个缓存都是有过期时间的，用来标识缓存过期时间的有HTTP Expiress首部（属于HTTP 1.0）和Cache-Control首部（属于HTTP 1.1）。  

Expiress直接标注缓存的过期时间为某个日期的时间错，比如

```Expires: Fri, 1 Mar 2019 07:28:00 GMT```

这是一个绝对时间，晚于这个时间，这个缓存就认为是过期了，这样有个BUG，我把本机时间改到这个过期时间以前，缓存就永远不会过期了。不推荐使用Expiress首部

Cache-Control可以设置过期时长，比如

```Cache-Control: max-age=60```

这是一个相对时间，资源请求过来之后60秒过期

### 第二问
Cache-Control还可以配置成其他值，如  
```bash
Cache-Control: max-age=0
Cache-Control: no-cache
Cache-Control: no-store
```  
乍一看都是不缓存的意思，真是这样吗？区别在哪？

```max-age=0```和```no-cache```表示客户端可以缓存资源，但每次使用缓存之前都必须向服务器校验其有效性，这意味着每次都会发起HTTP请求，但当缓存内容有效时，可以跳过资源的下载，直接读取本地缓存  

而```no-store```表示禁止缓存，每次都要重新从服务器下载资源


### 第三问
缓存过期了，不代表它的内容和原始服务器上的内容一定有变化，因此需要和服务器进行核对，询问资源是否被修改过，这个核对的过程是怎样的？

**If-Modified-Since: Date再验证**

在请求头指定```If-Modified-Since```首部为某个日期，意思是如果资源在指定日期后修改过，就返回新的内容给我，这个Date通常为资源的Last-modified，它在服务器返回资源时附加在Response Headers，Last-modified表示资源的最后修改时间，只要内容有变化，Last-modified一定会变

**If-None-Match: 实体标签（ETag）再验证**

某些文件可能会周期性地重写，但内容不变，这种情况```If-Modified-Since```不再适用，HTTP为了解决这个问题，给资源附加了一个实体标签（ETag），它可能包含了资源的序列号或版本，或者是资源内容的校验及其他指纹信息，资源内容修改的同时，修改ETag  

这两种核对方式本质是一样的，依据资源的某个属性变化来判断缓存是否过期，ETag的方式更严谨  

### 第四问
有了Etag，Last-Modified还有存在的必要吗？

有存在的必要，为了兼容HTTP 1.0和HTTP 1.1  

Last-Modified是HTTP 1.0的产物，ETag是HTTP 1.1的产物，当服务器返回了ETag，HTTP 1.1的客户端必须使用ETag来验证，当服务器只返回了Last-Modified，那就使用Last-Modified验证，如果服务器同时返回了Last-Modified和ETag，客户端应该同时使用这两种再验证方式。  
