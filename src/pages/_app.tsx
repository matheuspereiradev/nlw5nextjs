import { Header } from '../components/header'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { Player } from '../components/player'

//sempre que muda de rota esse arquivo aqui é carregado novamente
function MyApp({ Component, pageProps }) {
  return (
      <div className={styles.appWrapper}>
        <main>
          <Header/>
          <Component {...pageProps} /> 
        </main>
        <Player/>
        
      </div> 
    )//esse component é a pagina
}

export default MyApp
