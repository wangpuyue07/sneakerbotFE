import { Form, Input, Button, message,Select } from 'antd';
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
//       type: Joi.string().valid('billing', 'shipping').required(),
//       first_name: Joi.string().required(),
//       last_name: Joi.string().required(),
//       address_line_1: Joi.string().required(),
//       address_line_2: Joi.string().optional(),
//       city: Joi.string().required(),
//       state: Joi.string().required(),
//       postal_code: Joi.string().required(),
//       country: Joi.string().required(),
//       email_address: Joi.string().email().required(),
//       phone_number: Joi.string().required()
//     }


export default function AddressForm({setAddresses,addresses}) {
    const onFinish = async (values) => {
        const addressesRes = await fetch('http://localhost:3001/v1/addresses', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const addressesJson = await addressesRes.json();
        if(addressesJson&&addressesJson.success){
            message.success(addressesJson.message);
            setAddresses([...addresses,addressesJson.data])
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

            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="type"
                name="type"
                rules={[
                    {
                        required: true,
                        type: 'string',
                    },
                ]}
            >
                <Select>
                    <Select.Option value="billing">Billing</Select.Option>
                    <Select.Option value="shipping">Shipping</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="first_name"
                name="first_name"
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
                label="last_name"
                name="last_name"
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
                label="address_line_1"
                name="address_line_1"
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
                label="address_line_2"
                name="address_line_2"
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
                label="city"
                name="city"
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
                label="state"
                name="state"
                rules={[
                    {
                        required: true,
                        type: 'string',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <code>{`<select name="region" id="ShippingAddress_select_region" required=""><option value="" disabled="">Select a State</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AS">American Samoa</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="GU">Guam</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MH">Marshall Islands</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="FM">Micronesia</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="MP">Northern Mariana Islands</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PW">Palau</option><option value="PA">Pennsylvania</option><option value="PR">Puerto Rico</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UM">United States Minor Outlying Islands</option><option value="VI">United States Virgin Islands</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>`}</code>
            <Form.Item
                label="postal_code"
                name="postal_code"
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
                label="country"
                name="country"
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
                label="email_address"
                name="email_address"
                rules={[
                    {
                        required: true,
                        type: 'email',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="phone_number"
                name="phone_number"
                rules={[
                    {
                        required: true,
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
