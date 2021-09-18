import React from 'react';
import { Card } from 'antd';
import { CopyTwoTone } from '@ant-design/icons';
import AllButtonsComponent from './AllButtonsComponent';
 
const CardDetails = () => {
    return (
        <div>
            <Card className="card" title="Custom Title" extra={<AllButtonsComponent />}>
                <p>Custom body text</p>
            </Card>
        </div>
    )
}

export default CardDetails
