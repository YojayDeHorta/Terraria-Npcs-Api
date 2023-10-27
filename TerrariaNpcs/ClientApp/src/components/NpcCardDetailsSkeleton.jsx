


const NpcCardDetails = () => {
    
    return (
        <div className="containerNpcDetails m-3 ">

            <img src="./pasto.png" className="imgGrassDetails" alt="grass terraria"></img>
            <div className="card rounded-0 cardIntDetails pt-1">
                <h4 className="card-title placeholder-glow w-75 text-center">
                    <span className="placeholder w-75"></span>
                </h4>
                <hr className="hr" />


                <span className="placeholder skeletonImg" ></span>
                <div className="card-body pb-0">

                    <div className="d-flex flex-wrap justify-content-center">
                        <div className="statisticsDetails">
                            <p className=" mb-2">Biome:</p>
                            <div style={{ color: "#b77e1b" }}>
                                <img src={`./images/forest.webp`} alt="forest" className="me-1"></img>
                                <span className="placeholder " style={{ width: "50px" }}></span>
                            </div>
                        </div>
                        <div className="statisticsDetails">
                            <p className=" mb-2">Life:</p>
                            <div style={{ color: "#b77e1b" }}>
                                <img src={`./images/Life.webp`} alt="Life" className=" me-1"></img>
                                <span className="placeholder " style={{ width: "50px" }}></span>
                            </div>
                        </div>
                        <div className="statisticsDetails">
                            <p className=" mb-2">Damage:</p>
                            <div style={{ color: "#b77e1b" }}>
                                <img src={`./images/damage.webp`} alt="damage" className=" me-1"></img>
                                <span className="placeholder " style={{ width: "50px" }}></span>
                            </div>
                        </div>
                        <div className="statisticsDetails">
                            <p className=" mb-2">Defense:</p>
                            <div style={{ color: "#b77e1b" }}>
                                <img src={`./images/defense.webp`} alt="defense" className=" me-1"></img>
                                <span className="placeholder " style={{ width: "50px" }}></span>

                            </div>
                        </div>
                    </div>

                    Job:<p className="placeholder-glow"> <span className="placeholder w-100" ></span></p>
                    Description:<p className="placeholder-glow"> <span className="placeholder w-100" ></span></p>
                </div>
            </div>
        </div>
    )
}
export default NpcCardDetails