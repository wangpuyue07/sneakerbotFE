import {Form, Input, Button, InputNumber, message} from 'antd';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
//
// const schema={
//       ip_address: Joi.string().required(),
//       port: Joi.number().integer().optional(),
//       protocol: Joi.string().required(),
//       username: Joi.string().allow(null).optional(),
//       password: Joi.string().allow(null).optional()
//     }



export default function ProxyForm({proxies,setProxies}) {
    const onFinish = async (values) => {
        const proxiesRes = await fetch('http://localhost:3001/v1/proxies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const proxiesJson = await proxiesRes.json();
        if(proxiesJson&&proxiesJson.success){
            message.success(proxiesJson.message);
            setProxies([...proxies,proxiesJson.data])
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                protocol:'http'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="ip_address"
                name="ip_address"
                rules={[
                    {
                        required: true,
                        type: 'string',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="port"
                name="port"
                rules={[
                    {
                        required: false,
                        type: 'integer',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="protocol"
                name="protocol"
                rules={[
                    {
                        required: true,
                        type: 'string',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="username"
                name="username"
                rules={[
                    {
                        required: false,
                        type: 'string',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="password"
                name="password"
                rules={[
                    {
                        required: false,
                        type: 'string',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
