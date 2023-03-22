import { Card, Avatar, theme, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import { ADDFAV_MUTATION, DELFAV_MUTATION } from "../graphql"
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const { Meta } = Card;
const { useToken } = theme;


const CardList_fav = ({ id, name, img, description = "description", isActions = true, user, refetch }) => {
    const { token } = useToken()
    const [addfavorite] = useMutation(ADDFAV_MUTATION)
    const [delfavorite] = useMutation(DELFAV_MUTATION)
    const navigate = useNavigate();

    refetch({
        Email: user,
    })

    const TospotPage = (e) => {
        console.log(e)
        window.open('/spot/' + e);
    }

    const addf = async () => {
        await delfavorite({
            variables: {
                Email: user,
                Name: name
            }
        })
    }

    return (
        <Card
            className="myowncard"
            cover={
                <div onClick={() => TospotPage(id)} style={{
                    overflow: "hidden",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#626262",
                }}>
                    <img
                        alt="example"
                        src={img}
                        style={{ width: "100%", borderRadius: "8px" }}
                    />
                </div>
            }
            actions={isActions ?
                [<SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
                ]
                :
                []
            }
        >
            <Meta
                title={ 
                    <div>
                        <Tooltip title="我的最愛">
                            <HeartFilled className="Heart" style={{ color: "red" }} onClick={addf} />
                        </Tooltip>
                        {name}
                    </div>
                }
                description={description}
            />
        </Card>
    );
}

export { CardList_fav }