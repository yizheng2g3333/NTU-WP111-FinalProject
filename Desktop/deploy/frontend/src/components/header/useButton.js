import { Button, Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

const Userbutton = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
            <a target="_blank" rel="noopener noreferrer">
                登入
            </a>
            ),
        },
        {
            key: '2',
            label: (
            <a target="_blank" rel="noopener noreferrer">
                註冊
            </a>
            )
        },
        {
            key: '3',
            label: (
            <a target="_blank" rel="noopener noreferrer">
                問題回報
            </a>
            )
        },
        {
            key: '4',
            danger: true,
            label: '登出',
        },
    ];

    return (
        <Dropdown menu={{ items }} >
            <Space>
                <Button 
                    type="primary" 
                    shape="circle" icon={<UserOutlined style={{color: 'white'}}/>} 
                    size={30} 
                />
            </Space>
        </Dropdown>
    );
};

export { Userbutton };