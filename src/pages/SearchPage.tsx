import {IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar} from '@ionic/react';
import './SearchPage.css';
import Search from "../components/search/Search";
import React, {useState} from "react";
import {ProductDetail, Product} from "../components/product/ProductDetail";

interface SearchPageProps {
    scannedBarcode: string;
    resetScannedBarcode: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ( {scannedBarcode, resetScannedBarcode} ) => {
    const [product, setProduct] = useState<Product|null>(null);

    const [productFound, setProductFound] = useState<boolean>(true);

    const handleProductFound = (product: Product) => {
        setProduct(product);
        resetScannedBarcode();
        setProductFound(true);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Barcode Suche</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <Search scannedBarcode={scannedBarcode} onProductFound={ handleProductFound } onProductNotFound={ () => setProductFound(false) } />
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
