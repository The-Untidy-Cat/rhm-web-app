import { Space, Spin } from 'antd';
import AppIcon from '../../public/appIcon.png';
import Image from 'next/image';

export const LoadingPage = () => {
    return (
        <div className="fixed z-50 top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-sm bg-gray-100/[0.1]">
            <Image src={AppIcon} alt="App Icon" className="w-16" />
        </div>
    )
}