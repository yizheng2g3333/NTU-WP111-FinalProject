import styled from "styled-components"
import {  Card, Col, Row, Layout, Typography, theme } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { PageHeader } from "../components/header/PageHeader";

const { Link } = Typography;
const { Meta } = Card;
const { Content } = Layout;
const { useToken } = theme;

const CustomizeLink = styled(Link)`
    font-size: 20px;
    margin: 10px 0;
`;

const PageContent = styled(Content)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 75vh;
    border-radius: 10px 10px 0 0;
    margin: 0 10px;
    position: relative;
`;

const group_images = [
    require( "./../data/images/Wei.jpg" ),
    require( "./../data/images/Deng.jpg" ),
    require( "./../data/images/Yan.jpg" ),
];


const Developer = () => {
    const { token } = useToken()

    return (
        <Layout>
            <PageHeader pagetitle={"開發團隊"} /> 
            <PageContent>
                <Row 
                    gutter={[36, 36]}
                >
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            style={{ height: "400px" }}
                            cover={
                                <img
                                    style={{ height: "60%" }}
                                    alt="example"
                                    src={ group_images[0] }
                                />
                            }
                        >
                            <Meta
                            title="台大心理四 魏逸豪"
                            description="不務正業的心理人"
                            />
                            <CustomizeLink 
                                href="https://github.com/yizheng2g3333" 
                                target="_blank"
                                style={{ color: token.colorPrimary }}
                            >
                                <GithubOutlined />
                            </CustomizeLink>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            style={{ height: "400px" }}
                            cover={
                            <img
                                style={{ height: "60%" }}
                                alt="example"
                                src={ group_images[1] }
                            />
                            }
                        >
                            <Meta
                            title="台大財金四 鄧德齊"
                            description="不務正業的財金人"
                            />
                            <CustomizeLink 
                                href="" 
                                target="_blank"
                                style={{ color: token.colorPrimary }}
                            >
                                <GithubOutlined />
                            </CustomizeLink>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            style={{ height: "400px" }}
                            cover={
                            <img
                                alt="example"
                                src={ group_images[2] }
                            />
                            }
                        >
                            <Meta
                                title="台大地理四 顏廷龍"
                                description="不務正業的地理人"
                            />
                            <CustomizeLink 
                                href="https://github.com/nolonger891204" 
                                target="_blank"
                                style={{ color: token.colorPrimary }}
                            >
                                <GithubOutlined />
                            </CustomizeLink>
                        </Card>
                    </Col>
                </Row>
            </PageContent>
        </Layout>
    )
}

export default Developer