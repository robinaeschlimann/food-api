import {Product} from "../components/product/ProductDetail";
export function getProductByBarcode(barcode: string): Promise<Product> {
    return fetch( `https://world.openfoodfacts.org/api/v2/product/${barcode}` ).then( response => response.json() )
        .then( data => {

            if( data.status === 0 )
            {
                throw new Error( "Product not found" );
            }

            console.log( data );
            const product = data.product;
            return {
                name: product.product_name_de,
                ingredients: product.ingredients_text_de,
                image: product.image_front_small_url,
                nutritionGrade: product.nutrition_grades,
                quantity: product.quantity,
                category: product.generic_name_de
            };
        });
}