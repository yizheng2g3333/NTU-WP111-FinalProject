import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const LogoutModal = ({ open, setOpen, setConfirmLogout }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setConfirmLogout(true)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title="是否確定要登出？"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          確定登出
        </Button>,
      ]}
    />
  );
};

export default LogoutModal;
