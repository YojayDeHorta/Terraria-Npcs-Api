import './styles/NpcCard.css'
const NpcCardSkeleton = ({ npc }) => {
    
    return (
        <div className="containerNpc m-3 " >

            <img src="./pasto.png" style={{ width: "180px" }} alt="grass terraria"></img>
            <div className="card rounded-0 cardInt pt-1 placeholder-glow">
                <h4 className="card-title placeholder-glow w-75 text-center">
                    <span className="placeholder w-75"></span>
                </h4>
                <hr className="hr" />


                <span className="placeholder skeletonImg" ></span>
                <div className="card-body pb-0">


                    <div className="statistics">
                        <p className=" mb-2">Biome:</p>
                        <div style={{ color: "#b77e1b" }} className="d-flex">
                            <img src={`./images/forest.webp`} alt="forest" className="me-1"></img>
                            <span className="placeholder " style={{ width:"50px" }}></span>
                        </div>
                    </div>
                    Job:<p className="placeholder-glow"> <span className="placeholder w-100" ></span></p>

                </div>
            </div>
        </div>
    )
}
export default NpcCardSkeleton