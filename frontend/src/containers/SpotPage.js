import { useParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import { Button, Layout,  theme } from 'antd';
import { useQuery } from '@apollo/client';
import {singleQUERY} from "../graphql"

const { Content } = Layout;
const { Header } = Layout;

const CustomizeHeader = styled(Header)`
    border-radius: 10px;
    margin: 10px;
    overflow: hidden;
    &.ant-layout-header {
      background: white;
      height: 20vh;
      display: flex;
      justify-content: center;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    & span{
      font-weight: 800;
      font-size: 20px;
    }
    & Button{
      border: none;
      box-shadow: none;
      font-size: 10px;
      &:hover{
        transform: scale(1.05);
      }
    }
    & UserOutlined{
      color: red !important;
    }
`;

const PageContent = styled(Content)`
    overflow: hidden;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    border-radius: 10px 10px 0 0;
    margin: 0 10px;
    background: #ffffff;
    
    & Button.toggle_map_btn{
      background: #626262;
      border: none;
      border-color: #e790b3;
      box-shadow: none;
      font-weight: 800;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      font-size: 15px;
      position: absolute;
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


const SpotPage = () => {
    const { id } = useParams()

    const {
        loading, error, data, subscribeToMore,
            } = useQuery(singleQUERY,{
                variables:{
                    Id: String(id)
                },
        })

    // console.log(data.singlespot[0])


    return(
        <>
            {loading ? <p>{id}</p> :
                <>
                    <Layout className="layout" style={{height:"100vh"}}>
                        <CustomizeHeader>
                            <h1 style={{fontSize:"30px"}}>{data.singlespot[0].Name}</h1>
                        </CustomizeHeader>
                        <PageContent>
                            <Descriptions
                                bordered
                                column={{
                                    md: 2,
                                    sm: 1,
                                    xs: 1,
                                  }}
                            >
                                <Descriptions.Item label="Region">{data.singlespot[0].Region}</Descriptions.Item>
                                <Descriptions.Item label="Town">{data.singlespot[0].Town}</Descriptions.Item>
                                <Descriptions.Item label="Opentime">{data.singlespot[0].Opentime}</Descriptions.Item>
                                <Descriptions.Item label="Website">
                                    {data.singlespot[0].Website? 
                                    <a href={data.singlespot[0].Website}>{data.singlespot[0].Name}網站</a>:
                                    <p>QQ 這個景點沒有網站</p>
                                    }
                                </Descriptions.Item>
                                <Descriptions.Item label="Toldescribe">
                                    {data.singlespot[0].Toldescribe}
                                </Descriptions.Item>
                                {/*
                                <Descriptions.Item label="Picture1">
                                    <img src={data.singlespot[0].Picture1}/>
                                </Descriptions.Item>
                                */}
                            </Descriptions>
                        </PageContent>
                    </Layout>
                </>
                }
        </>
    )
}

export default SpotPage