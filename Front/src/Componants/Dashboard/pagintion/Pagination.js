import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import "./pageination.css";



export default function PaginatedItems({totlaData, itemsPerPage,data,setPage }) {
const pageCount=totlaData/itemsPerPage;

  return (
    <>
     
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e)=>setPage(e.selected+1)}
        pageRangeDisplayed={3}
        
        pageCount={pageCount}
        containerClassName='custem-pagention mt-4 me-4 d-flex align-items-center justify-content-end '
        pageLinkClassName='pagination-tag mx-2  text-success  rounded'
        activeLinkClassName='bg-success text-white'
        previousLabel="<<"
        previousLinkClassName="text-success"
        nextLinkClassName="text-success"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById('container')
// );