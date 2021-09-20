import { Card } from 'antd';
import { EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

const CardDetailsComponent = ({ item, index, handleClick, copyItem, deleteRow, content }) => {

    const getDiv = (item, index) => {
        return (
            <div>
                <div className="flex space-between">
                    <div className="titleText" style={{ fontSize: item.titleSize, color: item.titleColor }}>{item.titleText}</div>
                    <div>
                        <EditOutlined className="color-blue hv" onClick={(e) => handleClick(item, e)} />
                        <CopyOutlined className="color-blue ml-30 mr-30 hv" onClick={() => copyItem(item)} />
                        <DeleteOutlined className={`${content.length !== 1 ? 'color-blue hv' : 'color-gray hvn'} `} onClick={() => deleteRow(index)} />
                    </div>
                </div>
            </div>
        );
    }

    return (

        <Card
            key={index}
            style={{ border: `1px solid ${item.radiusColor}`, borderRadius: item.radius }}
            className="pt-48 m-1120 m-item m-card-shadow"
            title={getDiv(item, index)}
            bordered={false}
        >
            <span className="bodyText" style={{ fontSize: item.bodySize, color: item.bodyColor }}>{item.bodyText}</span>
        </Card>

    )
}

export default CardDetailsComponent
