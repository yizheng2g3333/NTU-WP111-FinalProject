import styled from 'styled-components';
import { Card, Col, Row, Layout, Button } from 'antd';
import { useQuery } from '@apollo/client';
import { MYFAV_QUERY } from '../graphql/query';
import { PageHeader } from "../components/header/PageHeader";
import { CardList_fav } from "../components/CardList_fav";
import { useState, useEffect } from 'react';
import Penguin from "../data/images/penguin.png";
// import { PageHeader } from "../components/header/PageHeader";

const { Meta } = Card;
const { Header, Content } = Layout;

const PageContent = styled(Content)`
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #ffffff;
    height: 75vh;
    border-radius: 10px 10px 0 0;
    margin: 0 10px;
    position: relative;
`;

const PContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`;

const Favorite = ({user}) => {

    const {
        loading, error, data, subscribeToMore, refetch,
    } = useQuery(MYFAV_QUERY, {
        variables: {
            Email: user
        },
    })

    const fav = []   
    console.log(data) 
    if (data){data.myFav.Favourites.map((item)=>{
        fav.push(item.Id)
    })}
    
    refetch({
        Email: user, 
    })

    return (
        <Layout>
            <PageHeader pagetitle={"我的最愛"} /> 
            <PageContent>
                <Row
                    gutter={[24, 24]}
                >
                    {
                        loading
                            ? <p>Favorites</p>
                            : data?.myFav.Favourites.length != 0 ? 
                            data?.myFav.Favourites.map((item) => {
                                    return (
                                        <Col xs={24} sm={12} md={8} xxl={6}>
                                            <CardList_fav
                                                id={item.Id}
                                                name={item.Name}
                                                img={item.Picture1}
                                                description={item.Toldescribe}
                                                isActions={false}
                                                refetch={refetch}
                                                user={user}
                                            />
                                        </Col>
                                    )
                            })
                            :
                            <PContent>
                                <img src={Penguin} alt="Penguin" />
                                <h1 style={{fontSize:"150%"}}>哎呀，還沒有最愛呢</h1>
                            </PContent>
                    }
                </Row>
            </PageContent>
        </Layout>
    )
}

export default Favorite;