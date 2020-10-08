import React from 'react'
import { ICar } from './Demo';

interface IProps {
    car: ICar
}

const CarItem = (props: IProps) => {
    
    return (
        <div>
            <h1>{props.car.model}</h1>
        </div>
    )
}

export default CarItem;