import React, { useEffect, useState } from 'react';
import errorImg from "../assets/images/error-img.png";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setPage } from './studentsDataSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Hourglass } from 'react-loader-spinner';
import FiltersComponent from '../Components/FiltersComponent';

const Students = () => {
    const dispatch = useDispatch();
    const { data, status, pagination } = useSelector(state => state.data);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        dispatch(fetchData({ page: pagination.page, pageSize: pagination.pageSize }));
    }, [pagination.page, pagination.pageSize, dispatch]);

    useEffect(() => {
        if (selectAll) {
            setSelectedRows(data.map(item => item.id));
        } else {
            setSelectedRows([]);
        }
    }, [selectAll, data]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.pageCount) {
            dispatch(setPage(page));
        }
    };

    const handleRowClick = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAllClick = () => {
        setSelectAll(!selectAll);
    };

    let content;

    if (status === 'loading') {
        content = <div className="h-screen flex justify-center items-center">
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                colors={['#7C3AED', '#7C3AED']}
            />
        </div>
    } else if (status === 'succeeded') {
        content = (
            <div className='overflow-auto'>
                <FiltersComponent />
                <div className="bg-white shadow-md rounded-lg overflow-auto mt-4">
                    <div className="overflow-auto" style={{ maxHeight: '450px' }}>
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                                <tr className="bg-gray-200 sticky top-0">
                                    <th className="px-3 py-2 text-left border-b-2">
                                        <input
                                            type='checkbox'
                                            className="cursor-pointer"
                                            checked={selectAll}
                                            onChange={handleSelectAllClick}
                                        />
                                    </th>
                                    <th className="px-3 py-2 text-left border-b-2">Photo</th>
                                    <th className="px-3 py-2 text-left border-b-2">ID</th>
                                    <th className="px-3 py-2 text-left border-b-2">First Name</th>
                                    <th className="px-3 py-2 text-left border-b-2">Last Name</th>
                                    <th className="px-3 py-2 text-left border-b-2">Email</th>
                                    <th className="px-3 py-2 text-left border-b-2">Phone</th>
                                    <th className="px-3 py-2 text-left border-b-2">Year Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((item) => (
                                    <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                                        <td className="border-t px-3 py-2">
                                            <input
                                                type='checkbox'
                                                className="cursor-pointer"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleRowClick(item.id)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </td>
                                        <td className="border-t px-3 py-2">
                                            <img src="https://picsum.photos/30/30" alt="student" className='rounded-full' />
                                        </td>
                                        <td className="border-t px-3 py-2">{item?.id}</td>
                                        <td className="border-t px-3 py-2">{item?.attributes?.firstName}</td>
                                        <td className="border-t px-3 py-2">{item.attributes.lastName ? item.attributes.lastName : item.attributes.firstName}</td>
                                        <td className="border-t px-3 py-2">{item.attributes.parentEmailId ? item.attributes.parentEmailId : "pavan@gmail.com"}</td>
                                        <td className="border-t px-3 py-2">{item.attributes.parentContactNo ? item.attributes.parentContactNo : "8956324520"}</td>
                                        <td className="border-t px-3 py-2">{item?.attributes?.createdAt.slice(0, 4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center items-center my-4 space-x-3">
                    <button
                        onClick={() => handlePageChange(pagination?.page - 1)}
                        disabled={pagination?.page === 1}
                        className="px-4 py-2 hover:bg-purple-600 border border-purple-600 rounded-full disabled:opacity-50 group"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600 group-hover:text-white" />
                    </button>

                    <button
                        onClick={() => handlePageChange(pagination?.page + 1)}
                        disabled={pagination?.page === pagination?.pageCount}
                        className="px-4 py-2 hover:bg-purple-600 border border-purple-600 rounded-full disabled:opacity-50 group"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-600 group-hover:text-white" />
                    </button>
                    <div className='fixed right-10 text-purple-600'><span className='border border-purple-600 rounded-full px-4 py-1'>{pagination?.page}</span> of {pagination?.pageCount}</div>
                </div>
            </div>
        );
    } else if (status === 'failed') {
        content = <div className="flex flex-col justify-center items-center">
            <img src={errorImg} alt="connection-error" className='h-56'/>
            <h1 className='text-2xl font-bold text-purple-600 m-3'>An unknown error occurred, Please Contact admin.</h1>
        </div>;
    }

    return (
        <div className='p-6'>
            {content}
        </div>
    );
};

export default Students;
