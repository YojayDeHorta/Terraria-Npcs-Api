const NpcCard = ({npc }) => {
    console.log(npc)
    return (
        <div>
            {npc.id}
            <div className="card shadow-sm" style={{ width: "18rem" }}>
                <img src={npc.imgLink} className="card-img-top" alt={npc.name}/>
                <div className="card-body">
                    <h5 className="card-title">{npc.name}</h5>
                    <p className="card-text">{npc.description}</p>
                </div>
            </div>
        </div>
    )
}
export default NpcCard