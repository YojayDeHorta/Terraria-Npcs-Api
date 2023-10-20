import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './styles/Paginate.css'
const Paginate = ({ actualPage, totalPages,handlePageClick }) => {
    console.log("actual page",actualPage)
    return (
        <>
            {
                totalPages?<ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                initialPage={ actualPage }
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="activo"
                /> : <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={2}
                    pageCount={actualPage+1}
                    initialPage={actualPage}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="activo"
                />
            }
            
        </>
       )
}
export default Paginate