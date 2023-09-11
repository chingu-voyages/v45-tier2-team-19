import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useDataContext } from "../../hooks/useDataContext";

import { COLUMNS } from "./columns";
import { ColumnFilter } from "./ColumnFilter";

import Location from "./Location.jsx";
import ds from "./DataSets.module.css";
import TableFilter from "./TableFilter";
import Button from "../shared/Button";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleRightBold,
  PiCaretDoubleLeftBold,
  PiCaretUpFill,
  PiCaretDownFill,
} from "react-icons/pi";

// import "./table.css";

function DataSets() {
  const originalData = useDataContext().data;

  // const [isLoading, setIsLoading] = useState(true);
  const [formattedData, setFormattedData] = useState([]);
  const [tableFilter, setTableFilter] = useState("name");

  useEffect(() => {
    if (originalData) {
      const formatted = originalData.map((item) => ({
        ...item,
        name: item.name || "n/a",
        year: item.year || "n/a",
        mass: item["mass (g)"] || "n/a",
        recclass: item.recclass || "n/a",
        location:
          item.reclat && item.reclong ? (
            <Location reclat={item.reclat} reclong={item.reclong} />
          ) : (
            "n/a"
          ),
      }));
      setFormattedData(formatted);
    }
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
    setFilter,
  } = tableInstance;

  const { pageIndex } = state;
  const columnsNames = headerGroups[0].headers.map((h) => h.id);
  console.log(columnsNames);

  return (
    <section className={ds.section} id="Table">
      <div className={ds.sectionContainer}>
        <div className={ds.tableContainer}>
          <TableFilter options={columnsNames} setFilter={setFilter} />
          <table className={ds.table} {...getTableProps()}>
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
                        <div className={ds.headerColumn}>
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <PiCaretUpFill />
                              ) : (
                                <PiCaretDownFill />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                        {/* <div className="tableFilter">
                        {column.canFilter ? column.render("Filter") : null}
                      </div> */}
                      </th>
                    ))}
                  </tr>
                </>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    {...row.getRowProps()}
                    className={i % 2 === 1 ? ds.coloredRows : ""}
                  >
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
        </div>
        <div className={ds.paginationContainer}>
          <div className={ds.goToPage}>
            <div className={ds.goToPageTitle}>
              <span>Go to page</span>
            </div>
            <div className={ds.input}>
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
              />
            </div>
          </div>
          <div className={ds.paginationButtons}>
            <Button
              className={ds.gotoStartButton}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <PiCaretDoubleLeftBold size={20} />
            </Button>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <PiCaretLeftBold size={20} />
            </Button>
            <span className={ds.pageNumbers}>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>

            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              <PiCaretRightBold size={20} />
            </Button>
            <Button
              className={ds.gotoEndButton}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <PiCaretDoubleRightBold size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataSets;
