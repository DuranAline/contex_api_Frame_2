import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import './style.css';

export interface ProductProps {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string, 
}

export function Home() {
    const [products, setProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        function getProducts() {
            fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then((data) => {
                setProducts(data);             
            })
            .catch((error) => {
                console.log(error);
            })
        }
        getProducts()
    }, [])
    
    return(
        <>
            <h1 className="welcome">Seja bem-vindo a nossa loja! Aproveite nossos produtos!</h1>
                
            <div className='card-list'>
                {
                    products.map((item, index) => (
                        <Card 
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            image={item.image}                         
                        />
                    ))
                }
            </div>
        </>
    )
}