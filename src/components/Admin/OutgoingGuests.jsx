import React from 'react';
import Panel from "../Common/Panel";

export default function OutgoingGuests() {

    const handleCheckOut = () => {
        //TODO
    }

    return (
        <Panel title="Utgående gäster">
            <div>
                <div className='text-sm'>
                    <table className='table-fixed w-full'>
                        <thead className='border-b-2'>
                            <tr className='text-left'>
                                <th className='font-normal tracking-tight w-3/5'>Namn</th>
                                <th className='p-2 font-normal tracking-tight w-2/5'></th>
                            </tr>
                        </thead>
                        <tbody className='border-b-2'>
                            <tr>
                                <td className='tracking-tight'>Test User 3</td>
                                <td className='p-2 tracking-tight text-center'>
                                    <button className="
                                        bg-green-600
                                        hover:bg-green-700
                                        text-white
                                        font-semibold
                                        text-m
                                        align-middle
                                        w-32
                                        h-7
                                        rounded
                                        focus:outline-none
                                        focus:shadow-outline"
                                        onClick={() => handleCheckOut()}>
                                        Utcheckning
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className='tracking-tight'>Test User 4</td>
                                <td className='p-2 tracking-tight text-center'>
                                    <button className="
                                        bg-green-600
                                        hover:bg-green-700
                                        text-white
                                        font-semibold
                                        text-m
                                        align-middle
                                        w-32
                                        h-7
                                        rounded
                                        focus:outline-none
                                        focus:shadow-outline"
                                        onClick={() => handleCheckOut()}>
                                        Utcheckning
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Panel>
    );
}
