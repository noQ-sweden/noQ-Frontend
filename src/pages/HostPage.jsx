import React from 'react';
import Overview from "./../components/Admin/Overview";
import UserInfo from "./../components/Admin/UserInfo";

export default function HostPage() {
    return (
        <>
            <div className="flex flex-col">
                <div className="p-4 flex flex-row">
                    <Overview className="max-w-64" />
                    <UserInfo className="max-w-36" />
                </div>
                <div>
                </div>
            </div>
        </>
    )
}