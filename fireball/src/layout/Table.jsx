import { useTable } from 'react-table'
import { useMemo } from 'react'
import fakeData from '../data.json'
function Table() {

    const data = useMemo(() => fakeData, [])
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Mass",
            accessor: "mass"
        },

        {
            Header: "Fall",
            accessor: "fall"
        },
        {
            Header: "Year",
            accessor: "year"
        }

    ], [])
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="tableContainer">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th key={`${index}th`} {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr key={`{${index}tr}`} {...row.getRowProps()}>
                                {row.cells.map((cell, index) => (
                                    <td key={`${index}tr`} {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table