import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab2.css';
import React from "react";

const ScannerPage: React.FC = () => {



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/*<IonButton onClick={scan}>Scan</IonButton>

        <IonToast
            isOpen={!!errorMessage}
            onDidDismiss={() => setErrorMessage("")}
            message={errorMessage}
            duration={2000} />*/}
      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;
