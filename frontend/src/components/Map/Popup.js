import { Card, Tooltip } from 'antd';
import React, { useState, useEffect } from "react";
import { CloseOutlined, SmileOutlined, SmileFilled, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import { intersects } from 'ol/extent';
import { MYFAV_QUERY, ADDFAV_MUTATION, DELFAV_MUTATION } from "../../graphql"
import { useQuery, useMutation } from "@apollo/client";

const { Meta } = Card;

const SpotCard = styled(Card)`
    width: 50vh;
    height: 250px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    &:hover{
        transform: scale(1.05);
        transition-duration: 0.3s;
        & #popup_close{
            display: block !important ;
        }
    }
    &>.ant-card-cover{
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        height: 250px;
        &>img{
            width: 100%;
        }
        &::after{
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 100%;
            border-radius: 10px;
            background: linear-gradient(180deg, rgba(242,242,242,0) 0%, rgba(247,247,247,0.05) 30%, rgba(247,247,247,0.1) 35%, rgba(250,250,250,0.7460026246826856) 62%, rgba(252,252,252,0.9476832969515931) 75%, rgba(252,252,252,1) 85%, rgba(255,255,255,1) 100%);
        }
    }

    &>.ant-card-body{
        position: absolute;
        bottom: 0;
    }

    & #popup_close{
        display: block;
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 99;
        border-radius: 50%;
        padding: 5px;
        background: rgba(255, 255, 255, 0.2);
    }

    & .popup_init{
        position: fixed;
        bottom: 15px;
        right: 15px;
        z-index: 99;
        border-radius: 50%;
        padding: 5px;
        font-size: 20px;
        background: rgba(255, 255, 255, 0.2);
        &:hover{
            color: #e790b3 !important;
        }
    }
`;

const Popup = ({ title, description, image, initPlace, setInitPlace, user, step = 0 }) => {
    const [colorful, setColorful] = useState("gray")
    const [addfavorite] = useMutation(ADDFAV_MUTATION)
    const [delfavorite] = useMutation(DELFAV_MUTATION)
    // console.log(user.user.user)
    // console.log(title)

    const {
        loading, error, data, subscribeToMore, refetch,
    } = useQuery(MYFAV_QUERY, {
        variables: {
            Email: user.user.user
        },
    })

    refetch({
        Email: user.user.user 
    })

    useEffect(() => {
        if(data){
            for (var i=0 ; i<data.myFav.Favourites.length ; i++ ){
                if (data.myFav.Favourites[i].Name == title){
                    setColorful("red")
                    break
                }
                setColorful("gray")
            }
        }
    },[title]);

    const initColor = ( initPlace !== title ? "#D3D3D3" : "#e790b3");

    const handleSetInitPlace = () => {
        if (initPlace == title) {
            setInitPlace("");
            return;
        }
        setInitPlace(title);
    };

    const addf = async () => {
        if (colorful=="gray"){
            await addfavorite({
                variables: {
                    Email: user.user.user,
                    Name: title
                }
            })
            setColorful("red")
        }
        else{
            await delfavorite({
                variables: {
                    Email: user.user.user,
                    Name: title
                }
            })
            setColorful("gray")
        }
    }

    console.log(step)
    const popup_description =  step === 0 ? description : step;
    
    return (
        <SpotCard 
            id="popup" 
            cover={
                <img
                    alt="example"
                    src= {image}
                />
            }
        >
        
            <CloseOutlined
                id="popup_close" 
            />
            
            { step === 0 ? 
                <Tooltip placement="top" title={"選擇作為你出發地點"}>
                    <SmileFilled className="popup_init" style={{ color: initColor }} onClick={handleSetInitPlace}/>
                </Tooltip>   :
                "" 
            }        
            <Meta
                title={ 
                    <div>
                        <Tooltip title="我的最愛">
                            <HeartFilled className="Heart" style={{ color: colorful }} onClick={addf} />
                        </Tooltip>
                        {title}
                    </div>
                } 
                description={ popup_description }
            />
        </SpotCard>
    );
};

export { Popup }