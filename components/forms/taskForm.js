import { Form, Input, Button, InputNumber,message } from 'antd';
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
//     site_id: Joi.number().integer().required(),
//     url: Joi.string().required(),
//     style_index: Joi.number().integer().allow(null).optional(),
//     size: Joi.string().allow(null).optional(),
//     shipping_speed_index: Joi.number().integer().allow(null).optional(),
//     billing_address_id: Joi.number().integer().required(),
//     shipping_address_id: Joi.number().integer().required(),
//     notification_email_address: Joi.string().email().allow(null).optional()
// }


export default function Demo({tasks,setTasks}) {
    const onFinish = async (values) => {
        const tasksRes = await fetch('http://localhost:3001/v1/tasks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const tasksJson = await tasksRes.json();
        if(tasksJson&&tasksJson.success){
            message.success(tasksJson.message);
            setTasks([...tasks,tasksJson.data])
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
               // site_id:

            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="site_id"
                name="site_id"
                rules={[
                    {
                        required: true,
                        type: 'integer',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="url"
                name="url"
                rules={[
                    {
                        required: true,
                        type: 'url',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="product_code"
                name="product_code"
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
                label="size"
                name="size"
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
                label="style_index"
                name="style_index"
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
                label="shipping_speed_index"
                name="shipping_speed_index"
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
                label="billing_address_id"
                name="billing_address_id"
                rules={[
                    {
                        required: true,
                        type: 'integer',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="shipping_address_id"
                name="shipping_address_id"
                rules={[
                    {
                        required: true,
                        type: 'integer',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label="notification_email_address"
                name="notification_email_address"
                rules={[
                    {
                        required: true,
                        type: 'email',
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
