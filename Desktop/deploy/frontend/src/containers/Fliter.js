// import images1 from '../containers/png/national-park.png';
// import images2 from '../containers/png/museum.png';
// import images3 from '../containers/png/rice-bowl.png';
// import images4 from '../containers/png/hot-springs.png';
// import images5 from '../containers/png/cow.png';
// import images6 from '../containers/png/cycling-road.png';

// const images = [images1,images2,images3,images4,images5,images6]

// const Fliter = ({item,barOnChange,value,describe,index}) => {
//     return  (<div className='controlCol'>
//                 <h1 className='controlTitle'>
//                     {item}
//                     <img src={images[index]} style={{width:"7%",position:"relative",top:"5px",left:"10px"}}/>
//                 </h1>
//                 <p>
//                     {describe}
//                 </p>
//                 <input id={index} type ='range' step='1' min = '0' max = '100' defaultValue={50} onChange={barOnChange}/> 
//                 <p className='controlNum'>{value}</p>
//             </div>
//             )
// }

// export default Fliter;


import images1 from '../containers/png/national-park.png';
import images2 from '../containers/png/museum.png';
import images3 from '../containers/png/rice-bowl.png';
import images4 from '../containers/png/hot-springs.png';
import images5 from '../containers/png/cow.png';
import images6 from '../containers/png/cycling-road.png';


import React, { useState } from 'react';
import { Card, Slider, Form, Tooltip, Button } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import styled from 'styled-components';
// import { MdEco, MdOutlineGridGoldenratio, MdOutlineBathtub, MdOutlineRamenDining, MdNordicWalking ,MdPool } from "react-icons/md";

const images = [images1,images2,images3,images4,images5,images6]

// const icon = [<MdEco/>, <MdOutlineGridGoldenratio />, <MdOutlineRamenDining />, <MdOutlineBathtub />, <MdNordicWalking />, <MdPool />];
const CardTitle = styled.div`
    font-size: 16px;
    font-weight: 800;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    & svg{
        margin: 0 5px;
    }
`;

const Fliter = ({ item, barOnChange, value, describe, index}) => {
    const mid = Number(((100 - 0) / 2).toFixed(5));
    const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
    const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';

    return (
        <Card>
            <CardTitle>
                {item}
                <Tooltip placement="topLeft" title={describe}>
                    {/*<img src={images[index]} style={{width:"10%",position:"relative",left:"3%"}}/>*/}
                </Tooltip>
            </CardTitle>
            <div className="icon-wrapper">
                <FrownOutlined className={preColorCls} />
                <Form.Item name={index}>
                    <Slider id={index} value={value} onChange={barOnChange} />
                </Form.Item>
                <SmileOutlined className={nextColorCls} />
            </div>
        </Card>
    )
}

export default Fliter;