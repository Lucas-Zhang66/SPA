import React, { useState, useEffect } from 'react';
import { Drawer, Tabs, Input, message } from 'antd';
import { BlockPicker } from 'react-color'
import { SettingOutlined, FormatPainterOutlined } from '@ant-design/icons';
import '../CardComponent/CardComponent.css';
import CardDetailsComponent from './CardDetailsComponent';

const { TabPane } = Tabs;


// a function to create an object to store initial states
function genData() {
    return {
        titleText: 'Custom Title',
        bodyText: 'Custom body text',
        titleSize: '36px',
        titleColor: '#0E2748',

        bodySize: '16px',
        bodyColor: '#4F4F4F',

        radius: '16px',
        radiusColor: 'white',
    }
}


const CardComponent = () => {

    // use useState() method to create those set-state functions and states 
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState([genData()]);
    const [currentItem, setCurrentItem] = useState(content[0]);

    // const [currentItemBackUp, setCurrentItemBackUp] = useState(list[0]); ---- deep copy solution 

    const [titleSizeColor, settitleSizeColor] = useState(false);
    const [bodySizeColor, setBodySizeColor] = useState(false);
    const [radiusSizeColor, setRadiusSizeColor] = useState(false);

    const [updateContent, setUpdateContent] = useState(false);

    // use useEffect() to control the drawer close,
    // addEventListenser() to listen the 'click' action and trigger the setVisible function,
    // user can click anywthere of the website to close the drawer
    useEffect(() => {
        document.addEventListener('click', (e) => {
            const c = document.querySelector('.my-drawer');

            if (!c.contains(e.target) && visible) {
                setVisible(false);
            }

        });
    }, [visible]);

    
    // This is a advanced solution to constrain the user's input, 
    // Due to the time limit and in order to delivery a stable version for presentation, i did not change the function.
    // if user forgot to input the title, it will restore the previous content
    // const deepCopy = JSON.parse(JSON.stringify(item)); 
    // setCurrentItemBackUp(deepCopy);
    // JSON.parse() to make a deep copy of the current text

    
    // handleClick() function to handle the Eddit Button 
    const handleClick = (item, e) => {
        setCurrentItem(item);  
        setVisible(!visible);
        e.stopPropagation();
    }


    // copy object by click Copy button
    const copyItem = (item) => {
        const data = JSON.parse(JSON.stringify(item)); // deep copy
        setContent([...content, data]); // add new object to the array
    };

    // delete card function 
    const deleteRow = (index) => {
        if (content.length === 1) return;  // if only have one object then disable delete button
        const arr = content.filter((item, i) => i !== index);
        setContent(arr);  // update array 
    }


    return (
        <div>
            <div>
                <div className="App-body flex col-center flex-col">
                    {
                        // map the list objects 
                        content.map((item, index) => {
                            return (
                                <CardDetailsComponent item={item} index={index} handleClick={handleClick} deleteRow={deleteRow} copyItem={copyItem} content={content} />
                            );
                        })
                    }
                </div>

                {/* Drawer component  */}
                <Drawer
                    width={350}
                    placement="right"
                    closable={false} // unable the close button in the drawer
                    onClose={handleClick}
                    visible={visible}
                    style={{ position: 'absolute' }}
                    className="my-drawer"
                    getContainer={false}
                    mask={false} // set mask to false so when drawer is opened, user wont see any mask on the website 
                >
                    {/* create Setting tab for the drawer*/}
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane
                            tab={
                                <div>
                                    <SettingOutlined className="m-tab-icon" />
                                </div>
                            }
                            key="1"
                        >
                            <h3 className="h3-title">Title Text</h3>
                            <Input
                                className="custom-title"
                                placeholder="Enter custom title"
                                onChange={(e) => {
                                    // Advanced solution
                                    // check if e.target.value is empty
                                    // if is empty then propt an error message 
                                    // otherwise update the title text
                                    // if (e.target.value === '') {
                                    //     error('Title can not be empty');
                                    //     currentItem.titleText = e.target.value;
                                    //     setUpdateContent(!updateContent);
                                    // } else {
                                    //     currentItem.titleText = e.target.value;
                                    //     setUpdateContent(!updateContent);
                                    // }

                                    // But for presentation purpose, i keep the current verison unchanged.
                                    currentItem.titleText = e.target.value;
                                    setUpdateContent(!updateContent);
                                }}
                            />

                            <h3 className="mt-30">Body Text</h3>
                            <Input.TextArea
                                className="enhance h-115"
                                placeholder="Enter custom text"
                                onChange={(e) => {
                                    
                                    // Same consideration as above reasons.
                                    // keep the current verison
                                    currentItem.bodyText = e.target.value;
                                    setUpdateContent(!updateContent);
                                }}
                            />
                        </TabPane>

                        {/* create FormatPainter tab for the drawer */}
                        <TabPane
                            tab={
                                <div>
                                    <FormatPainterOutlined className="m-tab-icon" />
                                </div>
                            }
                            key="2"
                            style={{ height: '100%' }}
                        >
                            {/* Title Formatting component */}
                            <h3 className="c-bm mt-24 mb-24">Title</h3>
                            <div>
                                <div className="flex m-line">
                                    <div className="flex-1">
                                        <div className="fw-500">Size</div>
                                        <Input
                                            className="mt-8"
                                            value={currentItem.titleSize}
                                            onChange={(e) => {
                                                currentItem.titleSize = e.target.value;
                                                setUpdateContent(!updateContent);
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 ml-24">
                                        <div className="fw-500">Color</div>
                                        <div
                                            className="box mt-8"
                                            onClick={(e) => {
                                                // if current color is equal to target then set color to current text
                                                if (e.currentTarget === e.target) {
                                                    setBodySizeColor(false);
                                                    setRadiusSizeColor(false);
                                                    settitleSizeColor(!titleSizeColor);
                                                    e.stopPropagation();
                                                }
                                            }}
                                            style={{ backgroundColor: currentItem.titleColor }}
                                        >
                                            {/* check showSizeColor && BlockPicker is true */}
                                            {
                                                titleSizeColor && <div className="absolute" style={{ top: '22px', left: '-73px' }}>
                                                    <BlockPicker
                                                        color={currentItem.titleColor}
                                                        onChange={(color) => {
                                                            // set current text color to the picked color
                                                            currentItem.titleColor = color.hex;
                                                            setUpdateContent(!updateContent)
                                                        }}
                                                    /></div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Body Formatting component */}
                                <h3 className="c-bm mt-24 mb-24">Body</h3>
                                <div className="flex m-line">
                                    <div className="flex-1">
                                        <div className="fw-500">Size</div>
                                        <Input
                                            className="mt-8"
                                            value={currentItem.bodySize}
                                            onChange={(e) => {
                                                currentItem.bodySize = e.target.value;
                                                setUpdateContent(!updateContent);
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1 ml-24">
                                        <div className="fw-500">Color</div>
                                        <div
                                            className="box mt-8"
                                            onClick={(e) => {
                                                if (e.currentTarget === e.target) {
                                                    setRadiusSizeColor(false);
                                                    settitleSizeColor(false);
                                                    setBodySizeColor(!bodySizeColor);
                                                    e.stopPropagation();
                                                }
                                            }}
                                            style={{ backgroundColor: currentItem.bodyColor }}
                                        >
                                            {
                                                bodySizeColor && <div className="absolute">
                                                    <BlockPicker
                                                        color={currentItem.bodyColor}
                                                        onChange={(color) => {
                                                            currentItem.bodyColor = color.hex;
                                                            setUpdateContent(!updateContent);
                                                        }}
                                                        className="absolute"
                                                    /></div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Panel Formatting component */}
                                <h3 className="c-bm mt-24 mb-24">Panel</h3>
                                <div className="flex m-line">
                                    <div className="flex-1">
                                        <div className="fw-500">Corner Radius</div>
                                        <Input
                                            value={currentItem.radius}
                                            onChange={(e) => {
                                                currentItem.radius = e.target.value;
                                                setUpdateContent(!updateContent);
                                            }}
                                            className="mt-8"
                                        />
                                    </div>
                                    <div className="flex-1 ml-24">
                                        <div className="fw-500">Color</div>
                                        <div
                                            className="box mt-8"
                                            onClick={(e) => {
                                                if (e.currentTarget === e.target) {
                                                    settitleSizeColor(false);
                                                    setBodySizeColor(false);
                                                    setRadiusSizeColor(!radiusSizeColor);
                                                    e.stopPropagation();
                                                }
                                            }}
                                            style={{ backgroundColor: currentItem.radiusColor }}
                                        >
                                            {
                                                radiusSizeColor && <div className="absolute">
                                                    <BlockPicker
                                                        color={currentItem.radiusColor}
                                                        onChange={(color) => {
                                                            currentItem.radiusColor = color.hex;
                                                            setUpdateContent(!updateContent);
                                                        }}
                                                        className="absolute"
                                                    /></div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Drawer>
            </div>
        </div>
    )
}

export default CardComponent
