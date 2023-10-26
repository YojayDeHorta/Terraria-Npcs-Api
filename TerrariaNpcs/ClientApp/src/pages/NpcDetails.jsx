import { useEffect, useState } from 'react';
import './styles/NpcDetails.css'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const NpcDetails = () => {
    const [npc, setNpc] = useState({})
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    let { id } = useParams();
    const getNpc = async (id) => {
        try {
            const response = await fetch(`api/npcs/${id}`)
            const data = await response.json();
            setNpc(data);
            document.title = data?.name + ' Details' ?? 'Details'
        } catch (error) { console.log(error); }
        finally { setLoading(false); }

    }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, })
        getNpc(id)
    }, [])
    const goBack = () => {
        navigate(-1);
    }
    return (

        <div className="container mt-5">
            <button className="btn btn-success btnBack mt-5" onClick={goBack}> <IoIosArrowBack /> Go back</button>
            <div className="Details">
                {loading ? (
                    <div className="spinner-border " style={{ color: "#604436" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <div className="containerNpcDetails m-3 ">

                        <img src="./pasto.png" className="imgGrassDetails" alt="grass terraria"></img>
                        <div className="card rounded-0 cardIntDetails pt-1">
                            <h4 className="card-title">{npc.name}</h4>
                            <hr className="hr" />


                            <img src={npc.imgLink} className=" rounded-0 imgCardDetails" alt={npc.name} />
                            <div className="card-body pb-0">

                                <div className="d-flex flex-wrap justify-content-center">
                                    <div className="statisticsDetails">
                                        <p className=" mb-2">Biome:</p>
                                        <div style={{ color: "#b77e1b" }}>
                                            <img src={`./images/${npc.biome}.webp`} alt={npc.biome} className=" me-1"></img>
                                            {npc.biome}
                                        </div>
                                    </div>
                                    <div className="statisticsDetails">
                                        <p className=" mb-2">Life:</p>
                                        <div style={{ color: "#b77e1b" }}>
                                            <img src={`./images/Life.webp`} alt="Life" className=" me-1"></img>
                                            {npc.maxLife ? npc.maxLife : "n/a"}
                                        </div>
                                    </div>
                                    <div className="statisticsDetails">
                                        <p className=" mb-2">Damage:</p>
                                        <div style={{ color: "#b77e1b" }}>
                                            <img src={`./images/damage.webp`} alt="damage" className=" me-1"></img>
                                            {npc.damage ? npc.damage : "n/a"}
                                        </div>
                                    </div>
                                    <div className="statisticsDetails">
                                        <p className=" mb-2">Defense:</p>
                                        <div style={{ color: "#b77e1b" }}>
                                            <img src={`./images/defense.webp`} alt="defense" className=" me-1"></img>
                                            {npc.defense ? npc.defense : "n/a"}

                                        </div>
                                    </div>
                                </div>

                                Job:<p> {npc.speciality}</p>
                                Description:<p> {npc.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default NpcDetails