import { useEffect, useState } from "react";
import PriceRangeInputSlider from "./PriceRangeInputSlider";

export default function PriceRangeSlider({ url, setUrl }) {
    const [maxValue, setMaxValue] = useState(300)
    const [minValue, setMinValue] = useState(0)
    const handleRangeChange = (min, max) => {
        setMinValue(min);
        setMaxValue(max);
        const newUrl = new URLSearchParams(url.toString())
        newUrl.set('price_max',maxValue)
        newUrl.set('price_min', minValue)
        setUrl(newUrl)
    };
    return (
        <div className="p-2 w-full shadow rounded border border-[var(--bg)]">
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
