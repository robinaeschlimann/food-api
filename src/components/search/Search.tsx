
import React from "react";
import {IonSearchbar} from "@ionic/react";
import {Product} from "../product/ProductDetail";
import {getProductByBarcode} from "../../services/FoodApiService";

interface SearchProps {
    onProductFound: (product: Product) => void;
    onProductNotFound: () => void;
    scannedBarcode?: string;
}

function handleInput(ev: any, onProductFound: (product: Product) => void, onProductNotFound: () => void, scannedBarcode?: string|null|undefined) {
    let barcode = scannedBarcode;

    if( ev )
    {
        const target = ev.target as HTMLIonSearchbarElement;
        barcode = target.value;
    }

    if( !barcode )
    {
        return;
    }

    getProductByBarcode(barcode).then( product => {
        if (product) {
            onProductFound(product);
        } else {
            onProductNotFound();
        }
    }).catch( () => {
        onProductNotFound();
    });
}

const Search: React.FC<SearchProps> = ( {onProductFound, onProductNotFound, scannedBarcode} ) => {

    if( scannedBarcode )
    {
        handleInput( null, onProductFound, onProductNotFound, scannedBarcode )
    }

    return (
        <div>
            <IonSearchbar animated={true} placeholder={"Suchen"} enterkeyhint={"enter"} onIonChange={(ev) => handleInput(ev, onProductFound, onProductNotFound, null)}></IonSearchbar>
        </div>
    );
};

export default Search;