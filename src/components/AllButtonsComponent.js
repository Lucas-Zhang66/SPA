import React, { useState } from 'react';
import { EditTwoTone, CopyTwoTone, DeleteTwoTone, SettingOutlined, FormatPainterOutlined  } from '@ant-design/icons';
import { Drawer, Form, Button, Col, Row, Input, Space, Tabs } from 'antd';




const AllButtonsComponent = () => {

    const { TabPane } = Tabs;

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    return (
        <div>
            <Button onClick={showDrawer} icon={<EditTwoTone />} style={{ border: "none" }} />
            <Button icon={<CopyTwoTone />} style={{ border: "none" }} />
            <Button icon={<DeleteTwoTone />} style={{ border: "none" }} />
            <Drawer
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
            <Tabs defaultActiveKey="1" >
                <TabPane tab={<SettingOutlined />} key="1" >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="name" label="Title Text" 
                                    rules={[{required: true, message: "please enter custom title"}]}
                                >
                                    <Input placeholder="Enter custom title" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="description" label="Body Text"
                                    rules={[{required:true, message: "enter custom body text"}]}
                                >
                                    <Input.TextArea rows={4} placeholder="Custom body text" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>               
                </TabPane>
                <TabPane tab={<FormatPainterOutlined />} key="2" />
            </Tabs>    
                 
            </Drawer>
        </div>

    )
}

export default AllButtonsComponent
