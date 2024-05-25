// "use client"
import { CustomButtonPorps } from '@/types';
import Image from 'next/image';

const CustomButton = ( {
    title,
    btnType,
    containerStyles,
    textStyles,
    rightIcon,
    isDisabled,
    handleClick
}: CustomButtonPorps) => {
    
    return (
        <button
            disabled={isDisabled}
            type={(btnType || "button")}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>{title}</span>
                
            {rightIcon && (
                <div className="relative w-6 h-6">
                    <Image 
                        src={rightIcon}
                        alt="arrow_left"
                        fill
                        className="object-contian "
                    />
                </div>
            )}  
        </button>
    )
}

export default CustomButton;