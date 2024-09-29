import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar} from '@ionic/react';
import './Tab2.css';
import {BarcodeScanner} from "@capacitor-mlkit/barcode-scanning";
import React, {useState} from "react";

const ScannerPage: React.FC = () => {

    async function requestPermission() {
        const {camera} = await BarcodeScanner.requestPermissions();

        return camera === "granted" || camera === "limited";
    }
    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    async function scan() {
        BarcodeScanner.isSupported().then( async (result) => {
            console.log( result );

            if( !result.supported )
            {
                setErrorMessage( "Scanner wird auf diesem Gerät nicht unterstützt" );
                return;
            }

            const granted = await requestPermission();
            if( !granted ) {
                setErrorMessage( "Kamera-Zugriff verweigert" )
                return;
            }

            const installed = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

            if( !installed.available ) {
                setErrorMessage( "Google Barcode Scanner Modul nicht installiert" );
                return;
            }

            await BarcodeScanner.removeAllListeners().then( async () => {
                await BarcodeScanner.addListener("barcodeScanned", (event) => {
                    console.log(event);
                    BarcodeScanner.stopScan().then(() => history.pushState("/search", "test", "/search"));
                })

                await BarcodeScanner.addListener( "scanError", (event) => {
                    console.log( event );

                    BarcodeScanner.stopScan().then( () => history.pushState( "/search", "test", "/search" ) );
                })

                await BarcodeScanner.scan();
            })
        } ).catch( (error) => {
            setErrorMessage( error.message )
        });
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={scan}>Scan</IonButton>

        <IonToast
            isOpen={!!errorMessage}
            onDidDismiss={() => setErrorMessage(null)}
            message={errorMessage}
            duration={2000} />
      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;
