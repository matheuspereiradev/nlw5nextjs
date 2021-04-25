import { Header } from '../components/header'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { Player } from '../components/player'
import { PlayerContextProvider } from './contexts/playerContext'


//sempre que muda de rota esse arquivo aqui é carregado novamente
function MyApp({ Component, pageProps }) {

  return (
      <div className={styles.appWrapper}>
        <PlayerContextProvider>
          <main>
            <Header/>
            <Component {...pageProps} /> 
          </main>
          <Player/>
        </PlayerContextProvider>
      </div> 
    )//esse component é a pagina
}

export default MyApp
