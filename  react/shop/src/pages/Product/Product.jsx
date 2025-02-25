import React from 'react' 
import styles from './Product.module.css'
import ProductDetails from '../ProductDetails/ProductDetails'
import { useParams } from 'react-router-dom'

const Product = () => {
  const {id} = useParams()
  return (
    <ProductDetails id={id} />
  )
}

export default Product