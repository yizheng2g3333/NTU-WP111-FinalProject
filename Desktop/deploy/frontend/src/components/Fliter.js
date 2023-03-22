import React from 'react';
import { Card, Slider, Form, Tooltip } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import styled from 'styled-components';
// import { MdEco, MdOutlineGridGoldenratio, MdOutlineBathtub, MdOutlineRamenDining, MdNordicWalking ,MdPool } from "react-icons/md";
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
                <Tooltip placement="top" title={describe}>
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