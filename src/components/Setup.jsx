import { Row, Col, Button, Form, Input, Typography } from "antd";
const { Title } = Typography;

export const Setup = ({ setSetupReady }) => {
  const onFinish = ({ accessToken, repoURL }) => {
    window.localStorage.setItem("repoURL", repoURL);
    window.localStorage.setItem("accessToken", accessToken);
    setSetupReady(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Setup failed:", errorInfo);
  };

  return (
    <>
      <Row justify="start">
        <Col span={12}>
          <Title>Setup</Title>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Gitlab Repository Url"
              name="repoURL"
              rules={[
                { required: true, message: "Please input gitlab repository url!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Gitlab Personal Access Token"
              name="accessToken"
              rules={[
                { required: true, message: "Please input your access token!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
