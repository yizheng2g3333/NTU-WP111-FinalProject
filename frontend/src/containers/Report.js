import { useMutation } from '@apollo/client';
import { Form, Input, Button, Layout, message } from 'antd'
import { useState } from 'react';
import { REPORT_MUTATION } from '../graphql';
import taipei_img2 from "./../data/images/taipei-taiwan-travel2.jpg";

const Report = ({ user }) => {

    // State & Hooks Initialisation
    const currentTime = () => {
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        return dateTime;
    }

    const [feedback, setFeedback] = useState("");
    const [time, setTime] = useState(currentTime())
    const [report] = useMutation(REPORT_MUTATION);

    const handleSubmit = async (e) => {

        await setTime(currentTime());
        
        try {
            const feedbackSent = await report({
                variables: {
                    Email: user,
                    Report: feedback,
                    Time: time,
                }
            })
            message.success("您的回覆已送出！", 1.3)
            return feedbackSent;

        } catch (error) {
            message.error("伺服器目前忙線中，請稍後再試!", 1.3)
            throw new Error(error)
        }
    }

    return (
        <Layout>
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <img src={taipei_img2} alt="ChangePwd" />
                    </div>
                    <Form
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={(e) => handleSubmit(e)}
                    >
                        <p className="form-title">問題回報</p>
                        <p>如果有任何問題歡迎填寫以下表單告訴我們，謝謝您！</p>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '請輸入您的寶貴意見!' }]}
                        >
                            <Input.TextArea
                                placeholder="請輸入您的寶貴意見..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                送出
                            </Button>
                        </Form.Item>

                    </Form>

                </div>

            </div>
        </Layout>
    );
};

export default Report;
