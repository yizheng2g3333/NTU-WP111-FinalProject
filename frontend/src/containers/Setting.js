import { useMutation } from '@apollo/client';
import { Form, Input, Button, Layout, message } from 'antd'
import { useState } from 'react';
import { CHANGEPASS_MUTATION } from '../graphql';
import taipei_img from "./../data/images/taipei-taiwan-travel.jpg";

const Setting = ({ user }) => {

    // State & Hooks Initialisation
    const [currentPassword, setCurrentPassword] = useState("");
    const [passwordToChange, setPasswordToChange] = useState("");
    const [changePassword] = useMutation(CHANGEPASS_MUTATION);


    const handleSubmit = async (e) => {

        try {
            const userChange = await changePassword({
                variables: {
                    Email: user,
                    currentPassword: currentPassword,
                    passwordToChange: passwordToChange,
                }
            })
            message.success("Password Changed!", 1.3)
            return userChange;

        } catch (error) {
            message.error("Passwords do not match!", 1.3)
            throw new Error(error)
        }
    }

    return (
        <Layout>
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <img src={taipei_img} alt="ChangePwd" />
                    </div>
                    <Form
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={(e) => handleSubmit(e)}
                    >
                        <p className="form-title">修改密碼</p>
                        {/* <p>準備好迎接下段旅程了嗎？</p> */}
                        <p></p>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please type in your current password!' }]}
                        >
                            <Input.Password
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Please type in your new password!' }]}
                        >
                            <Input.Password
                                placeholder="New Password"
                                value={passwordToChange}
                                onChange={(e) => setPasswordToChange(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                確認修改
                            </Button>
                        </Form.Item>

                    </Form>

                </div>

            </div>
        </Layout>
    );
};

export default Setting;