import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql';
import { LOGIN_MUTATION } from '../graphql';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import taipei_img2 from "./../data/images/taipei-taiwan-travel2.jpg";

const Register = ({ setLoggedIn, setUser, setUsername }) => {

  // State Initialisation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState('');
  const [register] = useMutation(REGISTER_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);
  const cookies = new Cookies();

  const naviagate = useNavigate();

  // useEffect
  useEffect(() => {
    if (err === '') {

      return;

    } else {

      message.error(err, 2)
      setErr('');

    }
  }, [err]);

  const handleSubmit = async (e) => {
    // register part
    try {
      let reEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/; // email validation

      if (!reEmail.test(email)) {
        setErr('請輸入正確的email格式！')
        return;
      }
      const { data } = await register({
        variables: {
          Name: name,
          Email: email,
          Password: password,
        }
      })

      // login part

      try {
        const user = await login({
          variables: {
            Email: email,
            Password: password,
          }
        })

        const token = user.data.login.Token

        if (!token) {
          setErr('伺服器出現問題，請稍後再試!')
          return;

        } else {
          await setLoggedIn(true);
          cookies.set('authJwtToken', token, { path: '/' })
          setUsername(user.data.login.Name)
          setUser(email)
          cookies.set('username', email, { path: '/' })
          naviagate('/homePage')
        }

        // login failed
      } catch (error) {
        setErr('伺服器出現問題，請稍後再試!')
        throw new Error(error);
      }

      // register failed 
    } catch (error) {
      setErr("哎呀，Email 已經使用過了喔!")
      throw new Error(error);
    }
  }


  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={taipei_img2} alt="Register" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={(e) => handleSubmit(e)}
          style={{ padding: "15px 40px" }}
        >
          <p className="form-title">嗨！</p>
          <p>一起，去旅行吧！</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please type in your name!' }]}
          >
            <Input
              placeholder=" 該怎麼稱呼您？"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder=" Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" required="true">
            <Checkbox>我同意使用本網站使用Cookie以提供更好的體驗</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              註冊
            </Button>
            <span>
              老朋友?
              <a href='/login' className='RegButton'>
                登入
              </a>
            </span>
          </Form.Item>

        </Form>

      </div>
    </div>
  );
};

export { Register };