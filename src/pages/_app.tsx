import '../styles/global.scss'

//sempre que muda de rota esse arquivo aqui é carregado novamente
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} /> //esse component é a pagina
}

export default MyApp
