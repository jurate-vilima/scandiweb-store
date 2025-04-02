import clsx from 'clsx';
import styles from './BurgerMenuButton.module.scss';

const BurgerMenuButton = ({ onClick, isOpen }) => (
    <button
        className={clsx(styles.burger, { [styles.open]: isOpen })}
        onClick={onClick}
        aria-label="Toggle menu"
    >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
    </button>
);

export default BurgerMenuButton;
