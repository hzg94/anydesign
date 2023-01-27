import {
  CaretRightOutlined,
  DeleteOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import { Button, Empty, List, notification, Slider } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { Howl } from 'howler';
import React, { useEffect, useState } from 'react';

const time = (Date: number): number => parseInt(String(Date / 60));

export default () => {
  let [Music, SetMusic] = useState<Howl>();

  let [Load, SetLoad] = useState(0);

  let [Duration, SetDuration] = useState(0);

  let [Seek, SetSeek] = useState(0);

  useEffect(() => {
    let a = new Howl({
      src: ['http://api.ykwbai.fun/ccc.m4a'],
      preload: true,
    });
    SetMusic(a);
    let LrcArray: Array<any>;
    axios
      .get('http://api.ykwbai.fun/ccc.lrc')
      .then((res: AxiosResponse<string>) => {
        LrcArray = res.data.split('\n').map((text) => {
          return {
            mm: parseInt(text.substring(1, 3)),
            ss: parseInt(text.substring(4, 6)),
            lrc: text.split(']')[1],
          };
        });
      });
    setInterval(() => {
      SetSeek(a.seek());
      SetLoad((a.seek() / a.duration()) * 100);
      LrcArray.forEach((x) => {
        if (
          x.mm === time(a.seek()) &&
          x.ss === parseInt(String(a.seek() - time(a.seek()) * 60)) &&
          x.lrc !== '' &&
          a.playing()
        ) {
          console.log(x.lrc);
          notification.open({
            message: x.lrc,
          });
        }
      });
    }, 1000);
  }, []);

  const PlayToggle = () => {
    if (Music?.playing()) {
      Music?.stop();
    } else {
      Music?.play();
      //@ts-ignore
      SetDuration(Music?.duration());
    }
  };

  const PlayButton = () => {
    if (Music?.playing()) {
      return (
        <Button
          onClick={PlayToggle}
          type="primary"
          shape="circle"
          icon={<PauseOutlined />}
        />
      );
    } else {
      return (
        <Button
          onClick={PlayToggle}
          type="primary"
          shape="circle"
          icon={<CaretRightOutlined />}
        />
      );
    }
  };

  const [data, SetData] = useState([
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]);

  return (
    <>
      <div>
        <div>
          <img
            alt={'封面'}
            width={100}
            height={100}
            src={'http://api.ykwbai.fun/ccc.jpg'}
          />
          <p>
            {time(Seek)}:{parseInt(String(Seek - time(Seek) * 60))}/
            {time(Duration)}:{parseInt(String(Duration - time(Duration) * 60))}
          </p>
          <Slider
            tooltip={{ formatter: null }}
            onChange={(value) => {
              Music?.seek((value / 100) * Duration);
              SetLoad(value);
            }}
            value={Load}
            disabled={false}
          />
          {PlayButton()}
        </div>
        <List
          bordered
          style={{ height: '100px', overflowY: 'scroll' }}
          dataSource={data}
          locale={{ emptyText: <Empty description={'这里没有东西'} /> }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <DeleteOutlined
                  key={'1'}
                  onClick={() => {
                    let temp = structuredClone(data);
                    temp.splice(temp.indexOf(item), 1);
                    SetData(temp);
                  }}
                />,
              ]}
            >
              {item}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
