import React, {useEffect, useState} from 'react'

interface MarkDownProps {
  /**
   * @param markdown文本输入
   * @type () => Promise<String>
   * @return null
   */
  text: () => Promise<string>
}

export default (props:MarkDownProps) => {

  let [Text,SetText] = useState<string>()

  useEffect(()=>{
    props.text().then((res)=>{
      SetText("\n"+res)
    })
  },[])

  const randomString = (e: number):string => {
    let t:string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
      a:number = t.length,
      n:string = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
  }

  const TitleParse = (a: string):JSX.Element => {
    let TitleRe:RegExp = /#/g
    let d:number|undefined = a.match(TitleRe)?.length
    let b:string = a.replace(/#/g, "")
    switch (d) {
      case 1:
        return <h1 key={"h1" + randomString(5)}>{b}</h1>
      case 2:
        return <h2 key={"h2" + randomString(5)}>{b}</h2>
      case 3:
        return <h3 key={"h3" + randomString(5)}>{b}</h3>
      case 4:
        return <h4 key={"h4" + randomString(5)}>{b}</h4>
      case 5:
        return <h5 key={"h5" + randomString(5)}>{b}</h5>
      case 6:
        return <h6 key={"h6" + randomString(5)}>{b}</h6>
      default:
        return <h6 key={"h6" + randomString(5)}>{b}</h6>
    }
  }

  const TextParse = (a: string):JSX.Element => {
    return <p key={"p" + randomString(5)}>{a}</p>
  }

  const PicParse = (a: string):JSX.Element => {
    let b:RegExp = /(?<=!\[).*(?=])/g
    let url_r:RegExp = /(?<=\().*(?=\))/g
    let url:string= a.match(url_r)?.[0] as string
    let cc:RegExp = /"/g
    if (cc.test(url)) {
      return <img key={"pic" + randomString(5)}
                  alt={a.match(b)?.[0]}
                  src={url.match(/.*(?= ")/g)?.[0]}
                  title={url.match(/(?<=").*(?=")/g)?.[0]}/>
    } else {
      return <img key={"pic" + randomString(5)} src={url} alt={a.match(b)?.[0]}/>
    }
  }

  const LinkParse = (a: string):JSX.Element => {
    let b:RegExp = /(?<=\[).*(?=])/g
    let url_r:RegExp = /(?<=\().*(?=\))/g
    let url:string = a.match(url_r)?.[0] as string
    let cc:RegExp = /"/g
    if (cc.test(url)) {
      return <a key={"pic" + randomString(5)}
                href={url.match(/.*(?= ")/g)?.[0]}
                title={url.match(/(?<=").*(?=")/g)?.[0]}>{a.match(b)?.[0]}</a>
    } else {
      return <a key={"pic" + randomString(5)} href={url}>{a.match(b)?.[0]}</a>
    }
  }

  const SpecialParse = (a:string):JSX.Element|undefined => {
    let b:RegExp = /\*\*\*/g
    let c:RegExp = /---/g
    let d:RegExp = /___/g
    if(b.test(a)||c.test(a)||d.test(a)){
        return <hr key={"hr"+randomString(5)} style={{border:0,borderTop:"1px solid #eaecef"}} />
    }
  }

  const MarkDownParse = ():Array<JSX.Element|undefined> => {
    let text1:RegExp = /(?<=\n).*/g
    let a: Array<JSX.Element | undefined> = []
    Text?.match(text1)?.forEach((data) => {
      let d = data.trim()
      let Sp = SpecialParse(d)
      if (Sp !== undefined){
        a.push(Sp)
      }else{
        if (d !== "") {
          switch (d.charAt(0)) {
            case '#':
              a.push(TitleParse(d));
              break
            case '!':
              a.push(PicParse(d));
              break
            case '[':
              a.push(LinkParse(d));
              break
            default:
              a.push(TextParse(d))
          }
        }
      }
    })
    return a
  }


  return (
    <div>
      {MarkDownParse()}
    </div>
  )
}
