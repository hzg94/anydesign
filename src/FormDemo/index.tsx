import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Modal, Space, Table} from 'antd'

interface Json_Data {
  /**
   * @param 列名
   * @type string
   * */
  name: string,
  /**
   * @param 标签 （输入值名）
   * @type string
   * */
  label: string,
}

interface TData {
  /**
   * @param 列名
   * @type string
   * */
  title: string
  /**
   * @param react（定位用不用管）（要求不能重复）
   * @type string
   * */
  key: string
  /**
   * @param 值名
   * @type string
   * */
  dataIndex?: string
  /**
   * @param AntDesign form渲染器
   * @type (value: any, record: any, index: number) => React.ReactNode
   * */
  render?: (value: any, record: any, index: number) => React.ReactNode
}

const columns: Array<TData> = [
  //操作列
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: {self: React.Dispatch<React.SetStateAction<boolean>>, SNData: (a:any) => void}) => (
      <Space size="middle">
        <a onClick={() => {
          record.SNData(record)
          record.self(true)
        }}>编辑</a>
      </Space>
    ),
  },
];


interface FormTP {
  /**
   * @param 异步请求（表单格式）
   * @type () => Promise<Array<Json_Data>>
   * @return Array<Json_Data>
   * */
  onRequest: () => Promise<Array<Json_Data>>
  /**
   * @param 异步请求（表单数据）
   * @type () => Promise<Array<any>>
   * @return Array<any>
   * */
  request: () => Promise<Array<any>>
  /**
   * @param 异步请求（表单提交）
   * @type (value:any)=>Promise<any>
   * @return null
   * */
  OnFinish:(value:any)=>Promise<any>|undefined
}

export default (props: FormTP) => {

  let [TData, SetTData] = useState<Array<TData>>()
  let [Open, SetOpen] = useState<boolean>(false)
  let [Data, SetData] = useState<Array<any>>()
  const [form] = Form.useForm()

  const app = (a:any) => {
    form.setFieldValue("Name", "aa")
    a.TData.forEach((data:any)=>{
      form.setFieldValue(data.title, a?.[data.dataIndex])
    })
  }

  useEffect(() => {
    props.onRequest().then(
      (res) => {
        let col: Array<TData> = []
        res.forEach((data) => {
          col.push({
            title: data.name,
            dataIndex: data.label,
            key: data.label
          })
        })
        SetTData(col.concat(columns))
        props.request().then(
          (res) => {
            SetData(res.map((data) => {
              data.self = SetOpen
              data.SNData = app
              data.TData = col
                return data
            }))
          }
        )
      }
    )
  }, [])

  let RenderForm = () => {
    let RenderData = TData?.concat([])
    RenderData?.pop()
    return RenderData?.map((data, index) => {
      return (
        <Form.Item
          name={data.title}
          label={data.key}
          key={index}
          //@ts-ignore
          rules={[{required: true, message: 'Please input the title of collection!'}]}
        >
          <Input/>
        </Form.Item>
      )
    })
  }

  return (
    <>
      <Button
        type={"primary"}
        onClick={()=>{
          SetOpen(true)
          form.resetFields()
        }}
      >新增</Button>
      <Modal title="编辑"
             open={Open}
             onOk={() => {
               form.validateFields().then(
                 (value) => {
                   if(props.OnFinish !== undefined){
                     props.OnFinish(value)?.then(r => {
                       console.log(r)
                     })
                   }
                   SetOpen(false)
                 }
               )
             }}
             onCancel={() => {
               SetOpen(false);
             }}>
        <Form
          layout="vertical"
          name="form_in_modal"
          form={form}
        >
          {RenderForm()}
        </Form>
      </Modal>
      <Table
        columns={TData}
        //@ts-ignore
        dataSource={Data}/>
    </>
  )
}
