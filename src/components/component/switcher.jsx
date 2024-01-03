import React from 'react'
import { Switch } from "@/components/ui/switch"




export const Switcher = ({ option, setter, title, subtitle }) => {
    return (
        <>
            <h2 className="text-2xl text-center font-semibold px-6 pb-4 pt-12">{title}</h2>
            <p className="text-black text-center pb-4">{subtitle}</p>
            <div className="flex items-center py-3 px-6">
                <span className='text-sm text-gray-500 pr-3'>Si no querés incluirla desactiva este switch</span>
                <Switch id="cacuzzo" className='' checked={option} onCheckedChange={() => setter(!option)} />
            </div>
        </>
    )
}

