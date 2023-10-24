import { useState } from 'react';
import './styles/NpcCard.css'
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';

const NpcCard = ({ npc, deleteModal, getNpcs, page }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/npc/` + npc.id;
        navigate(path);
    }
    const [loading, setLoading] = useState(false);

    const deleteNpc = async() => {
        
        try {
            setLoading(true)
            const response = await fetch(`api/npcs/${npc.id}`, {
                method: 'DELETE',
            });
            const data = await response.status;
            console.log(data)
            getNpcs(page + 1);
        } catch (error) { console.log(error); }
        finally { setLoading(false); }
        
    }
    return (
        <div className={`containerNpc m-3  ${deleteModal ? 'containerNpcShake' : 'containerNpcHover'}`} onClick={deleteModal?null:routeChange}>
            
            <img src="./pasto.png" style={{ width: "180px" }} alt="grass terraria"></img>
            <div className="card rounded-0 cardInt pt-1">
                <div className="d-flex justify-content-around w-100 text-center">
                    <h4 className="card-title w-75">{npc.name}</h4>
                    {deleteModal && !loading ? <button type="button" disabled={loading} className="btn-close " aria-label="Close" onClick={deleteNpc} ></button> : null}
                    {loading ?<Spinner color="danger" style={{
                            height: '1.5rem',width: '1.5rem',marginTop:"2px"}}>
                            Loading...
                        </Spinner>:null
                    }
                </div>
                

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