import { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useDataContext } from "../../hooks/useDataContext";
import { AutoSizer, Table, Column } from "react-virtualized";

import styles from "./DataSets.module.css";
import "./table.css";
import "react-virtualized/styles.css";

import { COLUMNS } from "./columns";
import { ColumnFilter } from "./ColumnFilter";

function DataSets2() {
  const originalData = useDataContext().data;

  const [isLoading, setIsLoading] = useState(true);
  const [formattedData, setFormattedData] = useState([]);

  const fetchLocationData = async (latitude, longitude) => {
    const API_KEY = "SQ2wqGDLvUAL1TEwaOucCOLQaAs81Eto";

    if (latitude && longitude && API_KEY) {
      const apiUrl = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${API_KEY}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const formatted = await Promise.all(
        originalData.map(async (item) => {
          const formattedItem = {
            ...item,
            name: item.name || "n/a",
            year: item.year || "n/a",
            mass: item.mass ? `${item.mass} (g)` : "n/a",
            recclass: item.recclass || "n/a",
          };

          try {
            const response = await fetchLocationData(
              item.reclat, // Use latitude
              item.reclong // Use longitude
            );
            if (response) {
              formattedItem.location = response.addresses[0].address.country;
            } else {
              formattedItem.location = "Location not available";
            }
          } catch (error) {
            formattedItem.location = "Location not available";
          }

          return formattedItem;
        })
      );

      setFormattedData(formatted);
      setIsLoading(false);
    };

    fetchData();
  }, [originalData]);

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
  } = useTable(
    {
      columns,
      data: formattedData,
      initialState: { pageIndex: 0, hiddenColumns: ["id"] },
    },
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  const columns = useMemo(() => COLUMNS, []);

  return (
    <div className={styles.datasetsContainer}>
      <AutoSizer>
        {({ width, height }) => (
          <Table
            width={width}
            height={height}
            headerHeight={50}
            rowHeight={50}
            rowCount={formattedData.length}
            rowGetter={({ index }) => formattedData[index]}
            {...getTableProps()}
          >
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td key={cell.column.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </AutoSizer>
      <div className="paginationContainer">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
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
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>

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
    </div>
  );
}

export default DataSets2;
