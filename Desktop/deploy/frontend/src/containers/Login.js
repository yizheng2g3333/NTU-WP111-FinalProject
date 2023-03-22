import { useMutation } from '@apollo/client';
import { Form, Input, Checkbox, Button, Layout, message } from 'antd'
import { returnOrUpdate } from 'ol/extent';
import { useEffect, useState } from 'react';
import { LOGIN_MUTATION, AUTHTOKEN_MUTATION } from '../graphql';
import { useNavigate } from 'react-router';
import taipei_img from "./../data/images/taipei-taiwan-travel.jpg";
import Cookies from 'universal-cookie';


const Login = ({ setLoggedIn, loggedIn, setUser, setUsername }) => {

  // State & Hooks Initialisation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState('');
  const [relog, setRelog] = useState(false);
  const [login] = useMutation(LOGIN_MUTATION);

  const [authToken] = useMutation(AUTHTOKEN_MUTATION)
  const navigate = useNavigate();

  // Cookies setup
  const cookies = new Cookies();

  const authSession = async () => {

    let authTokenCookie = cookies.get('authJwtToken')
    let userCookie = cookies.get('username')

    if (!authTokenCookie || !userCookie) {
      return;

    } else {

      try {
        const session = await authToken({
          variables: {
            Email: userCookie,
            Token: authTokenCookie,
          }
        })


        if (!session.data.authToken) {
          console.log(session.data)
          cookies.remove('authJwtToken')
          cookies.remove('username')

        } else {
          setUser(userCookie);
          setLoggedIn(true)
          setUsername(session.data.authToken.Name)
          setRelog(true);
          navigate('/homePage');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  // useEffects
  useEffect(() => {
    authSession();
  }, []);

  useEffect(() => {
    if (relog) {
      message.info("成功登入！歡迎回來", 1.4)
    }
  }, [relog]);

  // useEffect
  useEffect(() => {
    if (err !== '') {
      message.error("Login failed! Please check your credentials.", 1.3)
      setErr('');
    }

  }, [err]);


  const handleSubmit = async (e) => {
    try {
      const user = await login({
        variables: {
          Email: email,
          Password: password,
        }
      })

      const token = user.data.login.Token

      if (!token) {
        setErr('登入失敗！請再試一次')
      } else {
        await setLoggedIn(true);
        cookies.set('authJwtToken', token, { path: '/' })
        setUsername(user.data.login.Name)
        setUser(email)
        cookies.set('username', email, { path: '/' })

        navigate('/homePage')
      }
    } catch (error) {
      setErr(error)
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={(e) => handleSubmit(e)}
        >
          <p className="form-title">歡迎回來</p>
          <p>準備好迎接下段旅程了嗎？</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please type in your email!' }]}
          >
            <Input
              placeholder=" Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please type in your password!' }]}
          >
            <Input.Password
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>記住我的登入資訊</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登入
            </Button>
            <span>
              初來乍到?
              <a href='/register' className='RegButton'>
                註冊一個帳號吧！
              </a>
            </span>
          </Form.Item>

        </Form>
        <div className="illustration-wrapper">
          <img src={taipei_img} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export { Login };