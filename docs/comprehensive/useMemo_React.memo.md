# useMemo和React.memo的区别

React日常开发中，有两种方式缓存渲染结果，```useMemo```和```React.memo```，看看他们分别适用于什么场景。

## useMemo

```useMemo```属于```React hook```，```React hook```并不是在所有地方都能使用的，它只能在组件顶层或hook内部调用  

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
```useMemo```返回一个记忆值，只有当它的依赖项改变时，才重新计算返回值

## React.memo

```React.memo```则属于HOC（高阶组件），如果你希望你的组件只有在props变化的情况下，才重新渲染，就可以使用```React.memo```包装你的组件，然后再调用  

```tsx
const MyComponent = React.memo(function MyComponent(props) {
  // 只有props变化，才会重新渲染
});
```

## 举例
只看原理和概念，理解是浅薄的，结合一个最简单的例子就非常容易理解了。

初始状态：父组件```Parent```更新时间戳，子组件```Child```每次都重新渲染，[Demo](https://codepen.io/wangmeijian/pen/YzLeJbN?editors=0011)

用```React.memo```包装```Child```组件，再点击更新时间戳，```Child```不会重新渲染
```tsx
const ChildHOC = React.memo(Child);

<ChildHOC />
```

用useMemo处理，注意：此时没有配置依赖项数组
```tsx
function Child() {
	const renderCount = useRef(0);
	
	return useMemo(() => <div>子组件渲染次数：{renderCount.current++}</div>));
}
```
会发现，```Child```还是会重新渲染，**因为如果没有提供依赖项数组，```useMemo```在每次渲染时都会计算新的值**

那么给```Child```组件加上依赖试试看，[Demo](https://codepen.io/wangmeijian/pen/RwyQqPZ?editors=0011)

此时，只有当```Child```的```props```变化，```Child```才会重新渲染

假如给useMemo配置一个空的依赖项数组，```Child```也不会重新渲染。

## 总结

想让组件只在```props```变化时重新渲染，用```React.memo```

想让组件只在依赖项变化时重新渲染，用```useMemo```
