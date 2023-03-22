import "./RenderList.css";
import React, { useContext } from "react";
import { useMutation } from '@apollo/client';
import { Col, Row, Card } from 'antd';
import HomePageContext from "../hook/HomepageContext";
import { GET_LINESTRING } from "../../graphql";
import styled from "styled-components";

const { Meta } = Card;

const StepsCard = styled(Card)`
    height: 50vh;
`;

export const RenderList = () => {
    const { steps, setStepsAndGeoJSON, setShowSteps, setDisplayMap, setAllFeactures } = useContext(HomePageContext);
    const name_list = ["深度旅遊", "在地體驗", "旅遊攻略", "好奇心MAX", "超Chill"];
    const [CREATE_JOURNEYLINE] = useMutation(GET_LINESTRING);
    
    const getLine = async (item) => {
        try {
            //console.log(item);
            var coords_set = [];
            for (let i = 0; i< item.length; i++) {
                coords_set.push([parseFloat(item[i]["Px"]), parseFloat(item[i]["Py"])])
            }
            var request_body = JSON.stringify({"geometry":coords_set});
            
            const { data, loading, error } = await CREATE_JOURNEYLINE({
                variables: {
                    data: request_body
                }
            })
            
            const response_geojson = JSON.parse(JSON.parse(data.getLineString.geojson));

            if (!error) {
                setStepsAndGeoJSON([item, response_geojson]);
                setDisplayMap(true);
                setShowSteps(true);
                setAllFeactures(false);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div className="site-card-wrapper">
            <Row 
                gutter={[24, 24]}
            >   
                { steps.map((item, index) => {
                    var description = "";
                    item.map(({ Name }) => {
                        description+=Name;
                        description+=" | ";
                    });

                    return (
                        <Col xs={24} sm={12} md={8}>
                            <Card 
                                key={index}
                                description={description} 
                                onClick={()=>getLine(item)}
                                cover={<img alt="example" src={item[2].Picture1} />}
                            >
                                <Meta title={name_list[index]}  description={description} />
                            </Card>
                        </Col>
                    )
                }) }
            </Row>
        </div>
    );
};