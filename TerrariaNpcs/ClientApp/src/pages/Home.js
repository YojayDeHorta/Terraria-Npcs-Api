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
        <div className="container mt-5 d-flex flex-column">
            <img src="./terraria.png" alt="terraria logo" style={{ width:"500px" }}></img>
            <button type="button" className="btn btn-primary" style={{ width: "100px" }}>Add Npc</button>
            <div className="d-flex justify-content-center flex-wrap">
                {
                npcs?.map(npc => (
                    <NpcCard key={npc.id} npc={npc} />
                ))}

            </div>
            
        </div>
    )
}
export default Home