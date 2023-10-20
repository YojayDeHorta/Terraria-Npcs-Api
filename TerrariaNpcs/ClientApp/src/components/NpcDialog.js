import {  useEffect, useRef, useState } from "react"
import { Modal, Tooltip, Form } from 'reactstrap';
import './styles/NpcDialog.css'
import { useForm } from 'react-hook-form'

const NpcDialog = ({ modal, toggle, getNpcs }) => {
    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            biome: 'Forest',
        }
    });
    const [width, setWidth] = useState(0);
    const inputFile = useRef(null) 
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bisImage, setBisImage] = useState(false);

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
        setSelectedImage(null);
        setLoading(false);
        setBisImage(false)
    }, [modal])
    const sendNpc = async(data) => {
        if (!selectedImage) {
            setBisImage(true)

            return;
        }
        if (selectedImage) {
            setLoading(true);
            let formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            formData.append('imagen', selectedImage);

            const response = await fetch(`api/npcs`,{
                method: 'POST',
                body: formData
            })
            const responseData = await response.json();
            console.log(responseData)
            getNpcs();
            toggle();
        }
    };
    
    const onImgClick = (event) => {
        let type = event.target.files[0]?.type;
        if (type === "image/jpg" || type === "image/jpeg" || type === "image/png") {
            setBisImage(false)
            setSelectedImage(event.target.files[0]);
        } 
        
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
                        <img src={selectedImage ? URL.createObjectURL(selectedImage) : "./images/placeholder.png"}
                            className={` imgCardDialog ${bisImage ? 'errorImg' : ''}`}
                            alt="placeholder" onClick={() => inputFile.current.click()} id="controlImg" />
                        <i class="arrowModal " style={{ display: bisImage ? 'flex' : 'none' }}></i>
                        <span style={{ display: bisImage ? 'flex' : 'none' }} className="text-center">Don't forget to add the image of the npc!</span>
                        <input type='file' id='file' ref={inputFile} className="form-control-sm" style={{ display: 'none' }} onChange={onImgClick} accept="image/jpg, image/jpeg, image/png" />
                    <div className="card-body pb-0">

                        <div className="d-flex flex-wrap justify-content-center">
                            <div className="statisticsDialog mb-4">
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
                                            {...register("maxLife", { min: 1,max:999 })} id="maxlife" />
                                    <Tooltip placement={width < 680 ? 'bottom' :'right' } target='maxlife' isOpen={errors.maxLife ? true : false} className="tooltipDialog">
                                        Life can be between 1 and 999
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="statisticsDialog">
                                <p className=" mb-2" id="damage">Damage:</p>
                                <div style={{ color: "#b77e1b" }} className="d-flex align-items-center">
                                    <img src={`./images/damage.webp`} alt="damage" className=" me-1" style={{ width: "25px",  }}></img>
                                        <input type="number" className={`form-control inputInfo ${errors.damage ? 'is-invalid' : ''}`}
                                            {...register("damage", { min: 1, max: 999 })} />
                                    <Tooltip placement={width < 680 ? 'bottom' :'left' }  target='damage' isOpen={errors.damage ? true : false} className="tooltipDialogLeft">
                                        Damage can be between 1 and 999
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="statisticsDialog">
                                <p className=" mb-2">Defense:</p>
                                <div style={{ color: "#b77e1b" }} className="d-flex align-items-center">
                                    <img src={`./images/defense.webp`} alt="defense" className=" me-1" style={{ height: "30px",  }}></img>
                                    <input type="number" className={`form-control inputInfo ${errors.defense ? 'is-invalid' : ''}`}
                                        {...register("defense", { min: 1,max:999 })} id="defense"/>
                                    <Tooltip placement={width < 680 ? 'bottom' :'right' }  target='defense' isOpen={errors.defense ? true : false} className="tooltipDialog">
                                       Defense can be between 1 and 999

                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span id="speciality" >Job:</span>
                                <input className="form-control mt-1 mb-2" rows="1" {...register("speciality", { required: true, maxLength: 40 })}></input>
                               
                            <Tooltip placement='right' target='speciality' isOpen={errors.speciality?.type==="required" ? true : false} className="tooltipDialog">
                                Job is required
                            </Tooltip>
                            <Tooltip placement='right' target='speciality' isOpen={errors.speciality?.type==="maxLength" ? true : false} className="tooltipDialog">
                                Max text length is 40
                            </Tooltip>
                        </div>
                        <div>
                            <span id="description" >Description:</span>
                            <textarea type="textarea" className="form-control mt-1 mb-2" rows="3" {...register("description", { required: true, maxLength: 255 })}></textarea>
                            <Tooltip placement='right' target='description' isOpen={errors.description?.type==="required" ? true : false} className="tooltipDialog">
                                Description is required
                                </Tooltip>
                            <Tooltip placement='right' target='description' isOpen={errors.description?.type==="maxLength" ? true : false} className="tooltipDialog">
                                Max text length is 255
                            </Tooltip>
                        </div>

                            <button type="submit" className="btn btn-success m-3 btnDialog" disabled={loading}>
                                {
                                    loading ?
                                        <div>
                                            <span> Adding...</span>
                                            <div className="spinner-border spinner-border-sm text-light ms-1" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                     : <span> Add Npc</span>
                                }
                            </button>
                        <button type="button" className="btn btn-secondary m-3 " onClick={toggle}>Cancel</button>

                    </div>
                </div>
            </div>

            </Form>

        </Modal>
    )
}
export default NpcDialog