import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Button, Popover, Layout } from 'antd';
import { CloudOutlined } from '@ant-design/icons';
// import { Userbutton } from "./useButton"
const { Header } = Layout;

const CustomizeHeader = styled(Header)`
    border-radius: 10px;
    margin: 10px;
    overflow: hidden;
    &.ant-layout-header {
      background: white;
      height: 20vh;
      line-height: normal;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    & span{
      color: #90b12f;
      font-weight: 800;
      font-size: 20px;
    }
    & Button{
      background: #90b12f;
      border: none;
      border-color: #e790b3;
      box-shadow: none;
      font-size: 10px;
      &:hover{
        background: #e790b3 !important;
        transform: scale(1.05);
      }
    }
    & UserOutlined{
      color: red !important;
    }
`;

const PageHeader = ({ pagetitle }) => {
  const [ content, setContent ] = useState("");

  const CWB_API = async () => {
    const response = await fetch(
      'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-91BC8201-0D2D-423F-870A-1ACCB2094374&locationName=臺北'
    );
    const data = await response.json();
    const locationData = data.records.location[0].weatherElement;
    console.log(locationData)
    locationData.map(({elementName, elementValue})=>{
      if (elementName === "Weather") {
        if (elementValue.includes("陰") || elementValue.includes("雲") || elementValue.includes("陣雨")){
          setContent("太陽躲進雲裡");
        } else if (elementValue.includes("晴")) {
          setContent("黃昏一如既往，曬乾潮濕的船艙");
        } else if (elementValue.includes("雨")){
          setContent("雨下得太急，像一場公路電影");
        } else if (elementValue.includes("霧")) {
          setContent("白露橫江，水光接天");
        } else {
          setContent(":>");
        }
      }
    });
  }

  return (
    <CustomizeHeader>
      {/*<div className="logo" />*/}
      <span>{pagetitle}</span>
      
      <Popover content={content} title="即時天氣" placement="leftTop" onClick={()=>CWB_API()} trigger="click">
          <Button 
              type="primary" 
              shape="circle" icon={<CloudOutlined style={{color: 'white'}}/>} 
              size={30} 
          />
      </Popover>
    </CustomizeHeader>

  );
}

export { PageHeader };