import { FC, useState } from "react";
import Image from "next/image";

interface InPlayVagaryProps {
    data: InGameVagary;
}

const InPlayVagary: FC<InPlayVagaryProps> = ({ data }) => {
    const {
        name,
        types,
        race,
        loreText,
        stamina,
        baseHP,
        basePower,
        baseDefense,
        baseSpeed,
        moveMap,
        imgPath,
    } = data.ownedVagary.baseVagary;

    const { owner } = data.ownedVagary;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='z-2 relative'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='transition-opacity opacity-90 hover:opacity-100'>
                <Image
                    src={`/card-images/${imgPath}`}
                    alt={`in-play-${name}--${owner}`}
                    className='w-24 h-24'
                    width={96}
                    height={96}
                />
            </div>

            <div className='z-2 absolute left-0 ml-24 transition-transform transform bg-green-700 p-5 border border-green-500 shadow-lg opacity-90'>
                <ul>
                    <li className='mb-2 text-white hover:underline'>
                        <a href='#'>Details</a>
                    </li>
                    <li className='mb-2 text-white hover:underline'>
                        <a href='#'>Move</a>
                    </li>
                    <li className='mb-2 text-white hover:underline'>
                        <a href='#'>Abilities</a>
                    </li>
                </ul>
            </div>

            {isHovered ? (
                <div className='z-2 absolute left-0 ml-24 transition-transform transform bg-green-700 p-5 border border-green-500 shadow-lg opacity-90'>
                    <ul>
                        <li className='mb-2 text-white hover:underline'>
                            <a href='#'>Details</a>
                        </li>
                        <li className='mb-2 text-white hover:underline'>
                            <a href='#'>Move</a>
                        </li>
                        <li className='mb-2 text-white hover:underline'>
                            <a href='#'>Abilities</a>
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default InPlayVagary;
