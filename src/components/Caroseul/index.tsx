import { motion } from "framer-motion"
import { Recipes } from "../../@types/recipes"
import { Cards } from "../Cards"
import { useEffect, useRef, useState } from "react"


type CaroseulProps = {
    recipes: Recipes[],
    loading: boolean
}
export function Caroseul({recipes, loading}: CaroseulProps){

    const corouselRef = useRef<null | HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(()=>{
        if(corouselRef.current){
            setWidth(corouselRef.current?.scrollWidth - corouselRef.current?.offsetWidth)
        }
    }, [loading])

    return (
        <motion.div 
            ref={corouselRef}
            whileTap={{cursor: "grabbing"}}
            className="cursor-grab overflow-hidden p-5"
        >
            <motion.div
                drag="x"
                dragConstraints={{left: -width, right: 0}}
                className="flex gap-3 lg:justify-center items-center"
            >
                {recipes.map((item)=> (
                    <motion.div key={item._id}>
                        <Cards
                            _id={item._id}
                            name={item.name}
                            origin={item.origin}
                            tags={item.tags}
                            serves={item.serves}
                            ingredients={item.ingredients}
                            instructions={item.instructions}
                            description={item.description}
                            image={item.image}
                            stars={item.stars}
                            time={item.time}
                            createdBy={item.createdBy}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}