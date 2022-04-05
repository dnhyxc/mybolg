---
title: selection
date: 2022-04-05 18:47:12
toc: true
tags:
  - html5
  - selection
categories:
  - DOM API
  - 文本选择
---

### Selection API

#### Selection 概述

Selection 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的 Selection 对象，需要调用 **window.getSelection()** 获取 Selection 对象。

#### Selection 所包含术语介绍

anchor（锚点) 指的是一个选区的起始点（不同于 HTML 中的锚点链接，译者注）。当我们使用鼠标框选一个区域的时候，锚点就是我们鼠标按下瞬间的那个点。在用户拖动鼠标时，锚点是不会变的。

focus（焦点）指向用户结束选择的地方，当您用鼠标框选一个选区的时候，焦点是你的鼠标松开瞬间所记录的那个点。随着用户拖动鼠标，焦点的位置会随着改变。

range（范围）指的是文档中连续的一部分。一个范围包括整个节点，也可以包含节点的一部分，例如文本节点的一部分。用户通常下只能选择一个范围，但是有的时候用户也有可能选择多个范围（例如当用户按下 Control 按键并框选多个区域时，Chrome 中禁止了这个操作，译者注）。“范围”会被作为 Range 对象返回。Range 对象也能通过 DOM 创建、增加、删减。

#### Selection 属性说明

**anchorNode**：只读属性，返回该选区起点所在的节点（Node）。

**anchorOffset**：只读属性，返回一个数字，其表示的是选区起点在 anchorNode 中的位置偏移量。

- 如果 anchorNode 是文本节点，那么返回的就是从该文字节点的第一个字开始，直到**被选中的第一个字**之间的字数（如果第一个字就被选中，那么偏移量为零）。

- 如果 anchorNode 是一个元素，那么返回的就是在选区第一个节点之前的同级节点总数。(这些节点都是 anchorNode 的子节点)。

**focusNode**：只读属性，返回该选区终点所在的节点。

**focusOffset**：只读属性，返回一个数字，其表示的是选区终点在 focusNode 中的位置偏移量。

- 如果 focusNode 是文本节点，那么选区末尾未被选中的第一个字，在该文字节点中是第几个字（从 0 开始计），就返回它。

- 如果 focusNode 是一个元素，那么返回的就是在选区末尾之后第一个节点之前的同级节点总数。

**isCollapsed**：只读属性，返回一个布尔值，用于判断选区的起始点和终点是否在同一个位置。

**rangeCount**：只读属性，返回该选区所包含的连续范围的数量。

#### Selection 方法

**getRangeAt**：返回选区包含的指定区域（Range）的引用，语法如下：

```js
const range = sel.getRangeAt(index);
```

- range：将返回 range 对象。

- index：该参数指定需要被处理的子集编号（从零开始计数）。如果该数值被错误的赋予了大于或等于 rangeCount 结果的数字，将会产生错误。

具体使用如下：

```js
let ranges = [];

sel = window.getSelection();

for (var i = 0; i < sel.rangeCount; i++) {
  ranges[i] = sel.getRangeAt(i);
}
/*
 * 在 ranges 数组的每一个元素都是一个 range 对象，
 * 对象的内容是当前选区中的一个。
 */
```

**addRange**：向选区（Selection）中添加一个区域（Range）。语法如下：

```js
sel.addRange(range);
```

- range：一个区域（Range）对象将被增加到选区（Selection）当中。

基本使用示例如下：

```js
/* 在一个HTML文档中选中所有加粗的文本。 */
const strongs = document.getElementsByTagName("strong");
const s = window.getSelection();

if (s.rangeCount > 0) s.removeAllRanges();

for (let i = 0; i < strongs.length; i++) {
  const range = document.createRange();
  range.selectNode(strongs[i]);
  s.addRange(range);
}
```
