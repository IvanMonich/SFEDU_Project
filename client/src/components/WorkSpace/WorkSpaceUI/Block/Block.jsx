import { useEffect, useRef, useState } from "react"
import { Resizable } from "react-resizable"


const Block = props => {
    const {
        width,
        height,
        fontFamily,
        fontSize,
        textAlign,
        getActive,
        listNumber,
        blockNumber,
        content,
        color,
        fontWeight,
        fontStyle,
        textDecorationLine,
        setListsState
    } = props

    const ContentEditable = useRef()
    const [block, setBlock] = useState({
        number: blockNumber,
        height: height,
        width: width,
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        textAlign: textAlign,
        textDecorationLine: textDecorationLine,
        content: content,
        color: color
    })

    const [blockData, setBlockData] = useState(content)

    const [isEdit, setIsEdit] = useState(false)

    // useEffect(() => {
    //     console.log(blockComponent, ReactDOM.findDOMNode(document.getElementById(props.blockId)));
    // }, [blockComponent])

    const onResize = (event, {element, size, handle}) => {
        if (size.width <= 1240 && size.height <= 1754) {
            setBlock({...block, width: size.width, height: size.height})
        }
    }

    useEffect(() => {
        setListsState({
            blockNumber: block.number,
            blockHeight: block.height,
            blockWidth: block.width,
            blockFontFamily: block.fontFamily,
            blockFontSize: block.fontSize,
            blockFontWeight: block.fontWeight,
            blockFontStyle: block.fontStyle,
            blockTextAlign: block.textAlign,
            blockTextDecorationLine: block.textDecorationLine,
            color: block.color,
            content: block.content
        }, listNumber, blockNumber)
    }, [block.width, block.height])

    useEffect(() => {
        setBlock({
            number: blockNumber,
            height: height,
            width: width,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontStyle: fontStyle,
            textAlign: textAlign,
            textDecorationLine: textDecorationLine,
            content: content,
            color: color
        })
    }, [props])

    return (
        <>
            {!isEdit
                ? <Resizable onDoubleClick={() => {
                    setIsEdit(!isEdit)
                    getActive(listNumber, blockNumber)
                }}
                                width={block.width}
                                height={block.height}
                                onResize={ onResize }
                >
                    <div style={{
                        position: "relative",
                        width: block.width,
                        height: block.height,
                        fontFamily: block.fontFamily,
                        fontSize: block.fontSize,
                        fontWeight: block.fontWeight,
                        fontStyle: block.fontStyle,
                        textAlign: block.textAlign,
                        textDecorationLine: block.textDecorationLine,
                        color: block.color
                    }} >
                        <span>{ blockData }</span>
                    </div>
                </Resizable>
                : <>
                <button
                    onClick={(e) => {
                        setIsEdit(!isEdit)
                        // setBlockData(ContentEditable.current?.innerText)
                        getActive(null, null)
                    }}
                    style={{
                        position: "absolute",
                        // top: "20px",
                        left: "-60px"
                    }}
                >Save</button>
                <textarea
                    ref={ ContentEditable }
                    style={{
                        position: "relative",
                        width: block.width,
                        height: block.height,
                        fontFamily: block.fontFamily,
                        fontSize: block.fontSize,
                        fontWeight: block.fontWeight,
                        fontStyle: block.fontStyle,
                        textAlign: block.textAlign,
                        textDecorationLine: block.textDecorationLine,
                        color: block.color
                    }}
                    onChange={ event => setBlockData(event.target.value) }
                >
                    { blockData }
                </textarea>
                </>
            }
        </>
    );
};

export default Block
