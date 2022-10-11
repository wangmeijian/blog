# 我是如何修复一个Ant Design 的Bug的？

我在工作中大量使用Ant Design，它为我省去了很多重复劳动，所以有空的时候，我也会为Ant Design做一些微小的贡献。

本文详细描述了我处理一个Ant Design的Bug全过程，文章内容较多但难度并不高，新手同学看完也可以尝试为Ant Design添砖加瓦！

## 第一步、选择要修复的Bug

Ant Design有不少Bug，你可以直接访问它的[Issues](https://github.com/ant-design/ant-design/issues)，挑一个简单的问题尝试解决，需要注意的是，并不是所以Issue都是Bug，经过管理员确认过的Bug一般会打上Bug的标记。

这次我处理的问题是[#37165](https://github.com/ant-design/ant-design/issues/37165)。

## 第二步、准备工作

[Fork ant-design仓库](https://github.com/ant-design/ant-design/fork)到自己的Github，回到自己的Github，将刚刚Fork的仓库克隆到本地，然后基于master分支新建一个bugfix分支，然后安装依赖，启动项目之后，就可以在浏览器访问本地启动的Ant Design官网上的任一Demo，方便调试。

```bash
npm install && npm run start
```

## 第三步、问题排查
回到问题[#37165](https://github.com/ant-design/ant-design/issues/37165)，它的表现是：**一个DatePicker，一个Input, 用户选择Input的内容进行复制时经常会滑到DatePicker，会触发日历控件输入框的focus事件**，这种操作是比较常见的，问题简化完了就是：只要在日历控件上触发mouseUp就会打开日历控件选择面板。

查看官网Demo发现确实存在这个问题，后续可以直接用本地官网的Demo调试，不需要额外写Demo。

第一反应是日历控件的输入框绑定了onMouseUp事件，查看对应的日历组件```DatePicker```源码，定位到文件```ant-design/components/date-picker/generatePicker/generateSinglePicker.tsx```第121~156行（基于antd@4.23.4版本，不同版本行数可能不同）：

```jsx
import RCPicker from 'rc-picker';

// 中间代码省略……

<RCPicker<DateType>
  ref={innerRef}
  placeholder={getPlaceholder(mergedPicker, locale, placeholder)}
  suffixIcon={suffixNode}
  dropdownAlign={transPlacement2DropdownAlign(direction, placement)}
  dropdownClassName={popupClassName || dropdownClassName}
  clearIcon={<CloseCircleFilled />}
  prevIcon={<span className={`${prefixCls}-prev-icon`} />}
  nextIcon={<span className={`${prefixCls}-next-icon`} />}
  superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
  superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
  allowClear
  transitionName={`${rootPrefixCls}-slide-up`}
  {...additionalProps}
  {...restProps}
  {...additionalOverrideProps}
  locale={locale!.lang}
  className={classNames(
    {
      [`${prefixCls}-${mergedSize}`]: mergedSize,
      [`${prefixCls}-borderless`]: !bordered,
    },
    getStatusClassNames(
      prefixCls as string,
      getMergedStatus(contextStatus, customStatus),
      hasFeedback,
    ),
    className,
  )}
  prefixCls={prefixCls}
  getPopupContainer={customizeGetPopupContainer || getPopupContainer}
  generateConfig={generateConfig}
  components={Components}
  direction={direction}
  disabled={mergedDisabled}
/>
```
以上源码没有传入onMouseUp，将解构赋值prop的```{...restProps}```注释掉，查看本地官网Demo，问题依然存在，说明这里面也没有传onMouseUp。

接下来继续深入RCPicker组件，rc-picker是react-components组件库中的日历组件，Ant Design大部分组件都是在react-components基础上封装的。

查看[rc-picker源码](https://github.dev/react-component/picker)，rc-picker默认导出的是Picker组件，定位到```picker/src/Picker.tsx```，搜索onMouseUp，发现在日历控件输入框的父级div绑定了onMouseUp事件，对应的回调函数是287行（基于rc-picker@2.6.10）的onInternalMouseUp：

```jsx
// 输入框父级元素 L530~L555
<div
  ref={containerRef}
  className={classNames(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-focused`]: focused,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  })}
  style={style}
  onMouseDown={onMouseDown}
  // 看这里
  onMouseUp={onInternalMouseUp}
  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}
  onContextMenu={onContextMenu}
  // 顺便关注一下这里，后文会说
  onClick={onClick}
>
  <div
    className={classNames(`${prefixCls}-input`, {
      [`${prefixCls}-input-placeholder`]: !!hoverValue,
    })}
    ref={inputDivRef}
  >
    {inputNode}
    {suffixNode}
    {clearNode}
  </div>
</div>

// onMouseUp回调 L287~L296
const onInternalMouseUp: React.MouseEventHandler<HTMLDivElement> = (...args) => {
  if (onMouseUp) {
    onMouseUp(...args);
  }
  // 问题就在这里
  if (inputRef.current) {
    inputRef.current.focus();
    triggerOpen(true);
  }
};
```
就在onMouseUp回调函数中，除了触发onMouseUp，还触发了输入框的focus事件！

```js
if (inputRef.current) {
  inputRef.current.focus();
  triggerOpen(true);
}
```

此时，应该弄清楚当时为什么要写这几行代码，最好的途径就是看看当时的commit message，为了方便后续调试，还是将代码克隆到本地：先Fork rc-picker仓库，新建分支，安装依赖，启动项目。

PS：VSCode安装GitLens插件，即可查看每一行代码的commit记录

查看这几行代码对应的[commit](https://github.com/ant-design/ant-design/issues/21149)，原来是为了解决Ant Design的日历控件点击输入框右侧的icon没有弹出日历面板的问题。

知道它的作用了，已经成功了一半！看看要怎么修复？

## 第四步、问题修复

到这一步，建议先到对应的Issue下面留言说明正在处理中，省的其他开发者做重复劳动。

接着，要解决2个问题：

1. 点击日历控件输入框右侧的icon需要打开日历面板
2. 不要用mouseUp事件来打开，想想其它实现方式

答案显而易见了，那就是改成在onClick里触发，因为icon节点同样被输入框的父级包裹，icon的click事件必然会冒泡到父级，从而触发父级的onClick。

查看以上源码发现，输入框的父级已经有一个onClick事件，只需要将以上的4行代码挪到onClick的回调即可，具体修改点击[这里](https://github.com/react-component/picker/pull/490/files#diff-bb3a22d33f64a888c413a1984f1ecf232163cca78334ccf4a7f823e241fbd0ab)查看

修改完成，查看本地Demo，问题已经解决了，胜利在望！

## 第五步、单元测试

原来的[commit](https://github.com/ant-design/ant-design/issues/21149)写了对应的单元测试，我们修改了它的实现，同时也需要修改对应的单元测试：

```tsx
// picker/tests/picker.spec.tsx L620~631
it('Picker should open when click inside', () => {
  const onClick = jest.fn();
  const wrapper = mount(<MomentPicker onClick={onClick} />);
  const inputElement = wrapper.find('input').instance() as any as HTMLInputElement;
  inputElement.focus = jest.fn();

  wrapper.find('.rc-picker').simulate('click');
  expect(inputElement.focus).toHaveBeenCalled();
  expect(wrapper.isOpen()).toBeTruthy();

  expect(onClick).toHaveBeenCalled();
});
```
修改完成之后，完整地跑一遍单元测试：

```bash
npm run test
```
确保所有单元测试都通过
```bash
Test Suites: 8 passed, 8 total
Tests:       294 passed, 294 total
Snapshots:   11 passed, 11 total
Time:        15.643s
```
代码部分到这里就算圆满完成了！  
## 第六步、提交Pull Request

这一步，是本文最简单的一步了！

提交代码，push到远程仓库，打开仓库页面，会看到页面上出现了一个【compare & pull request】的入口，点击即可向Ant Design创建pull request，输入你修复的Issue链接（这个很重要，到时候Issue页面会自动关联你的此次的pull request）和修复思路或理由，方便管理员review。

最后，等待管理员review，没问题的话管理员会合并分支，然后发布新版本，代码最终会应用到数十万项目中，Bug修复大功告成！

## 总结
最后，总结一下，第一次提交PR，建议选择简单的Issue，重要的是先将整个流程熟悉一遍，不要一开始就挑战复杂的问题，如果花了很长时间却解决不了问题，自信心受挫，可能就不想继续下去了。

说了这么多，点个star支持一下吧