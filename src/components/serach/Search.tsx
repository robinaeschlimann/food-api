
import React from "react";
import {IonSearchbar} from "@ionic/react";

function handleInput(ev: any) {
    const target = ev.target as HTMLIonSearchbarElement;
    const barcode = target.value;

    fetch( `https://world.openfoodfacts.net/api/v2/product/${barcode}` ).then( response => response.json() )
        .then( response => {
            console.log( response );
        } );
}

const Search: React = () => {
    return (
        <div>
            <IonSearchbar animated={true} placeholder={"Suchen"} enterkeyhint={"enter"} onIonChange={(ev) => handleInput(ev)}></IonSearchbar>
        </div>
    );
};

export default Search;