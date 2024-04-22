import { CardProps } from "../card/card";
import { CardContainer, CardFlex, CardBody, CardImg, CardText, CardTitle, CardTextColor, CardButtonGet } from "../style-componentns/card/styleTwo";

const CardTwo: React.FC<CardProps> = ({id, title, price, description, category, image}) => {
    return ( 
        <CardContainer>
            <CardFlex>
                <CardImg src={image} />
                <CardBody>
                    <CardTextColor>{category}</CardTextColor>
                    <CardTitle>{title}</CardTitle> 
                    <CardTextColor>R$ {price}</CardTextColor>
                    <CardText>{description}</CardText>
                    <CardButtonGet>Comprar</CardButtonGet>
                </CardBody>
           </CardFlex>
        </CardContainer>
    )
}
export default CardTwo;