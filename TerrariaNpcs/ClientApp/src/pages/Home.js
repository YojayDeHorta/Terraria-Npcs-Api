import { useEffect, useState } from "react"
import NpcCard from "../components/NpcCard";

const Home = () => {
    const [npcs, setNpcs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNpcs = async () => {
        try {
            setNpcs([])
            const response = await fetch(`api/npcs`);
            const data = await response.json();
            console.log(data)
            setNpcs(data);
        } catch (error) { console.log(error); }
        finally { setLoading(false); }
    }

    useEffect(() => {
        getNpcs()
    },[])
    return (
        <div className="container mt-5">
            <button type="button" className="btn btn-primary">Add Npc</button>
            { 
                npcs?.map(npc =>(
                    <NpcCard key={npc.id} npc={npc} />
            ))}
        </div>
    )
}
export default Home