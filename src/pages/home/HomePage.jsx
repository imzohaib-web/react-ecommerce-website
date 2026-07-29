import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './productsGrid';

export function HomePage({cart}) {
    //using state to generate the html from backend
    const [products, setProducts] = useState([]);
   
    //products load over and over again and thus we use useEffect to load it once it let us control when some code runs
    useEffect(() => {
        axios.get('/api/products')//fetch contact backend but takes some time for backend to respond and then runs below function
            //axios is a cleaner way to make requests to backend get data directly
            .then((response) => {
                console.log('Products loaded:', response.data);
                setProducts(response.data)
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
            
    },[])

    return (
        <>
            <Header cart = {cart}/>

            <div className="home-page">
                <ProductsGrid products = {products} />
            </div>
        </>
    );
}
