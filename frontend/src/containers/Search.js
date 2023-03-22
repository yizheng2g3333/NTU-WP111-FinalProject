import {search_QUERY} from "../graphql"
import { useMutation } from "@apollo/client";
import { Input, Select, Button, Layout} from 'antd';
import { useState, useEffect } from "react";
import styled from 'styled-components';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { SearchRenderList } from './list/searchRenderList';
import { Loading } from "../components/Loading";
import CHeader from "./CHeader"
import { useQuery } from '@apollo/client';
import { MYFAV_QUERY } from '../graphql';

const { Content } = Layout;
const { Header } = Layout;


const PageContent = styled(Content)`
    border-radius: 10px 10px 0 0;
    margin: 0 10px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
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

const options = [];
const area = ["所有","北投區","士林區","內湖區","松山區","中山區","大同區",
                "南港區","文山區","信義區","大安區","中正區","萬華區"]

for (let i = 0; i < area.length; i++) {
    options.push({
      label: area[i],
      value: area[i],
    });
  }

const SearchPage = ({user}) => {
    const [result,setResult] = useState()
    const [search,{loading}] = useMutation(search_QUERY)
    const [area,setArea] = useState("大安區")
    const [outcome,setOutcome] =useState([])

    const handleChange = (value) => {
        setArea(value);
    };

    const onChange = (e) => {
        setResult(e.target.value);
    };

    const {
        error, data, subscribeToMore, refetch,
    } = useQuery(MYFAV_QUERY, {
        variables: {
            Email: user
        },
    })

    // console.log(data) 
    refetch({
        Email: user, 
    })

    const sumbit = async () => {
        console.log(result)
        console.log(area)
        const {data} = await search({
            variables:{
                Name: result,
                Town: area
            }
        })
        setOutcome(data.search)
    }

    useEffect(() => {
        sumbit()
    },[]); 


    return (
        <>
            <Layout className="layout" style={{height:"100vh"}}>
                <CHeader sumbit={sumbit} onChange={onChange} handleChange={handleChange} options={options}>
                </CHeader>
                <PageContent>
                    {loading ? <Loading />: <SearchRenderList outcome={outcome} user={user}/>}
                </PageContent>
            </Layout>
        </>
    )
}

export default SearchPage