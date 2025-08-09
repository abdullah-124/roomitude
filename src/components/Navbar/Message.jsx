import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Message() {
    const {message} = useContext(AppContext)
    if (!message) return null;

    // Map types to classes
    const classMap = {
        success: "bg-green-500",
        error: "bg-red-500",
        default: "bg-[var(--sbg)]",
    };

    const className = classMap[message.status] || classMap.default;

    return <div className={`${className} text-sm text-center text-white font-medium`}>{message.text}</div>;
}

export default Message;
