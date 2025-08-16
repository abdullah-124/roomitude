import React, { useState, useEffect, useContext } from "react";
import { useMessage } from "../../context/MessageProvider";

function Message() {
    const { message } = useMessage()
    if (!message) return null;

    // Map types to classes
    const classMap = {
        success: "bg-green-500",
        error: "bg-red-500",
        default: "bg-[var(--sbg)]",
    };

    const className = classMap[message?.status] || classMap.default;

    return <main className={`${className} sticky z-[200] top-0 text-sm text-center text-white font-medium`}>
        <div className=" z-200 top-0 right-0">{message?.text}</div>
    </main>;
}

export default Message;
