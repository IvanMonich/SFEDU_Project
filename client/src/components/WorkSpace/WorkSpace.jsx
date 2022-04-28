import React, {useEffect, useRef, useState} from 'react';
import List from "./WorkSpaceUI/List/List";

const WorkSpace = props => {
    const { listsWS, getActive, setListsState } = props

    const listComponent = useRef()
    const [offsetLeft, setOffsetLeft] = useState()

    useEffect(() => {
        setOffsetLeft(listComponent.current?.offsetLeft)
    }, [listComponent.current?.offsetLeft])

    return (
        <div ref={ listComponent } style={{
            position: "absolute",
            width: "1240px",
            top: "132px",
            left: "calc(50% - 620px)",
            display: "table"
        }}>
            {
                listsWS.map(list =>
                    <List ListId={ list.listNumber }
                          blocks={ list.listBlocks }
                          left={ offsetLeft }
                          getActive={ getActive }
                          setListsState={ setListsState }
                          key={ list.listNumber }
                    />
                )
            }
        </div>
    );
};

export default WorkSpace;