import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Button, Modal, Select, Card, Form, Input, Tooltip } from 'antd';
import { CREATE_JOURNEY_MUTATION } from '../graphql/mutation';
import { useQuery, useMutation } from '@apollo/client';
import { MYFAV_QUERY } from "../graphql"
import { EnvironmentFilled } from '@ant-design/icons';
import Fliter from './Fliter';
// import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import MapContext from './Map/hook/MapContext';
import HomePageContext from '../containers/hook/HomepageContext';
import { toLonLat } from 'ol/proj';

const FormDiv = styled.div`
    box-sizing: border-box;
    padding: 10px;
    height: max-content;
    width: 100%;
`;

const CustomizeModal = styled(Modal)`
    height: 90%;
    width: 40%;
    overflow: hidden;
    border-radius: 20px;
    &>.ant-modal-content{
        height: 100%;
        padding: 0;
        background-color: #ffffff;
        &>.ant-modal-header{
            padding: 25px;
            background-color: rgba(255, 255, 255, 0);
            margin-bottom: 0;
        }
        &>.ant-modal-footer{
            padding: 0 25px;
        }
    }
    &>.ant-modal-content>button{
        top: 25px;
    }
    &>.ant-modal-content>.ant-modal-body {
        overflow-x: hidden;
        overflow-y: scroll;
        height: 75%;
        background-color: #f5f5f5;
        border-radius: 20px;
    }
    & .icon-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        & .ant-form-item{
            margin: 0;
            height: 100%;
            width: 85%;
        }
    }
    & .ant-card{
        height: 150px;
    }
    & .ant-card-head {
        border-bottom: none;
    }
    & .anticon-environment{
        font-size: 20px;
    }
    & .ant-modal-close{
        border-radius: 50%;
    }
    & .ant-modal-close .anticon-close:hover{
        background-color: rgba(255, 255, 255, 0) !important;
    }
`;

const filter_items = ["大自然類","文藝／古蹟","小吃／特產","溫泉類","遊憩場所","體育場所"]

const describe = ["舉凡生態、國家公園、國家風景、自然風景、森林遊樂區、林場等景點","舉凡、宗教場所、文化、文藝、古蹟、廟宇","小吃／特產","溫泉","舉凡休閒農業、觀光工廠、都會公園","體育場所"]

const SendScoreModal = ({ open, setOpen, setCenter, initPlace, user, setloading1 }) => {
    const [form] = Form.useForm();
    const { map, displayStatus } = useContext(MapContext);
    const { setDisplayMap, setSteps, setStepsGeoJSON } = useContext(HomePageContext);
    const [CREATE_JOURNEY] = useMutation(CREATE_JOURNEY_MUTATION)
    const [disabledSave, setDisabledSave] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            initPlace: initPlace,
        });
    }, [initPlace]);
    
    useEffect(()=>{
        handleFormChange();
    }, [open]);

    let nature = 50
    let art = 50
    let eat = 50
    let spa = 50
    let play = 50
    let sport = 50

    const outcome = useQuery(MYFAV_QUERY, {
        variables: {
            Email: user.user.user
        },
    })

    console.log(outcome)
    if (outcome.data){
        // console.log(outcome.data.myFav.Filter[0].nature)
        nature = outcome.data.myFav.Filter[0].nature
        art = outcome.data.myFav.Filter[0].art
        eat = outcome.data.myFav.Filter[0].eat
        spa = outcome.data.myFav.Filter[0].spa
        play = outcome.data.myFav.Filter[0].play
        sport = outcome.data.myFav.Filter[0].sport
    }

    // console.log("rendermodal");
    const sendscore = async (form) => {
        try {
            setloading1(true)
            const { data, loading, error } = await CREATE_JOURNEY({
                variables:{
                    data:{
                        Email: user.user.user,
                        position: form["initPlace"],
                        time: form["duration"],
                        a1: form["0"],
                        a2: form["1"],
                        a3: form["2"],
                        a4: form["3"],
                        a5: form["4"],
                        a6: form["5"]
                    }
                }
            })
            const response_steps = data.travel.steps;

            if (!error) {
                displayStatus({ "type": "success", "msg": "have fun!" });
                setOpen(false);
                setSteps(response_steps);
                setDisplayMap(false);
            } else {
                displayStatus({ "type": "error", "msg": "fail!" });
            }
        } catch (e) {
            displayStatus({ "type": "error", "msg": "Some Error" });
        }
    }

    const handleFormChange = () => {
        const hasErrors = (form.getFieldsValue()["initPlace"] === "") ? true: false;
        setDisabledSave(hasErrors);
    }

    const handleLocation = () => {
        setOpen(false);
        map.getLayers().forEach((layer) => {
            if (layer.get('name') === 'userlocation') {
                let coord = layer.getSource().getFeatures()[0].getGeometry().getCoordinates();
                setCenter(toLonLat(coord, "EPSG:3857"));
            }
        })
    };

    return (
        <CustomizeModal
            centered
            open={open}
            onOk={() => form.submit()}
            okButtonProps={{ disabled: disabledSave }}
            onCancel={() => setOpen(false)}
            title="請依照您的喜好選出各個類別的分數"
        >
            <Form
                form={form}
                name='LikeScroeForm'
                //onValuesChange={handleFormValues}
                onFinish={sendscore}
                onFieldsChange={handleFormChange}
                initialValues={{
                    ["duration"]: 'short',
                    ["0"]: nature, ["1"]: art, ["2"]: eat, ["3"]: spa, ["4"]: play, ["5"]: sport,
                    ["initPlace"]: initPlace,
                }}
            >
                <FormDiv>
                    <Card
                        className='form_card'
                        title="想在台北停留多久呢"
                        style={{ width: "100%" }}
                    >
                        <Form.Item name="duration">
                            <Select
                                size="large"
                                style={{
                                width: 120,
                                }}
                                //onChange={selecthandleChange}
                                options={[
                                {
                                    value: 'short',
                                    label: '0~3小時',
                                },
                                {
                                    value: 'middle',
                                    label: '3~6小時 ',
                                },
                                {
                                    value: 'middle_long',
                                    label: '6~9小時 ',
                                },
                                {
                                    value: 'long',
                                    label: '9~12小時 ',
                                },
                                ]}
                            />
                        </Form.Item>
                    </Card>
                </FormDiv>
                <FormDiv>
                        {filter_items.map((item, index)=>{
                            return (
                                <Fliter 
                                    item={item} 
                                    describe={describe[index]}
                                    //barOnChange={barOnChange} 
                                    //value={value[index]} 
                                    index={index} 
                                />
                            )
                        })}
                </FormDiv>
                <FormDiv>
                    <Card
                        className='form_card'
                        title="選取出發地點"
                        style={{ width: "100%" }}
                    >   
                        <Tooltip placement="top" title={"參考您目前所在位置"}>
                            <Button
                                type="primary"
                                icon={<EnvironmentFilled />}
                                onClick={handleLocation}
                                style={{margin: "0 10px"}}
                            />
                        </Tooltip>
                        {(initPlace === "") ? <span style={{color: "gray"}}>{"未選擇(請在地圖上選取您想要出發的地點)"}</span>: initPlace}
                
                        <Form.Item name="initPlace" style={{ display: "none" }}>
                            <Input value={initPlace} />
                        </Form.Item>
                    </Card>
                </FormDiv>
            </Form>
        </CustomizeModal>
    );
}

export { SendScoreModal }