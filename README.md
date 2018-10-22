# text-base-lookup

> 遍历目录获取所有文本类型(或二进制)文件

## 安装

```shell
  npm install text-base-lookup --save
```

## 使用

```ts
import lookup from "text-base-lookup";

const resolve = (...relativePath) => path.resolve(__dirname, '../', ...relativePath);

const patterns = [
  resolve('app/**/*')
];

lookup(patterns).then(({ text, binary }) => {
  console.log(text); // 文本类型文件列表
  console.log(binary); // 二进制文件列表
});
```

## 作者
She Ailun
