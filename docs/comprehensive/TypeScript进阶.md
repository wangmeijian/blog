通过问题来学习技术是个很好的途径，本文主要解决三个问题：

1. 如何获取对象所有键的联合类型？
2. 如何获取对象所有值的联合类型？
3. 如何快速定义一个复杂对象的类型？

建议结合[TypeScirpt演练场](https://www.typescriptlang.org/zh/play)边看边写

## Part1：如何获取对象所有键的联合类型？

如下例子A，如何配置keyType？

例子A
```ts
type Person = {
  name: string
  age: number
}

// type keyType = ?

const getAttr = (key: keyType) => {
  const person: Person = {
    name: 'Tom',
    age: 12
  }
  return person[key]
}
```
keyType可以简单配置为```"name" | "age"```，但如果把```person```换成```window```呢？```window```的属性实在太多了，不可能一个个列出来吧，此处需要用```keyof```操作符

### keyof 操作符

对一个对象类型使用 ```keyof``` 操作符，返回该对象属性名组成的一个字符串或者数字字面量的联合。

以下两个类型是等价的：
```ts
type keyType = keyof Person

type keyType = "name" | "age"
```
 所以例子A的keyType类型配置为```keyof Person```。
 
 ```ts
type Person = {
  name: string
  age: number
}
type keyType = keyof Person;

const getAttr = (key: keyType) => {
  const person: Person = {
    name: 'Tom',
    age: 12
  }
  return person[key];
}

getAttr('name') // Success
getAttr('address') // Error
 ```

## Part 2：如何获取对象所有值的联合类型？

如下对象，我要拿到的字面量联合类型为 ```'text' | 'image' | 'video'```
```js
type File = {
  1: 'text',
  2: 'image',
  3: 'video',
}
```
仍然利用```keyof```操作符定义类型：

```ts
type FileType = File[keyof File]
```

## Part 3：如何快速定义一个复杂对象的类型？

假设某个表单有默认值如下：

```ts
const jack = {
  name: 'Jack Ma',
  age: 48,
  address: {
    province: '广东',
    city: '深圳',
  },
  phone: 15988888888
}
```
新手可能会手动定义类型：
```ts
type Person = {
  name: string
  age: number
  address: {
    province: string
    city: string
  }
  phone: number
}
```
如果默认值对象更大更复杂，定义类型就很繁琐，其实你只需要这样定义：

```ts
type Person = typeof jack;
```

稍微进阶一点，```jack```对象增加性别属性```gender```

```javascript
const jack = {
  name: 'Jack Ma',
  age: 48,
  // 男 或 女
  gender: '男',
  address: {
    province: '广东',
    city: '深圳',
  },
  phone: 15988888888
}
```

那么```Person```类型应该这么定义

```ts
type Person = typeof jack & {
  gender: '男' | '女'
}
```

### typeof 操作符

Typescript中的typeof，只能对标识符或属性使用，以下示范正确和错误的用法：
```ts
// 正确✅
type T1 = typeof 2022 // number
type T2 = typeof {
  name: 'jack'
} // { name: string }

// 错误❎
const hello = () => 'hello world!';
type T3 = type hello() // Error
```
typeof 不能用在一个函数调用语句上，可以修改为：
```ts
// 正确✅
const hello = () => 'hello world!';
const result = hello();

type T3 = typeof result // string
```


