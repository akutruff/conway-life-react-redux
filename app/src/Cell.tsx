import React from 'react';

import { Vector2, Board, LifeStatus } from './app/types';
import { useSelector, useDispatch } from "react-redux";

interface CellProps {
    gridSize: Vector2,
    location: Vector2,
    status: LifeStatus
}

export const Cell = React.memo<CellProps>((props) => {
    const cellColor: string = props.status === LifeStatus.ALIVE ? 'aqua' : 'transparent';

    const size = 10;
    const cellStyle = {
        "background-color": cellColor,
        transform: `translate(${size * props.location.x}px, ${size * props.location.y}px)`,
    };

    return (<div key={props.location.x * props.gridSize.x + props.location.y} className="Cell" style={cellStyle} />);
}, (prevProps, nextProps) => {
    return prevProps.location.x === nextProps.location.x &&
        prevProps.location.y === nextProps.location.y &&
        prevProps.status === nextProps.status;
});



