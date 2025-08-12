import { useEffect, useState } from "react";

export default function PriceRangeSlider({setParams}) {
    const [maxValue, setMaxValue] = useState(100)
    const [minValue, setMinValue] = useState(0)
    useEffect(()=>{
        if(maxValue==100 && minValue==0)return
        setParams(prev => ({
            ...prev, 
            price_min: minValue,
            price_max: maxValue,
        }))
    }, [maxValue, minValue])
    return (
        <div className="p-2 w-full shadow rounded border border-gray-200">
            <h2 className="text-lg font-medium">Price Range :</h2>
            <div className="flex py-3 ">
                <input
                    type="range"
                    min={0}
                    max={24}
                    value={minValue}
                    onChange={e => setMinValue(Number(e.target.value))}
                    className="w-full custom_range rounded-s-xl"
                />

                <input
                    type="range"
                    min={25}
                    max={400}
                    value={maxValue}
                    onChange={e => setMaxValue(Number(e.target.value))}
                    className="w-full custom_range rounded-e-xl"
                />
            </div>
            <h4 className="text-sm font-medium">Price: {minValue}$ - {maxValue}$</h4>
        </div>
    );
}
