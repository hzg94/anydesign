---
title: Markown
---



```tsx
import React from 'react'
import {Md} from '@hzg2003/anydesign'

const text = `## app
             1222
             ____
             # app
             1222
             ---
             [aaa](https://www.baidu.com "app")
             ![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png "app")
 `

export default ()=>{
    return (<Md text={async ()=>{
        return text
    }}/>)
}

```

