import React from 'react';
import classes from './WorldMap.module.sass';

const Tile = (props) => {

    const styles = props.asset !== undefined ? {
            transform: `translate(${Math.round(props.Xid * props.asset.sizeX) + props.fixLeft}px, 
                                  ${Math.round(props.Yid * props.asset.sizeY) + props.fixTop}px)`,
            backgroundColor: '#21214a',
            backgroundImage: `url('${props.asset.bgUrl}')`,
            backgroundPosition: `left -${props.asset.left}px top -${props.asset.top}px`,
            width: `${props.asset.sizeX}px`,
            height: `${props.asset.sizeY}px`,
        }
        :
        {};

    return (
        <div className = "GameSprite"
             style = {styles}
        >
        </div >
    );
};

const RowMap = (props) => {

    let tiles = props.row.map((value, index) => (
        <Tile
            key = {`${props.id}-${index}`}
            asset = {props.mapAssets[`${value}`]}
            Xid = {index}
            Yid = {props.id}
            fixTop = {props.constants.FIX_TOP}
            fixLeft = {props.constants.FIX_LEFT}
        />)
    );

    return (
        <div style = {{display: 'flex'}}>
            {tiles}
        </div >
    );
};

const WorldMap = (props) => {

    let rows = props.mapLevel.map((row, index) => (
        <RowMap key = {`row-${index}`}
                id = {index}
                mapAssets = {props.mapAssets}
                row = {row}
                constants = {props.constants}
        />));

    return (
        <div className = {classes.worldMap}>
            {rows}
        </div >
    );
};

export default WorldMap;