import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useDataContext } from "../../hooks/useDataContext";

import { COLUMNS } from "./columns";
import { ColumnFilter } from "./ColumnFilter";

import "./table.css";

function DataSets() {
  const originalData = useDataContext().data;

  const [isLoading, setIsLoading] = useState(true);
  const [formattedData, setFormattedData] = useState([]);

  const columns = useMemo(() => COLUMNS, []);

  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter };
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data: formattedData,
      defaultColumn,
      initialState: { hiddenColumns: ["id"] },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex } = state;
  console.log(pageIndex);

  const fetchDataInBatch = async () => {
    const totalItems = 40;
    const startIndex = pageIndex * totalItems;
    const endIndex = startIndex + totalItems;
    const batchData = originalData.slice(startIndex, endIndex);

    const formatted = [];

    for (const item of batchData) {
      const formattedItem = {
        ...item,
        name: item.name || "n/a",
        year: item.year || "n/a",
        mass: `${item.mass} (g)` || "n/a",
        recclass: item.recclass || "n/a",
        location: item.location || "n/a",
      };

      try {
        const API_KEY = "SQ2wqGDLvUAL1TEwaOucCOLQaAs81Eto";
        const latitude = parseFloat(item.reclat);
        const longitude = parseFloat(item.reclong);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          const apiUrl = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${API_KEY}&radius=100`;

          const response = await fetch(apiUrl);

          if (response.ok) {
            const data = await response.json();
            formattedItem.location = data.addresses[0].address.country;
          } else {
            formattedItem.location = "n/a";
          }
        }
      } catch (error) {
        formattedItem.location = "n/a";
      }

      formatted.push(formattedItem);
    }

    setFormattedData(formatted);
    setIsLoading(false);
  };

  useEffect(() => {
    if (originalData) {
      fetchDataInBatch();
    }
  }, [originalData]);

  return (
    <div>
      {isLoading ? (
        <div className="custom-loader"></div>
      ) : (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <>
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                </>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.column.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="paginationContainer">
            <div className="paginationBtns">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <span className="pageNumbers">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>

              <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>
            </div>

            <span className="goto">
              | Go to page
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "40px" }}
              />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default DataSets;
