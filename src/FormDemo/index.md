---
title: hello
---

```tsx
import React from 'react'
import {FormDemo} from '@hzg2003/anydesign'

export default () => {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  
  const JsonData = [
    {
      name: "Name",
      label: "name",
    },
    {
      name: "Age",
      label: "age",
    },
    {
      name: "Address",
      label: "address",
    }
  ]
  return <FormDemo
    OnFinish={async (value)=>{
      console.log(value)
    }}
    request={async () => {
      return data
    }}
    onRequest={async () => {
      return JsonData
    }}/>
}

```
----

# API

**默认值为 - 都为必填项**

| 属性名  | 描述            | 类型                              | 	默认值      |
|------|---------------|---------------------------------|-----------|
| 表单格式 | 异步请求（可用async） | () => Promise<Array<Json_Data>> | -         |
| 表单数据 | 异步请求（可用async） | () => Promise<Array<any>>       | -         |
| 表单提交 | 异步请求（可用async） | (value:any)=>Promise<any>       | undefined |


# Json_data类型
| 属性名   | 描述        | 类型     | 	默认值 |
|-------|-----------|--------|------|
| name  | 列名        | string | -    |
| label | 标签 （输入值名） | string | -    |
