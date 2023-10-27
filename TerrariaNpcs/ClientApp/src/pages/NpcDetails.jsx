import { useEffect, useState } from 'react';
import './styles/NpcDetails.css'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import NpcCardDetails from '../components/NpcCardDetails';
import NpcCardDetailsSkeleton from '../components/NpcCardDetailsSkeleton';

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
                    <NpcCardDetailsSkeleton/>
                ) : (
                        <NpcCardDetails npc={npc } />
                )}
            </div>
        </div>
    )
}
export default NpcDetails