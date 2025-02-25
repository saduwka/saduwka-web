import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import styles from './ProductCardUI.module.css'

const ProductCardUI = ({
    cardImage,
    title,
    description,
    price,
    handleAddToCard,
    onClick
}) => { 
return (
    <Card className={styles.card} onClick={onClick}>
        <CardMedia
            className={styles.card__image}
            image={cardImage}
            title={title}
        />
        <CardContent>
            <Typography gutterBottom component={'div'}>
                {title}
            </Typography>
            <Typography>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size='small' onClick={(e) => {
                        e.stopPropagation(); 
                        handleAddToCard();
                        }}>Buy {price}$</Button>
            <Button size='small' variant='text'>Save</Button>
        </CardActions>
    </Card>
)
}

export default ProductCardUI