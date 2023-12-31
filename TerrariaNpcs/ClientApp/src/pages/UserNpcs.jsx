﻿import { useEffect, useState } from "react"
import NpcCard from "../components/NpcCard";
import NpcDialog from "../components/NpcDialog";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import NpcCardSkeleton from "../components/NpcCardSkeleton";
import { useAuthContext } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import NpcsNotFound from "../components/NpcsNotFound";

const UserNpcs = (args) => {
    const [npcs, setNpcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
    const [totalPages, setTotalPages] = useState(0);
    const [deleteModal, setdeleteModal] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const Auth = useAuthContext()
    let navigate = useNavigate(); 

    const toggle = () => {
        setModal(!modal);
    };

    const getNpcs = async (actualPage) => {
        try {
            if (Auth.user.id && Auth.token) {
                setNotFound(false)
                setLoading(true)
                setdeleteModal(false)
                setNpcs([])
                const response = await fetch(`api/npcs/user/${Auth.user.id}?page=${actualPage}`, {
                    headers: { "Authorization": `Bearer ${Auth.token}`}
                });
                const data = await response.json();
                console.log(data)
                setTotalPages(data.totalPages)
                setNpcs(data.data);
                document.title = 'Your Created Npcs'
                if (data.totalPages === 0) setNotFound(true)
                return
            }
            navigate('/');

        } catch (error) { console.log(error); }
        finally { setLoading(false); }
    }
    const handlePageClick = (event) => {
        setPage(event.selected);
        setSearchParams({ page: (event.selected) })
        getNpcs(event.selected + 1);
    };
    useEffect(() => {
        getNpcs(page + 1)
    }, [])
    return (
        <div className="d-flex  align-items-center flex-column">
            <div className="container pt-5 d-flex flex-column " style={{ minHeight: "100vh" }}>
                {/*<img src="./terraria.png" alt="terraria logo" style={{ maxWidth: "500px" }}></img>*/}
                <div className="d-flex pt-5">
                    <button type="button" className="btn btn-primary" style={{ width: "100px", display: deleteModal ? "none" : "block" }} onClick={toggle}>Add Npc</button>
                    
                    {!notFound &&
                    <button type="button" className="btn btn-danger ms-2" style={{ width: deleteModal ? "200px" : "100px" }} onClick={() => setdeleteModal(!deleteModal)}>
                        {deleteModal ? <span>Exit Delete Mode</span> : <span>Delete Mode</span>}

                    </button> }
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
                    {notFound && <NpcsNotFound></NpcsNotFound> }
                </div>
                <NpcDialog modal={modal} toggle={toggle} getNpcs={getNpcs} page={page} />
            </div>
            <Paginate actualPage={page} totalPages={totalPages} handlePageClick={handlePageClick} />

        </div>

    )
}
export default UserNpcs