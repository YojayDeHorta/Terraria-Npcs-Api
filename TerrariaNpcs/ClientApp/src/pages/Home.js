import { useEffect, useState } from "react"
import NpcCard from "../components/NpcCard";
import NpcDialog from "../components/NpcDialog";
import {  useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import NpcCardSkeleton from "../components/NpcCardSkeleton";

const Home = (args) => {
    const [npcs, setNpcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(0)
    const toggle = () => {
        setModal(!modal);
    };

    const getNpcs = async (actualPage) => {
        try {
            setLoading(true)
            setNpcs([])
            const response = await fetch(`api/npcs?page=${actualPage}`);
            const data = await response.json();
            console.log(data)
            setTotalPages(data.totalPages)
            setNpcs(data.data);
        } catch (error) { console.log(error); }
        finally { setLoading(false); }
    }
    const handlePageClick = (event) => {
        console.log("event",event.selected)
        setPage(event.selected );
        setSearchParams({ page: (event.selected ) })
        getNpcs(event.selected + 1);
    };
    useEffect(() => {
        getNpcs(page + 1)
    },[])
    return (
        <div className="container mt-5 d-flex flex-column ">
            <img src="./terraria.png" alt="terraria logo" style={{ maxWidth: "500px" }}></img>
            <button type="button" className="btn btn-primary" style={{ width: "100px" }} onClick={toggle}>Add Npc</button>

            <div className="d-flex justify-content-center flex-wrap">
                
                {loading ? (
                    [...Array(5)].map((x, i) => (
                        <NpcCardSkeleton key={i} />
                    ))
                ) : (
                    npcs?.map(npc => (
                        <NpcCard key={npc.id} npc={npc} />
                    ))
                )}
            </div>
            <Paginate actualPage={page} totalPages={totalPages} handlePageClick={handlePageClick } />
            <NpcDialog modal={modal} toggle={toggle} getNpcs={getNpcs} />
        </div>
    )
}
export default Home