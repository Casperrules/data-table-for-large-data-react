import React, {useEffect, useState} from "react";
import { useTable, usePagination } from "react-table";
import Table from '../BaseTable.component/BaseTable.component';
import './PagenatedTable.styles.css';
// function Table({ columns, data }) {
  
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     footerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
    
//     state: { pageIndex, pageSize }
//   } = useTable(
//     {
//       columns,
//       data,
//       manualPagination: true,
//       initialState: { pageSize: 10 },
      
//     },
//     usePagination
//   );

  
//   return (
//     <>
//       <table
//         {...getTableProps()}
//         border={1}
//         style={{ borderCollapse: "collapse", width: "100%" }}
//       >
//         <thead>
//           {headerGroups.map((group) => (
//             <tr {...group.getHeaderGroupProps()}>
//               {group.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}
                    
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//         <tfoot>
//           {footerGroups.map((group) => (
//             <tr {...group.getFooterGroupProps()}>
//               {group.headers.map((column) => (
//                 <td {...column.getFooterProps()}>{column.render("Footer")}</td>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <div className="pagination">
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {"<<"}
//         </button>{" "}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {"<"}
//         </button>{" "}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {">"}
//         </button>{" "}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {">>"}
//         </button>{" "}
//         <span>
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageCount}
//           </strong>{" "}
//         </span>
//         <span>
//           | Go to page:{" "}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               gotoPage(page);
//             }}
//             style={{ width: "100px" }}
//           />
//         </span>{" "}
//         <select
//           value={pageSize}
//           onChange={(e) => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// }

function PagenatedTable() {
  const columns = React.useMemo(
    () => [
      {
        Header:"ID",
        accessor:"ID"
      },
      {
        Header:"Job Title",
        accessor:"JobTitle"
      },
      {
        Header:"Email Address",
        accessor:"EmailAddress"
      },
      {
        Header:"Name",
        accessor:"FirstNameLastName"
      },
      {
        Header:"Age",
        accessor:"age"
      }
    ],
    []
  );

  

  const [data,setData] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [searchTerm,setSearchTerm] = useState("");
  const [sortBy,setSortBy] = useState("ID");
  const [finalUrl,setFinalUrl] = useState(`http://localhost:5500/data/table-data/dummyData/${page}`);
  useEffect(()=>{
    let _finalUrl = `http://localhost:5500/data/table-data/dummyData/${page}`;
    if (searchTerm && sortBy) {
      _finalUrl=`http://localhost:5500/data/table-data/dummyData/${page}`+`/${searchTerm}/${sortBy}`;
    }
    if(!searchTerm && sortBy){
      _finalUrl = `http://localhost:5500/data/table-data/dummyData/sort/${page}/${sortBy}`;
    }
    
    fetch(_finalUrl)
    .then(response=>response.json())
    .then(data=>{
      setData(data["data"]);
      
      let totalDataLength = data["totalCount"];
      setTotalPages(Math.ceil(totalDataLength/10));
      
    })
  },[page,searchTerm,finalUrl,sortBy]);

  const searchClickHandler = (event)=>{
    if (event.target.value) {
      data.filter((row)=>row['FirstNameLastName'])
    }
  }
  const searchInputChangeHandler = (event)=>{
    setSearchTerm(event.target.value)
   
  }

  const sortByChangeHandler = (event) => {
    setSortBy(event.target.value)
  }

  const previousPageClickHandler = ()=>{
    setPage(Math.max(1,page-1));
  }

  const nextPageClickHandler = ()=>{
    setPage(Math.min(totalPages,page+1));
    }

  return (<>
          <div className="search-sort-div">
            <label>
              <input placeholder="search for a name" type={"text"} className="search-input" onClick={searchClickHandler} onChange={searchInputChangeHandler}/>
            </label>
            <label >
              <select name="sort" id="sort" onChange={sortByChangeHandler}>
                <option value="">Sort By</option>
                <option value="ID">Id</option>
                <option value="age">Age</option>
                <option value="FirstNameLastName">Name</option>
              </select>
            </label>
          </div>
            
            <Table columns={columns} data={data} />
            <hr />
            <div className="pagenation-div">
              <div onClick={previousPageClickHandler} className="previous-button"> {"< Previous "} </div>
              &nbsp;Showing Page {page} of {totalPages} pages &nbsp;
              <div onClick={nextPageClickHandler} className="next-button"> {" Next >"} </div>
            </div>
            
          </>);
}

export default PagenatedTable;
