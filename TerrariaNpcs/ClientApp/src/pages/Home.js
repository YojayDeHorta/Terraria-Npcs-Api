import { useEffect, useState } from "react"
import NpcCard from "../components/NpcCard";
import NpcDialog from "../components/NpcDialog";
import {  useSearchParams } from "react-router-dom";

const Home = (args) => {
    const [npcs, setNpcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const toggle = () => {
        setModal(!modal);
    };

    const getNpcs = async () => {
        try {
            setNpcs([])
            const response = await fetch(`api/npcs?page=${page}`);
            const data = await response.json();
            console.log(data)
            setNpcs(data.data);
        } catch (error) { console.log(error); }
        finally { setLoading(false); }
    }

    useEffect(() => {
        getNpcs()
    },[])
    return (
        <div className="container mt-5 d-flex flex-column ">
            <img src="./terraria.png" alt="terraria logo" style={{ maxWidth: "500px" }}></img>
            <button type="button" className="btn btn-primary" style={{ width: "100px" }} onClick={toggle}>Add Npc</button>
            <div className="d-flex justify-content-center flex-wrap">
                {
                npcs?.map(npc => (
                    <NpcCard key={npc.id} npc={npc} />
                ))}

            </div>
            <NpcDialog modal={modal} toggle={toggle} getNpcs={getNpcs} />
            
        </div>
    )
}
export default Home