import './styles/NpcCard.css'
import { useNavigate } from 'react-router-dom';
const NpcCard = ({ npc }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/npc/` + npc.id;
        navigate(path);
    }
    return (
        <div className="containerNpc m-3 " onClick={routeChange}>
            
            <img src="./pasto.png" style={{ width: "180px" }} alt="grass terraria"></img>
            <div className="card rounded-0 cardInt pt-1">
                <h4 className="card-title">{npc.name}</h4>
                <hr className="hr" />


                <img src={npc.imgLink} className=" rounded-0 imgCard"  alt={npc.name}/>
                <div className="card-body pb-0">
                    
                   
                    <div className="statistics">
                        <p className=" mb-2">Biome:</p>
                        <div style={{ color:"#b77e1b" }}>
                            <img src={`./images/${npc.biome}.webp`} alt={npc.biome} className=" me-1"></img>
                            {npc.biome}
                        </div>
                    </div>
                    Job:<p> {npc.speciality}</p>
                    
                </div>
            </div>
        </div>
    )
}
export default NpcCard