import './css/HomePage.css';
import React, { useState } from 'react';
import { Layout,  theme } from 'antd';
import styled from 'styled-components';
import { PageHeader } from "../components/header/PageHeader";
import { RenderMap } from './RenderMap';
import { RenderList } from './list/RenderList';
import HomePageContext from './hook/HomepageContext';
// import { journey_QUERY } from '../graphql/query';

const { Content } = Layout;

const PageContent = styled(Content)`
    overflow: hidden;
    border-radius: 10px 10px 0 0;
    margin: 0 10px;
    background: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & button.toggle_map_btn.ant-btn{
      background: #626262;
      border: none;
      border-color: #e790b3;
      box-shadow: none;
      font-weight: 800;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      font-size: 15px;
      position: absolute !important;
      z-index: 99;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom : 10vh;
      width: fit-content !important;
      &:hover{
        background: #e790b3 !important;
        transform: scale(1.05);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      }
      & span {
        margin: 0 3px;
      }
    }
`;

const HomePage = (user) => {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [ displayMap, setDisplayMap ] = useState(true);//Is map on display
  const [ steps, setSteps ] = useState([]);
  const [ stepsAndGeoJSON, setStepsAndGeoJSON ] = useState([[],[]]);
  // layer control
  const [ showSteps, setShowSteps ] = useState(false);
  const [ showAllFeactures, setAllFeactures ] = useState(true);
  
  const RenderElement = displayMap ? <RenderMap user={user} /> : <RenderList />;

  return (
    <Layout className="layout" style={{height:"100vh"}}>
      <PageHeader pagetitle={"TAIPEI ROUTER"} /> 
      <HomePageContext.Provider value={{ 
        setDisplayMap,
        steps,
        setSteps,
        stepsAndGeoJSON,
        setStepsAndGeoJSON,
        showSteps,
        setShowSteps,
        showAllFeactures,
        setAllFeactures
      }}>
        <PageContent>
          { RenderElement }
        </PageContent>
      </HomePageContext.Provider>
    </Layout>
  );
};

export default HomePage;