import { useEffect, useState } from "react"
import NpcCard from "../components/NpcCard";
import NpcDialog from "../components/NpcDialog";
import {  useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import NpcCardSkeleton from "../components/NpcCardSkeleton";
import { AiOutlineSearch } from 'react-icons/ai';
import { InputGroup, Input, Button } from 'reactstrap';

const Home = (args) => {
    const [npcs, setNpcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
    const [npcSearch, setNpcSearch] = useState(searchParams.get("search") || "");
    const [totalPages, setTotalPages] = useState(0);
    const [deleteModal] = useState(false);
    const [didRender, setDidRender] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const getNpcs = async (actualPage, npcSearch) => {
        try {
            setLoading(true)
            setNpcs([])
            const response = await fetch(`api/npcs?page=${actualPage}&search=${npcSearch}`);
            const data = await response.json();
            setTotalPages(data.totalPages)
            setPage(actualPage-1);
            setNpcs(data.data);
            document.title = 'Terraria Npcs'

        } catch (error) { console.log(error); }
        finally { setLoading(false); }
    }
    const handlePageClick = (event) => {
        console.log(event.selected)
        setSearchParams({ page: (event.selected), search: npcSearch })
        getNpcs(event.selected + 1, npcSearch);
    };
    const handleSearch = () => {
        setSearchParams({ page: 0, search: npcSearch })
        
        getNpcs(1, npcSearch)

    };
    useEffect(() => {
        getNpcs(page + 1, npcSearch)
        setDidRender(true);
    }, [])
    useEffect(() => {
        if (!npcSearch && didRender) {
            handleSearch()

        }
    }, [npcSearch])
    return (
        <div className="d-flex align-items-center flex-column">
            <div className="container pt-5 d-flex flex-column " style={{ minHeight: "100vh" }}>

                <div className="searchInput">
                    <InputGroup className="pt-5" >
                        <Input placeholder="search npc..." type="text" onChange={(e) => setNpcSearch(`${e.target.value}`)} value={npcSearch} />
                        <Button color="success" onClick={handleSearch }>
                            <AiOutlineSearch />
                        </Button>
                    </InputGroup>
                </div>
                <div className="d-flex pt-2">
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