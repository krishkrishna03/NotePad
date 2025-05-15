import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NotebookPen } from 'lucide-react';

const { Title, Text } = Typography;

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async ({ email, password }) => {
    try {
      await login(email, password);
      message.success('Logged in successfully');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      message.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-500/10 to-purple-500/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-teal-500 rounded-xl mb-4 text-white">
            <NotebookPen size={32} />
          </div>
          <Title level={2} className="!mb-2">Welcome back!</Title>
          <Text className="text-gray-500 dark:text-gray-400">Sign in to access your notes</Text>
        </div>
        
        <Card 
          bordered={false}
          className="shadow-lg"
          style={{ borderRadius: 12 }}
        >
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Email" 
                size="large" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
                size="large" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                size="large"
                className="mt-2"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <Text className="text-gray-500 dark:text-gray-400">
              Don't have an account? <Link to="/register" className="text-teal-600 dark:text-teal-400 hover:underline">Sign up</Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;