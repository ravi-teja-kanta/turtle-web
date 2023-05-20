import React from "react";

export default function MenuLayout({ children }: { children: React.ReactNode}) {
    return (
        <div className="m-4 p-2">
            {children}
        </div>
    )
}