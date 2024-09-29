
import React from "react";
import {IonSearchbar} from "@ionic/react";
import {Product} from "../product/ProductDetail";

interface SearchProps {
    onProductFound: (product: Product) => void;
}

function handleInput(ev: any, onProductFound: (product: Product) => void) {
    const target = ev.target as HTMLIonSearchbarElement;
    const barcode = target.value;

    fetch( `https://world.openfoodfacts.org/api/v2/product/${barcode}` ).then( response => response.json() )
        .then( data => {
            console.log( data );
            const product = data.product;
            onProductFound({
                name: product.product_name_de,
                ingredients: product.ingredients_text_de,
                image: product.image_front_small_url,
                nutritionGrade: product.nutrition_grades,
                quantity: product.quantity,
                category: product.generic_name_de
            } );
        } );
}

const Search: React.FC = ( {...props}: SearchProps ) => {
    return (
        <div>
            <IonSearchbar animated={true} placeholder={"Suchen"} enterkeyhint={"enter"} onIonChange={(ev) => handleInput(ev, props.onProductFound)}></IonSearchbar>
        </div>
    );
};

export default Search;