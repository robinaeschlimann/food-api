import {BarcodeScanner} from "@capacitor-mlkit/barcode-scanning";

async function requestPermission() {
    const {camera} = await BarcodeScanner.requestPermissions();

    return camera === "granted" || camera === "limited";
}

export async function scanProduct() : Promise<string> {
    return BarcodeScanner.isSupported().then( async (result) => {

        if( !result.supported )
        {
            throw new Error( "Scanner wird auf diesem Gerät nicht unterstützt" );
        }

        const granted = await requestPermission();
        if( !granted ) {
            throw new Error( "Kamera-Zugriff verweigert" );
        }

        const installed = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

        if( !installed.available ) {
            throw new Error( "Google Barcode Scanner Modul nicht installiert" );
        }

        return await BarcodeScanner.removeAllListeners().then( async () => {


            await BarcodeScanner.addListener( "scanError", (event) => {
                console.log( event );
                BarcodeScanner.stopScan();

                throw new Error( event.message );
            })

            return await BarcodeScanner.scan().then( (result) => {
                console.log( result );

                BarcodeScanner.stopScan();

                return result.barcodes[0].displayValue;
            });
        }).catch( (error: Error) => {
            throw new Error( error.message );
        });
    } ).catch( ( error: Error ) => {
        throw new Error( error.message );
    });
}