import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab1.css';
import Search from "../components/search/Search";
import React, {useState} from "react";
import {ProductDetail, Product} from "../components/product/ProductDetail";

const Tab1: React.FC = () => {
    const [product, setProduct] = useState<Product|null>(null);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <Search onProductFound={ setProduct } />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* Render the productFound details here */}
                {product && Object.keys(product).length > 0 ? (
                    <ProductDetail product={product} />
                ) : (
                    <p>No product found yet.</p>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
