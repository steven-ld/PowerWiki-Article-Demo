---
title: Markdown 语法演示
description: PowerWiki 支持的完整 Markdown 语法
author: PowerWiki Team
date: 2026-02-07
tags: [Markdown, 语法]
---

# Markdown 语法演示

PowerWiki 完全支持标准 Markdown 语法，并提供了一些扩展功能。

## 标题

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 文本格式

**粗体文本** 或 __粗体文本__

*斜体文本* 或 _斜体文本_

***粗斜体文本*** 或 ___粗斜体文本___

~~删除线文本~~

`行内代码`

## 列表

### 无序列表

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
    - 子子项目 2.2.1
- 项目 3

### 有序列表

1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
3. 第三项

### 混合列表

- 无序项 1
  1. 有序子项 1.1
  2. 有序子项 1.2
- 无序项 2

## 引用

> 这是一个引用
> 可以跨越多行

> 嵌套引用
> > 第二层引用
> > > 第三层引用

## 代码块

### 无语言标记

```
这是一个普通代码块
没有语言高亮
```

### 带语言标记

```python
def hello_world():
    print("Hello, PowerWiki!")
```

```javascript
function helloWorld() {
    console.log("Hello, PowerWiki!");
}
```

## 链接

[文本链接](https://github.com/steven-ld/PowerWiki)

[带标题的链接](https://github.com/steven-ld/PowerWiki "PowerWiki GitHub")

[相对链接](./代码高亮演示.md)

[锚点链接](#表格)

## 图片

### 本地图片

![PowerWiki Logo](./images/powerwiki-logo.png)

### 网络图片

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

### 带链接的图片

[![PowerWiki](./images/powerwiki-logo.png)](https://github.com/steven-ld/PowerWiki)

## 表格

| 功能 | 说明 | 状态 |
|------|------|------|
| 自动同步 | 从 Git 仓库自动同步 | ✅ |
| 语法高亮 | 100+ 种语言支持 | ✅ |
| 响应式设计 | 多设备适配 | ✅ |
| 自动目录 | 自动生成 TOC | ✅ |
| PDF 支持 | 渲染 PDF 为图片 | ✅ |
| 浏览统计 | 追踪文章浏览 | ✅ |

### 对齐表格

| 左对齐 | 居中 | 右对齐 |
|:------|:----:|-------:|
| 左 | 中 | 右 |
| 左 | 中 | 右 |

## 分隔线

---

***

___

## 脚注

这是一个带脚注的句子[^1]。

另一个脚注[^2]。

[^1]: 这是第一个脚注的内容
[^2]: 这是第二个脚注的内容

## 任务列表

- [x] 完成的任务
- [ ] 未完成的任务
- [x] 另一个完成的任务
- [ ] 另一个未完成的任务

## 转义字符

\*这不是斜体\*

\[这不是链接\]

\`这不是代码\`

## 特殊符号

© ® ™ € £ ¥

## 数学公式

行内公式：$E = mc^2$

块级公式：
$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## HTML 支持

<div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
  <p>PowerWiki 支持嵌入 HTML 代码</p>
  <p style="color: #666;">可以使用 HTML 标签进行更复杂的排版</p>
</div>

## 视频嵌入

### YouTube 视频

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>

### 本地视频

<video width="320" height="240" controls>
  <source src="./videos/demo.mp4" type="video/mp4">
  您的浏览器不支持 HTML5 视频
</video>

## 最佳实践

### 1. 清晰的结构

使用合理的标题层级组织内容，避免跳级。

### 2. 代码示例

提供实际可运行的代码示例，帮助读者理解。

### 3. 表格总结

使用表格总结关键信息，提高可读性。

### 4. 链接引用

使用链接连接相关文档，建立知识网络。

### 5. 图片说明

为图片添加清晰的描述文字。

---

**提示**: PowerWiki 支持所有标准 Markdown 语法，并在此基础上提供了额外的功能支持。
