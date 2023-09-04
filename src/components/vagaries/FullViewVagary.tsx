import { FC } from "react";

interface FullViewVagaryProps {
    data: Vagary;
}

const FullViewVagary: FC<FullViewVagaryProps> = ({ data }) => {
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
    } = data;
    return (
        <div className='border border-gray-3 p-4 w-80 rounded-md bg-gray-1 text-gray-8'>
            <h2 className='text-xl font-bold mb-2'>{name}</h2>
            <div className='flex justify-center'>
                <img
                    src={`/card-images/${imgPath}`}
                    alt={name}
                    className='w-64 h-64 mb-2'
                />
            </div>
            <div className='flex justify-between text-sm'>
                <p className='mb-2'>
                    <strong className='text-blue-2'>Types:</strong>{" "}
                    {types.join(", ")}
                </p>
                <p className='mb-2'>
                    <strong className='text-blue-3'>Race:</strong> {race}
                </p>
            </div>
            <blockquote className='text-sm italic mb-2'>{loreText}</blockquote>
            {/* <p className='font-semibold mb-2 text-red-4'>Base Stats:</p> */}
            <ul className='list-disc list-inside mb-2 text-sm'>
                <li>HP: {baseHP}</li>
                <li>Power: {basePower}</li>
                <li>Defense: {baseDefense}</li>
                <li>Speed: {baseSpeed}</li>
                <li>Stamina: {stamina}</li>
            </ul>
            {/* <p className='font-semibold mb-2 text-red-5'>Moves:</p>
            <ul className='list-decimal list-inside'>
                {Object.entries(moveMap).map(([level, moveId]) => (
                    <li key={level}>
                        Level {level}: Move ID {moveId}
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default FullViewVagary;
