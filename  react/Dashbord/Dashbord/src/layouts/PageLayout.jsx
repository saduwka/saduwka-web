import React from 'react'
import styles from './PageLayout.module.css'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'

const PageLayout = ({
    heading,
    proccessBack,
}) => {
  return (
    <div className={styles.wrapper}>
        <Header 
            heading={heading} 
            proccessBack={proccessBack} 
        />

        <Sidebar />

        <main className={styles.main}>
            <Outlet />
        </main>
    </div>
  )
}

export default PageLayout
