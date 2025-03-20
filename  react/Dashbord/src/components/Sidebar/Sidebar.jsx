import React from 'react'
import Logo from '../../assets/images/logo.png'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { Briefcase, ChartPie, Home, LogOut, Settings } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
        <div className={styles.content}>
            <img 
                className={styles.logo}
                src={Logo} 
                alt="Logo" 
            />
            <nav className={styles.nav}>
                <Link className={styles.navItem}>
                    <Home className={styles.navIcon} />
                </Link>
                <Link className={styles.navItem}>
                    <ChartPie className={styles.navIcon} />
                </Link>
                <Link className={styles.navItem}>
                    <Briefcase className={styles.navIcon} />    
                </Link>
                <Link className={styles.navItem}>
                    <Settings className={styles.navIcon} />
                </Link>

            </nav>
        </div>
        <button className={styles.logout}>
            <LogOut className={styles.logoutIcon} />
        </button>
    </aside>
  )
}

export default Sidebar