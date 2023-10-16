import { useEffect, useState } from "react"
import { Modal } from 'reactstrap';
import './styles/NpcDialog.css'

const NpcDialog = ({ modal, toggle }) => {
    const [npc, setNpc] = useState({
        biome:"Forest"
    })
    return (
        <Modal isOpen={modal} toggle={toggle} className="modalDialog">
            
            <div className="containerNpcDetails " >
                <img src="./pasto.png" className="imgGrassDetails" alt="grass terraria"></img>
                <div className="card rounded-0 cardIntDetails pt-1">
                    <h4 className="card-title">name</h4>
                    <hr className="hr" />
                    <img src="./images/placeholder.png" className=" rounded-0 imgCardDetails" alt="placeholder" />
                    <div className="card-body pb-0">

                        <div className="d-flex flex-wrap justify-content-center">
                            <div className="statisticsDetails">
                                <p className=" mb-2">Biome:</p>
                                <div style={{ color: "#b77e1b" }}>
                                    <img src={`./images/${npc.biome}.webp`} alt="biome" className=" me-1"></img>
                                    biome
                                </div>
                            </div>
                            <div className="statisticsDetails">
                                <p className=" mb-2">Life:</p>
                                <div style={{ color: "#b77e1b" }}>
                                    <img src={`./images/Life.webp`} alt="Life" className=" me-1"></img>
                                    biome
                                </div>
                            </div>
                            <div className="statisticsDetails">
                                <p className=" mb-2">Damage:</p>
                                <div style={{ color: "#b77e1b" }}>
                                    <img src={`./images/damage.webp`} alt="damage" className=" me-1"></img>
                                    biome
                                </div>
                            </div>
                            <div className="statisticsDetails">
                                <p className=" mb-2">Defense:</p>
                                <div style={{ color: "#b77e1b" }}>
                                    <img src={`./images/defense.webp`} alt="defense" className=" me-1"></img>
                                    biome
                                </div>
                            </div>
                        </div>

                        Job:<p> </p>
                        Description:<p> </p>
                    </div>
                </div>
            </div>


        </Modal>
    )
}
export default NpcDialog