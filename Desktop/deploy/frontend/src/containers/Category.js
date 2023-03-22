import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Card, Col, Row, Layout } from 'antd';
import { QUERY } from '../graphql/query';
import { PageHeader } from "../components/header/PageHeader";
import { CardList } from "../components/CardList";
import { MYFAV_QUERY } from '../graphql';
import { useMutation, useQuery } from "@apollo/client";
import { Loading } from '../components/Loading';

const { Meta } = Card;
const { Content } = Layout;

const PageContent = styled(Content)`
    overflow: hidden;
    border-radius: 10px 10px 0 0;
    margin: 0 10px;
    background: #ffffff;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const every_cate = ["文化類", "生態類", "古蹟類", "廟宇類", "藝術類", '小吃／特產', "國家公園類",
    "國家風景類", "休閒農業類", '溫泉類', "自然風景類", "遊憩類", "體育場所", "觀光工廠類",
    "都會公園類", "森林遊樂類", "林場類", "其他"]

const Category = ({ user }) => {
    // const [value,setValue] = useState([])
    const { id } = useParams()

    const { loading, error, data, subscribeToMore, refetch } = useQuery(MYFAV_QUERY, {
        variables: {
            Email: user
        },
    })

    const data1 = useQuery(QUERY, {
        variables: {
            Class1: String(id)
        },
    })

    const fav = []
    if (data) {
        data.myFav.Favourites.map((item) => {
            fav.push(item.Id)
        })
    }

    refetch({
        Email: user,
    })

    return (
        <Layout>
            {/* <Header style={{
                background: "none",
                backgroundColor: "rgba(255. 255, 255, 0)",
                marginBottom: "5px",
            }}/> */}
            <PageHeader pagetitle={"景點分類：" + every_cate[id - 1]} />
            <PageContent>
                {
                    loading
                        ? <p>Favorites</p>
                        : data1.loading ? <Loading /> : (
                        <div className="site-card-wrapper">
                            <Row
                                gutter={[24, 24]}
                            >
                                { 
                                    data1.data.spot.map((item) => {
                                    if (fav.indexOf(item.Id) == -1) {
                                        return (
                                            <Col xs={24} sm={12} md={8} xxl={6}>
                                                <CardList
                                                    key={item.Id}
                                                    user={user}
                                                    id={item.Id}
                                                    name={item.Name}
                                                    img={item.Picture1}
                                                    description={item.Toldescribe}
                                                    isActions={false}
                                                    color="gray"
                                                    refetch={data1.refetch}
                                                />
                                            </Col>
                                        )
                                    }
                                    else {
                                        return (
                                            <Col xs={24} sm={12} md={8} xxl={6}>
                                                <CardList
                                                    key={item.Id}
                                                    user={user}
                                                    id={item.Id}
                                                    name={item.Name}
                                                    img={item.Picture1}
                                                    description={item.Toldescribe}
                                                    isActions={false}
                                                    color="red"
                                                    refetch={data1.refetch}
                                                />
                                            </Col>
                                        )
                                    }
                                    })
                                }
                            </Row>
                        </div>)
                }
            </PageContent>
        </Layout>
    )
}

export default Category