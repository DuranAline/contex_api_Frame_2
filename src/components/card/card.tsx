import React from 'react';
import { useCart } from '../../context/CartContext'; 
import { CardBody, CardButton, CardContainer, CardImg, CardFlex, CardTitle, CardText, CartButton } from "../style-componentns/card/style";
import { HeartStraight } from "@phosphor-icons/react";
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

const Card: React.FC<CardProps> = ({id, title, price, description, category, image }) => {
    const { addItem } = useCart();

    function handleAddToCart() {
        addItem({
            id: id,
            title: title,
            price: price,
            quantity: 1  // Define a quantidade inicial como 1
        });
    }

    async function handleBookmark() {
        // Checa se o item já está nos favoritos
        const BookmarksCollection = collection(db, 'bookmarks');
        const queryRef = query(BookmarksCollection);
        
        const snapshot = await getDocs(queryRef);
        const isFavorited = snapshot.docs.some(doc => doc.data().id === id);
  
        if (isFavorited) {
            alert('Este produto já foi favoritado. Confira o produto em nossa seção de Favoritos');
        } else {
            alert('Produto adicionado aos seus favoritos');
            addDoc(collection(db, 'bookmarks'), {
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                bookmarkedAt: new Date(),
            }).then(() => {
                console.log('Salvo no banco de dados');  
            }).catch((error) => {
                console.log('Erro ao favoritar produto', error);
            });
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
                        <CartButton onClick={handleAddToCart}>Adicionar</CartButton>  {/* Botão para adicionar ao carrinho */}
                        <HeartStraight size={26} color="gray" weight="fill" onClick={handleBookmark} />  {/* Ícone para adicionar aos favoritos */}
                    </CardFlex>
                    <CardButton onClick={() => { /* Função para ver mais detalhes */ }}>Ver Mais</CardButton>
                </CardBody>
            </CardContainer>
        </>
    );
}

export default Card;