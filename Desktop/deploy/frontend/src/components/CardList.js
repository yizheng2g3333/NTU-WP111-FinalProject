
import { Card, Avatar, theme, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import { ADDFAV_MUTATION, DELFAV_MUTATION } from "../graphql"
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import SpotPageModal from '../containers/SpotPageModal';

const { Meta } = Card;
const { useToken } = theme;


const CardList = ({ id, name, img, description = "description", isActions = true, user, color, refetch }) => {
    const [colorful, setColorful] = useState(color)
    const { token } = useToken()
    const [addfavorite] = useMutation(ADDFAV_MUTATION)
    const [delfavorite] = useMutation(DELFAV_MUTATION)
    const navigate = useNavigate();
    //const [isModalOpen, setIsModalOpen] = useState(false);

    const TospotPage = (e) => {
        // console.log(e)
        window.open('/spot/' + e);
        //setIsModalOpen(true)
    }

    const addf = async () => {
        // console.log(id)
        if (colorful == "gray") {
            await addfavorite({
                variables: {
                    Email: user,
                    Name: name
                }
            })
            setColorful("red")
            // console.log(colorful)
        }
        else {
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
                            <HeartFilled className="Heart" style={{ color: colorful }} onClick={addf} />
                        </Tooltip>
                        {name}
                    </div>
                }
                description={description}
            />
            {/*<SpotPageModal open={isModalOpen} id={id}/>*/}
        </Card>
    );
}

export { CardList }