import {IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar} from '@ionic/react';
import './SearchPage.css';
import Search from "../components/search/Search";
import React, {useState} from "react";
import {ProductDetail, Product} from "../components/product/ProductDetail";

const SearchPage: React.FC = () => {
    const [product, setProduct] = useState<Product|null>(null);

    const [productFound, setProductFound] = useState<boolean>(true);

    const handleProductFound = (product: Product) => {
        setProduct(product);
        setProductFound(true);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Barcode Suche</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <Search onProductFound={ handleProductFound } onProductNotFound={ () => setProductFound(false) } />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* Render the productFound details here */}
                {productFound && product && Object.keys(product).length > 0 && (
                    <ProductDetail product={product} />
                )}

                {!productFound && (
                    <IonText>Produkt nicht gefunden</IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default SearchPage;
