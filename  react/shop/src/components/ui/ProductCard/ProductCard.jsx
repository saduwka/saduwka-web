import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Button from '../Button/Button';
import styles from './ProductCard.module.css';

const ProductCard = ({
    cardImage,
    title,
    description,
    price,
    handleBuy,
    handleAddToFavorite,
}) => {
    return (
        <Card className={styles.card}>
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
                <Button size='small' onClick={handleBuy}>Buy {price}$</Button>
                <Button size='small' variant='text' onClick={handleAddToFavorite}>Save</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard