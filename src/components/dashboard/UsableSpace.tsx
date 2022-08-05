import ApiIcon from '@mui/icons-material/Api';

interface UsableData {
    label: string,
    usable_rate: number,
}

const UsableSpace = (props: UsableData) => {
    return (
        <div className='rounded-lg px-4 py-6 flex justify-center items-center bg-white border cursor-pointer hover:bg-slate-50'>
            <div className='flex justify-start items-center w-full gap-4'>
                <div className='hidden md:flex rounded-full bg-[#333333] justify-center items-center p-3 text-white'>
                    <ApiIcon />
                </div>
                <div className='flex flex-col justify-start items-start w-full gap-2'>
                    <span className='font-medium text-gray-400 text-lg'>Usable space</span>
                    <div className='flex w-full justify-between items-end'>
                        <span className='font-medium text-gray-400 text-lg'>{props.label}</span>
                        <span className='text-2xl font-bold'>{props.usable_rate}(m2)</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UsableSpace