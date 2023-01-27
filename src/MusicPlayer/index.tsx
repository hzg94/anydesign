import { notification, Slider } from 'antd';
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
          <button
            type={'button'}
            onClick={() => {
              Music?.play();
              SetDuration(Music?.duration());
              console.log(1);
            }}
          >
            play
          </button>
        </div>
      </div>
    </>
  );
};
