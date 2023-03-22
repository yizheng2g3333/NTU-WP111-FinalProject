import { useParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import { Modal } from 'antd';
import { useQuery } from '@apollo/client';
import { singleQUERY } from "../graphql"

const SpotPageModal = ({ open }) => {
    const { id } = useParams()

    const {
        loading, error, data, subscribeToMore,
            } = useQuery(singleQUERY,{
                variables:{
                    Id: String(id)
                },
        })

    // console.log(data.singlespot[0])


    return(
        <>
            {loading ? <p>{id}</p> :
                <>
                    <Modal open={open}>
                        <h1 style={{fontSize:"30px"}}>{data.singlespot[0].Name}</h1>
                        <Descriptions
                            bordered
                            column={{
                                xxl: 1,
                            }}
                        >
                        <Descriptions.Item label="Picture1">
                            <img src={data.singlespot[0].Picture1} style={{width:"30%"}}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="Region">{data.singlespot[0].Region}</Descriptions.Item>
                        <Descriptions.Item label="Town">{data.singlespot[0].Town}</Descriptions.Item>
                        <Descriptions.Item label="Opentime">{data.singlespot[0].Opentime}</Descriptions.Item>
                        <Descriptions.Item label="Website">
                            <a href={data.singlespot[0].Website}>{data.singlespot[0].Name}網站</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Toldescribe">
                            {data.singlespot[0].Toldescribe}
                        </Descriptions.Item>
                        </Descriptions>
                
                    </Modal>
                </>
                }
        </>
    )
}

export default SpotPageModal