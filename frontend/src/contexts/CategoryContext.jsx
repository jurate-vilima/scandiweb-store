import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { graphQLRequest } from '@/services/api';
import { GET_CATEGORIES } from '@/graphql/categoryQueries';

export const CategoryContext = createContext({
    categories: [],
    activeCategory: null,
    setActiveCategory: () => {},
    isReady: false,
});

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const wasActiveCategorySetRef = useRef(false);
    const location = useLocation();

    const handleSetActiveCategory = useCallback((name) => {
        if (typeof name === 'string') {
            setActiveCategory(name.toLowerCase());
            wasActiveCategorySetRef.current = true;
        }
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await graphQLRequest(GET_CATEGORIES);
                const fetched = data.categories || [];
                setCategories(fetched);

                const isProductPage = location.pathname.startsWith('/product/');
                const isCategoryPage =
                    location.pathname.startsWith('/category/');

                if (
                    fetched.length > 0 &&
                    !wasActiveCategorySetRef.current &&
                    !isProductPage &&
                    !isCategoryPage
                ) {
                    setActiveCategory(fetched[0].name.toLowerCase());
                    wasActiveCategorySetRef.current = true;
                }

                setIsReady(true);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, [location.pathname, handleSetActiveCategory]);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                activeCategory,
                setActiveCategory: handleSetActiveCategory,
                isReady,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
