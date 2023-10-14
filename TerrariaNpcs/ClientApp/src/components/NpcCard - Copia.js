import './NpcCard.css'
const NpcCard = ({ npc }) => {
    console.log(npc)
    return (
        <div className="containerNpc">
            
            <img src="./pasto.png" style={{ width: "200px" }} alt="grass terraria"></img>
            <div className="card rounded-0 cardInt pt-1">
                <h5 className="card-title">{npc.name}</h5>
                <hr class="hr" />


                <img src={npc.imgLink} className=" rounded-0 imgCard"  alt={npc.name}/>
                <div className="card-body">
                    
                    <div class="row">
                        <div className="col statistics">
                            <p>Life</p>
                            <div>
                                {npc.maxLife}
                                <img src="./images/life.webp" alt="" className="mx-1"></img>
                            </div>
                        </div>
                        <div class="col">
                            2 of 2
                        </div>
                    </div>
                    <p className="card-text">{npc.description}</p>
                </div>
            </div>
        </div>
    )
}
export default NpcCard