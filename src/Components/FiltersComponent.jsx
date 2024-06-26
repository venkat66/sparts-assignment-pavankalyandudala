import React from 'react'
import { FilterIcon, PlusIcon } from '@heroicons/react/outline'

const FiltersComponent = () => {
    return (
        <div className='flex flex-row items-center justify-between'>
            <div className="relative inline-block w-56">
                <label className='text-gray-700'>Select School</label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:shadow-outline">
                        <option value="option1">Big Ben</option>
                        <option value="option2">St.Mary's</option>
                        <option value="option3">Jangaon Concept</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-purple-600">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center space-x-3'>
                <div className="border border-gray-400 px-3 py-3  rounded-full">
                    <FilterIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div >
                    <button className="bg-purple-600 px-3 py-3 rounded-lg text-white flex items-center">
                        <PlusIcon className='inset-y-0 mr-2 h-4 w-4'/> Add a student
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FiltersComponent