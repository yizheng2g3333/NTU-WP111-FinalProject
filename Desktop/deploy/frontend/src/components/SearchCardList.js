import { Card, Avatar, Tag, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartFilled  } from '@ant-design/icons';
import Rice from "./png/TpMapIcon.png";
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import { ADDFAV_MUTATION, DELFAV_MUTATION} from "../graphql"
import { useMutation } from "@apollo/client";

const { Meta } = Card;

const SearchCardList  = ( { id, name, img, Town, tag, user, color, refetch } ) => {
    const [colorful, setColorful] = useState(color)
    const [addfavorite] = useMutation(ADDFAV_MUTATION)
    const [delfavorite] = useMutation(DELFAV_MUTATION)
    const navigate = useNavigate();

    refetch({
        Email: user, 
    })

    const ToSpot = (e) => {
        window.open('/spot/' + e);
    }

    const addf = async () => {
        if (colorful=="gray"){
            await addfavorite({
                variables: {
                    Email: user,
                    Name: name
                }
            })
            setColorful("red")
        }
        else{
            await delfavorite({
                variables: {
                    Email: user,
                    Name: name
                }
            })
            setColorful("gray")
        }
    }

    return (
        <Card
            className="myowncard"
            cover={
                <div onClick={()=>ToSpot(id)} style={{ 
                    overflow: "hidden", 
                    height: "200px", 
                    display: "flex", 
                    justifyContent: "center",
                    backgroundColor: "#626262", 
                }}>
                <img
                        alt="example"
                        src= { img }
                        style={{ width: "100%", borderRadius: "8px" }}
                />
                </div>
            }
            actions={[
                // <SettingOutlined key="setting" />,
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            {/* {console.log(Opentime)} */}
            <Meta
                title= { 
                    <div>
                        <Tooltip title="我的最愛">
                            <HeartFilled className="Heart" style={{ color: colorful }} onClick={addf} />
                        </Tooltip>
                        {name}
                    </div>
                }
                description={
                    tag==undefined? console.log("a"):
                    <>
                        <Tag color="#626262">{Town}</Tag>
                        <Tag color="#3e477e">{tag.first}</Tag>
                        {tag.second=="" ? tag.second : <Tag color="#3e477e">{tag.second}</Tag>}
                        {tag.third=="" ? tag.third : <Tag color="#3e477e">{tag.third}</Tag>}
                    </>
                }
            />
        </Card>
    );
}

export { SearchCardList }