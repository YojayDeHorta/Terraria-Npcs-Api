import { useEffect, useState } from "react"
import NpcCard from "../components/NpcCard";
import NpcDialog from "../components/NpcDialog";
import {  useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import NpcCardSkeleton from "../components/NpcCardSkeleton";
import { BiMessageSquareAdd } from 'react-icons/bi';

const Home = (args) => {
    const [npcs, setNpcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
    const [totalPages, setTotalPages] = useState(0);
    const [deleteModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const getNpcs = async (actualPage) => {
        try {
            setLoading(true)
            setNpcs([])
            const response = await fetch(`api/npcs?page=${actualPage}`);
            const data = await response.json();
            //console.log(data)
            setTotalPages(data.totalPages)
            setNpcs(data.data);
            document.title = 'Terraria Npc Api'

        } catch (error) { console.log(error); }
        finally { setLoading(false); }
    }
    const handlePageClick = (event) => {
        setPage(event.selected );
        setSearchParams({ page: (event.selected ) })
        getNpcs(event.selected + 1);
    };
    useEffect(() => {
        getNpcs(page + 1)
    },[])
    return (
        <div className="d-flex align-items-center flex-column">
            <div className="container pt-5 d-flex flex-column " style={{ minHeight: "100vh" }}>
                <div className="d-flex pt-5">
                    <button type="button" className="btn btn-primary" style={{ width: "110px", display: deleteModal ? "none" : "block" }} onClick={toggle}>
                        Add Npc
                        {/*<BiMessageSquareAdd className="" />*/}
                    </button>
                    
                </div>
                <div className="d-flex justify-content-center flex-wrap" >

                    {loading ? (
                        [...Array(5)].map((x, i) => (
                            <NpcCardSkeleton key={i} />
                        ))
                    ) : (
                        npcs?.map(npc => (
                            <NpcCard key={npc.id} npc={npc} deleteModal={deleteModal} getNpcs={getNpcs} page={page} />
                        ))
                    )}
                </div>
                <NpcDialog modal={modal} toggle={toggle} getNpcs={getNpcs} page={page} />
            </div>
            <Paginate actualPage={page} totalPages={totalPages} handlePageClick={handlePageClick} />

        </div>
        
    )
}
export default Home