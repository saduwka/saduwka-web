import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/icons/logo.svg'
import heart from '../../assets/icons/heart_icon.svg'
import cart from '../../assets/icons/cart.svg'
import { pageRoutes } from '../../constants/pageRoutes'
import { Link } from 'react-router-dom'



const Header = () => {
return (
    <header className={styles.header}>
        <Link to={pageRoutes.commonRoutes.home} ><img src={logo} alt="logo" /></Link>
        <div className={styles.wrapper__search}>
            <input type="search" placeholder='search' className={styles.search}/>
        </div>

        <div className={styles.wrapper__btn}>
            <Link to={pageRoutes.cartRoutes.cart} className={styles.btn}><img src={cart} alt="cart" /></Link>
            <Link to={pageRoutes} className={styles.btn}><img src={heart} alt="cart" /></Link>
        </div>
    </header>
)
}

export default Header