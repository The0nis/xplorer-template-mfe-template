import React from 'react'
import Button from 'component/Button';

import { GrRefresh } from "react-icons/gr";

interface DashboardProps {
    onNavigate?: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center justify-between w-full p-3 border-b border-[#E0E0E0] ">
                <div className="flex items-center space-x-3">
                    <h1 className="font-semibold text-[20px] text-black">Services Dashboard</h1>
                </div>
                <div className="space-y-4">
                    <Button onClick={() => { console.log("clicked") }} variant="primary" size="small" className='text-[14px] !text-[#495057] border border-[#ADB5BD] flex items-center space-x-3 !bg-transparent'><span className='pr-2'><GrRefresh /></span>Refresh</Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
