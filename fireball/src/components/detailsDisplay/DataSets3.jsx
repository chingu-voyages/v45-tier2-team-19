import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useDataContext } from "../../hooks/useDataContext";
import { fetchLocationData } from "./locationUtil";
import { Virtuoso } from "react-virtuoso";

import { COLUMNS } from "./columns";
import { ColumnFilter } from "./ColumnFilter";

import styles from "./DataSets.module.css";
import "./table.css";

function DataSets() {
  const originalData = useDataContext().data;

  const [isLoading, setIsLoading] = useState(true);
  const [formattedData, setFormattedData] = useState([]);

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

  return (
    <div className={styles.datasetsContainer}>
      {isLoading ? (
        <div className="custom-loader"></div>
      ) : (
        <>
          <Virtuoso
            style={{ height: 400 }}
            totalCount={formattedData.length}
            itemContent={(index) => {
              const row = formattedData[index];
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            }}
            footer={() => (
              <div className="paginationContainer">
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
            )}
          />
        </>
      )}
    </div>
  );
}

export default DataSets;
