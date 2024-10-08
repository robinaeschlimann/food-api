import {Redirect, Route} from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonicSafeString,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToast,
  setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {scan, search} from 'ionicons/icons';
import SearchPage from './pages/SearchPage';
import ScannerPage from './pages/ScannerPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
import '@ionic/react/css/palettes/dark.always.css';
import '@ionic/react/css/palettes/dark.class.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import React, {useState} from "react";
import {scanProduct} from "./services/ScannerService";

setupIonicReact();

const App: React.FC = () => {

  const [errorMessage, setErrorMessage] = useState<string|IonicSafeString>("");
  const [scannedBarcode, setScannedBarcode] = useState<string>("");

  async function doScan() {
    scanProduct().then( barcode => {
        setScannedBarcode( barcode );
    }).catch( error => {
      setErrorMessage( error.message );
    });
  }

  function resetScannedBarcode() {
    setScannedBarcode("");
  }

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/search">
            <SearchPage scannedBarcode={scannedBarcode} resetScannedBarcode={resetScannedBarcode} />
          </Route>
          <Route exact path="/scanner">
            <ScannerPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="searchPage" href="/search">
            <IonIcon aria-hidden="true" icon={search} />
            <IonLabel>Suchen</IonLabel>
          </IonTabButton>
          <IonTabButton tab="scanner" onClick={doScan}>
            <IonIcon aria-hidden="true" icon={scan} />
            <IonLabel>Scannen</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      <IonToast
          isOpen={!!errorMessage}
          onDidDismiss={() => setErrorMessage("")}
          message={errorMessage}
          duration={2000} />
    </IonReactRouter>
  </IonApp>
)};

export default App;
