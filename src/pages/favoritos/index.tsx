import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useEffect, useState } from "react";
import CardFav from "../../components/cardfavorito/cardfav";
import "./style.css";

interface ProductBookmarksProps{
    idBank: string,
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string, 
}

export function Favoritos() {
    const [products, setProducts] = useState<ProductBookmarksProps[]>([])

    useEffect(() => {
        function getBookmarks() {
            const BookmarksCollection = collection(db, 'bookmarks');
            const queryRef = query(BookmarksCollection, orderBy('bookmarkedAt', 'desc'));

            const unsub = onSnapshot(queryRef, (snapshot) => {
                const list = [] as ProductBookmarksProps[]
                snapshot.forEach((doc) => {
                    list.push(
                        {
                            idBank: doc.id,
                            id: doc.data().id,
                            title: doc.data().title,
                            price: doc.data().price,
                            description: doc.data().description,
                            category: doc.data().category,
                            image: doc.data().image,
                        }
                    )
                })
                setProducts(list)
            });
        }
        getBookmarks()
    }, [])

    return(
        <>
            <h1 className="text-bookmark">Estes são os seus produtos favoritos!</h1>
        
            <div className="card-list">
                {
                    products.map((item, index) => (
                        <CardFav 
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