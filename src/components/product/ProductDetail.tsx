import {IonCard, IonImg, IonItem, IonLabel, IonList, IonText} from "@ionic/react";
import "./product-detail.css";
import React from "react";

interface Product {
    name: string;
    image: string;
    ingredients: string;
    nutritionGrade: string;
    quantity: string;
    category: string;

}

interface ProductProps {
    product: Product;
}

const ProductDetail: React.FC<ProductProps> = ({ product } ) => {
    return (
        <div className="product-detail-container">
            <IonCard className="ion-padding">
                <div className="product-header">
                    <IonText className="product-name">
                        <h2>{product.name}</h2>
                    </IonText>
                    <IonImg src={product.image} alt={product.name} className="product-image" />
                </div>

                <IonList className="ion-no-margin">
                    <IonItem>
                        <IonLabel>Kategorie</IonLabel>
                        <IonText>{product.category}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Zutaten</IonLabel>
                        <IonText>{product.ingredients}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Nutri-Score</IonLabel>
                        <IonText>{product.nutritionGrade.toUpperCase()}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Inhalt</IonLabel>
                        <IonText>{product.quantity}</IonText>
                    </IonItem>
                </IonList>
            </IonCard>
        </div>
    );
}

export {ProductDetail};
export type {Product};