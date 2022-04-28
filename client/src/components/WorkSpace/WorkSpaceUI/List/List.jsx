import React, {useEffect, useState} from 'react';
import classes from './List.module.css'
import Block from "../Block/Block";

const List = props => {
    const { offsetLeft, getActive, setListsState } = props

    const [showList, setShowList] = useState(false)

    useEffect(() => {
        setShowList(true)
    }, [offsetLeft])

    // if( !offsetLeft ) return null

    return (
        showList
            ? <div id={ props.ListId.toString() }
                   className={ classes.defaultList }
            >
                {
                    props.blocks.map(block =>
                        <Block blockId={ `list${props.ListId}block${block.blockNumber}` }
                               blockNumber={ block.blockNumber }
                               listNumber={ props.ListId }
                               width={ block.blockWidth }
                               height={ block.blockHeight }
                               fontFamily={ block.blockFontFamily }
                               fontSize={ block.blockFontSize }
                               fontWeight={ block.blockFontWeight }
                               fontStyle={ block.blockFontStyle }
                               textAlign={ block.blockTextAlign }
                               textDecorationLine={ block.blockTextDecorationLine }
                               listTop={ 132 + props.ListId * (1754 + 32) }
                               listLeft={ offsetLeft }
                               getActive={ getActive }
                               content={ block.content }
                               color={ block.color }
                               setListsState={ setListsState }
                               key={ `list${props.ListId}block${block.blockNumber}` }
                        />
                    )
                }
            </div>
            : null
    );
};

export default List;