import { useEffect, useState } from "react";
import PriceRangeInputSlider from "./PriceRangeInputSlider";

export default function PriceRangeSlider({ updateUrl }) {
    const [maxValue, setMaxValue] = useState(100)
    const [minValue, setMinValue] = useState(0)
    const handleRangeChange = (min, max) => {
        setMinValue(min);
        setMaxValue(max);
        updateUrl({
            'price_max': maxValue,
            'price_min': minValue
        })
    };
    return (
        <div className="p-2 w-full shadow rounded border border-gray-200">
            <h2 className="text-lg font-medium">Price Range :</h2>
            <div className="py-3 ">
                <PriceRangeInputSlider
                    min={0}
                    max={500}
                    minValue={minValue}
                    maxValue={maxValue}
                    onChange={handleRangeChange}
                />
            </div>
            <h4 className="text-sm font-medium">Price: {minValue}$ - {maxValue}$</h4>
        </div>
    );
}
