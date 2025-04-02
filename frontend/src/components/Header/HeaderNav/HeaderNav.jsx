import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './HeaderNav.module.scss';
import { kebabCase } from '@/utils/stringUtils';

const HeaderNav = ({
    categories,
    activeCategory,
    onLinkClick,
    isMobileMenuOpen,
}) => (
    <nav className={clsx(styles.nav, { [styles.navOpen]: isMobileMenuOpen })}>
        {categories.map((category) => {
            const kebabName = kebabCase(category.name);
            const isActive = activeCategory === kebabName;
            const testId = isActive ? 'active-category-link' : 'category-link';

            return (
                <NavLink
                    key={category.name}
                    to={`/category/${category.name}`}
                    data-testid={testId}
                    className={({ isActive: routeIsActive }) =>
                        clsx(styles.link, {
                            [styles.active]: routeIsActive || isActive,
                        })
                    }
                    onClick={onLinkClick}
                >
                    {(category.displayName || category.name).toUpperCase()}
                </NavLink>
            );
        })}
    </nav>
);

export default HeaderNav;
