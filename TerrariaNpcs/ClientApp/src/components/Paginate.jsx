import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './styles/Paginate.css'
const Paginate = ({ actualPage, totalPages,handlePageClick }) => {
    const [toggle, setToggle] = useState(true);

    const togglePage = () => {
        setToggle(!toggle)
    };
    return (
        <div className="sticky-bottom d-flex flex-column align-items-center">
            <button type="button" className="btn btn-success btnPagination"  onClick={togglePage}>
                
                {
                    toggle ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                }
            </button>
            <div style={{ display: toggle ? "none" : "block" }}>
                {
                    totalPages ? <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        initialPage={actualPage}
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
                        pageCount={actualPage + 1}
                        initialPage={actualPage}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination "
                        pageClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="activo"
                    />
                }
            </div>
            
            
        </div>
       )
}
export default Paginate