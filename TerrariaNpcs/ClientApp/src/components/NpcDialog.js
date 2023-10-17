import {  useEffect, useState } from "react"
import { Modal, Tooltip, Form } from 'reactstrap';
import './styles/NpcDialog.css'
import { useForm } from 'react-hook-form'

const NpcDialog = ({ modal, toggle }) => {
    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            biome: 'Forest',
        }
    });
    const [width, setWidth] = useState(0)
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        handleResize()
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [setWidth])
    useEffect(() => {
        reset();

        console.log(errors)
    }, [modal])
    const sendNpc = (data) => {
        console.log(data)
        console.log(errors)

    };
    return (
        <Modal isOpen={modal} toggle={toggle} className="modalDialog" >
            <Form onSubmit={handleSubmit(sendNpc)}>
            <div className="containerNpcDialog " >
                <img src="./pasto.png" className="imgGrassDialog" alt="grass terraria"></img>
                    <div className="card rounded-0 cardIntDialog pt-1">
                        <input type="text" className={`form-control nameControl ${errors.name ? 'is-invalid' : ''}`} id='nameControl'
                            placeholder="name..." {...register("name", { required: true })} />
                        

                        <Tooltip placement={width < 680 ? 'bottom' : 'right'} target='nameControl' isOpen={errors.name ? true : false} className="tooltipDialog">
                            Name is required 
                        </Tooltip>

                    <hr className="hr" />
                        <img src="./images/placeholder.png" className=" rounded-0 imgCardDetails" alt="placeholder" />
                        <input type="file" className="form-control-sm" {...register("image")} />
                    <div className="card-body pb-0">

                        <div className="d-flex flex-wrap justify-content-center">
                            <div className="statisticsDialog mb-2">
                                <p className=" mb-2">Biome:</p>
                                <div style={{ color: "#b77e1b" }} className="d-flex">
                                        <img src={`./images/${watch("biome") }.webp`} alt="biome" className=" me-1"></img>
                                        
                                        <select className="form-select custom-select" {...register("biome")}>
                                        <option>
                                            Forest
                                        </option>
                                        <option>
                                            Desert
                                        </option>
                                        
                                        <option>
                                            Hallow
                                        </option>
                                        <option>
                                            Jungle
                                        </option>
                                        <option>
                                            Snow
                                        </option>
                                        <option>
                                            Underground
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="statisticsDialog">
                                <p className=" mb-2">Life:</p>
                                <div style={{ color: "#b77e1b" }} className="d-flex align-items-center">
                                    <img src={`./images/Life.webp`} alt="Life" className=" me-1" style={{ width: "25px", height:"25px" }}></img>
                                        <input type="number" className={`form-control inputInfo ${errors.maxLife ? 'is-invalid' : ''}`}
                                            {...register("maxLife", { required: true })} id="maxlife" />
                                    <Tooltip placement={width < 680 ? 'bottom' :'right' } target='maxlife' isOpen={errors.maxLife ? true : false} className="tooltipDialog">
                                        Life is required
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="statisticsDialog">
                                <p className=" mb-2" id="damage">Damage:</p>
                                <div style={{ color: "#b77e1b" }} className="d-flex align-items-center">
                                    <img src={`./images/damage.webp`} alt="damage" className=" me-1" style={{ width: "25px",  }}></img>
                                        <input type="number" className={`form-control inputInfo ${errors.damage ? 'is-invalid' : ''}`}
                                            {...register("damage", { required: true })} />
                                    <Tooltip placement={width < 680 ? 'bottom' :'left' }  target='damage' isOpen={errors.damage ? true : false} className="tooltipDialogLeft">
                                        Damage is required
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="statisticsDialog">
                                <p className=" mb-2">Defense:</p>
                                <div style={{ color: "#b77e1b" }} className="d-flex align-items-center">
                                    <img src={`./images/defense.webp`} alt="defense" className=" me-1" style={{ height: "30px",  }}></img>
                                    <input type="number" className={`form-control inputInfo ${errors.defense ? 'is-invalid' : ''}`}
                                        {...register("defense", { required: true })} id="defense"/>
                                    <Tooltip placement={width < 680 ? 'bottom' :'right' }  target='defense' isOpen={errors.defense ? true : false} className="tooltipDialog">
                                        Defense is required
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span id="speciality" >Job:</span>
                            <input className="form-control mt-1 mb-2" rows="1" {...register("speciality", { required: true })}></input>
                            <Tooltip placement='right' target='speciality' isOpen={errors.speciality ? true : false} className="tooltipDialog">
                                Job is required
                            </Tooltip>
                        </div>
                        <div>
                            <span id="description" >Description:</span>
                            <textarea type="textarea" className="form-control mt-1 mb-2" rows="3" {...register("description", { required: true })}></textarea>
                            <Tooltip placement='right' target='description' isOpen={errors.description ? true : false} className="tooltipDialog">
                                Description is required
                            </Tooltip>
                        </div>
                        
                        <button type="submit" className="btn btn-success m-3 btnDialog" >Add Npc</button>
                        <button  className="btn btn-secondary m-3 " onClick={toggle}>Cancel</button>

                    </div>
                </div>
            </div>

            </Form>

        </Modal>
    )
}
export default NpcDialog