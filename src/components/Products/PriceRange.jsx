import { useState } from "react";

export default function PriceRangeSlider() {
    const [maxValue, setMaxValue] = useState(100)
    const [minValue, setMinValue] = useState(0)
    return (
        <div className="p-2">
            <h2 className="text-lg font-medium">Price Range</h2>
            <div className="flex py-3 ">
                <input
                    type="range"
                    min={0}
                    max={22}
                    value={minValue}
                    onChange={e => setMinValue(Number(e.target.value))}
                    className="w-full custom_range rounded-s-xl"
                />

                <input
                    type="range"
                    min={25}
                    max={100}
                    value={maxValue}
                    onChange={e => setMaxValue(Number(e.target.value))}
                    className="w-full custom_range rounded-e-xl"
                />
            </div>
            <h4 className="text-sm font-medium">Price: {minValue}$ - {maxValue}$</h4>
        </div>
    );
}
