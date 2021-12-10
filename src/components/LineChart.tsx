import {Line} from '@ant-design/charts';
import React, { useState, useEffect } from 'react';

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data,
    xField: "Date",
    yField: "scales",

    color: "#EAAA00",
    point: {
      shape: "circle",
      size: 4
    },
    smooth: true,
  }

  return <Line {...config}/>
}

export default LineChart