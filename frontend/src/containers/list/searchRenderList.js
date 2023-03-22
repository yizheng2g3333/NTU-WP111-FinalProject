import "./RenderList.css";
import React, { useEffect, useRef } from "react";
import { Col, Row, Tag } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { SearchCardList  } from "../../components/SearchCardList";
import { MYFAV_QUERY } from '../../graphql';
import { useMutation, useQuery } from "@apollo/client";
import { Loading } from "../../components/Loading";
export const SearchRenderList = ({outcome, user}) => {
    
    const {
        loading, error, data, subscribeToMore, refetch,
    } = useQuery(MYFAV_QUERY, {
        variables: {
            Email: user
        },
    })

    refetch({
        Email: user, 
    })

    const fav = []    
    if (data){data.myFav.Favourites.map((item)=>{
        fav.push(item.Id)
    })}
    // console.log(fav)
    if (loading) return <Loading />;

    return (
        <div className="site-card-wrapper">
            {/* {console.log(outcome)} */}
            <div style={{margin: "5px 0", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{display: "inline", color: "gray", fontSize: "14px"}}>有{outcome.length}筆搜尋結果</div>
                <div>
                    <Tag color="#626262" style={{position:"relative",left:"1%"}}>行政區</Tag>
                    <Tag color="#3e477e" style={{position:"relative",left:"1%"}}>分類</Tag>
                </div>
            </div>
            <Row 
                gutter={[24, 24]}
            >
                {outcome.map((item)=>{
                    if (fav.indexOf(item.Id) == -1){
                        return  <>
                                    <Col xs={24} sm={12} md={8} xxl={6}>
                                        <SearchCardList  id={item.Id} name={item.Name} img={item.Picture1} 
                                            Town={item.Town} tag={item.class_result[0]} user={user} color="gray"
                                            refetch={refetch}
                                        />
                                    </Col>
                                </>
                    } 
                    else{
                        return  <>
                                    <Col xs={24} sm={12} md={8} xxl={6}>
                                        <SearchCardList  id={item.Id} name={item.Name} img={item.Picture1} 
                                            Town={item.Town} tag={item.class_result[0]} user={user} color="red"
                                            refetch={refetch}
                                        />
                                    </Col>
                                </>
                    }
                })}
            </Row>
        </div>
    );
};