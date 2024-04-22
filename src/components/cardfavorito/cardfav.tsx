import { useNavigate } from "react-router-dom";
import { CardBody, CardButton, CardContainer, CardImg, CardFlex, CardTitle, CardText } from "../style-componentns/card/style";
import { HeartStraight  } from "@phosphor-icons/react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export interface CardProps {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string, 
}

const CardFav: React.FC<CardProps> = ({id, title, price, description, category, image }) => {
    const navigate = useNavigate()

    function handleShowMore(id: number) {
        const url = `/produto/${id}`;
        navigate(url, { replace: true})
    }

    async function checkBookmark() {
        const BookmarksCollection = collection(db, 'bookmarks');
        const queryRef = query(BookmarksCollection);
        
        const snapshot = await getDocs(queryRef);
    
        const isFavorited = snapshot.docs.some(doc => doc.data().id === id);
  
        return isFavorited;
    }

    async function handleBookmark() {
        if(await checkBookmark()) {
            alert('Este produto já foi favoritado. Confira o produto em nossa seção de Favoritos')
        } else {
            alert('Produto adicionado aos seus favoritos')
            addDoc(collection(db, 'bookmarks'), {
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                bookmarkedAt: new Date(),
            })
            .then(() => {
                console.log('Salvo no banco de dados');  
            })
            .catch((error) => {
                console.log('Erro ao favoritar protudo', error);
            })
        }
    }  

    return(
        <>
            <CardContainer>
                <CardImg src={image} />
                <CardBody>
                    <CardTitle>{title}</CardTitle> 
                    <CardFlex>
                        <CardText>R$ {price}</CardText>                        
                        <HeartStraight  size={26} color="#027333" weight="fill" onClick={handleBookmark} />
                    </CardFlex>
                    <CardButton onClick={() => handleShowMore(id)}>Ver Mais</CardButton>
                </CardBody>
            </CardContainer>

        </>
    )
}

export default CardFav;