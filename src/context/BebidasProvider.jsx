import { createContext, useEffect, useState } from "react";
import axios from "axios";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {

    const [bebidas, setBebidas] = useState([]);

    const [modal, setModal] = useState(false);

    const [id, setId] = useState(null);

    const [receta, setReceta] = useState({})
    
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        setCargando(true);

        const consultarInfo = async () => {
            if(!id) return


            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

                const { data } = await axios(url);

                setReceta(data.drinks[0]);
            } catch (error) {
                console.log(error);
            }finally{
                setCargando(false); 
            }
        }

        consultarInfo();
    }, [id])


    const consultarBebidas = async (datos) => {

        const { categoria, nombre } = datos;

        try {

            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}` //Filtramos por nombre y categoria

            const { data } = await axios(url);

            setBebidas(data.drinks);


        } catch (error) {
            console.log(error);
        }

    }

    const handleModalClick = () => {
        setModal(!modal);
    }

    const handleBebidaId = id => {
        setId(id);
    }

    return (

        <BebidasContext.Provider value={{
            consultarBebidas,
            bebidas,
            handleModalClick,
            modal,
            handleBebidaId,
            setId,
            receta,
            cargando
           
        }}>
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext