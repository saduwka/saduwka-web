import styles from './Button.module.css';
import { Button as ButtonMUI } from '@mui/material';
import cn from 'classnames';

const Button = ({
    variant = "contained",
    size = "medium",
    children,
    className,
}) => {
    return (
        <ButtonMUI
            variant={variant}
            size={size}
            className={cn(styles.btn, className)}
        >
            {children}
        </ButtonMUI>
    )
}

export default Button