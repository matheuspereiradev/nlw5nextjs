
export default function Home(props) {

  console.log(props.episodios)
  //modelo tradicional SPA
  //problema não vai ser indexado
  // useEffect(()=>{
  //   fetch('http://localhost:3039/episodes')
  //     .then(response=> response.json() )
  //     .then(data=> console.log(data))
  // },[])



  return (
    <>
      <h1>index page</h1>
      <p>{JSON.stringify(props.episodios)}</p>
    </>
  )
}

//chamada via Next que diz que isso deve executar antes de carregar pagina SSR
// SEMPRE QUE O USUÁRIO ACESSAR VAI CHAMAR NO BACKEND ===> getServerSideProps
//É EXECUTA DE X TEMPO EM X TEMPO E SERVE UMA PAGINA ESTÁTICA =====> getStaticProps
// export async function getServerSideProps(){
  
//   const response = await fetch('http://localhost:3039/episodes')
//   const data = await response.json();


//   return{
//     props:{
//       episodios: data
//     }
//   }
// }

export async function getStaticProps(){
  
  const response = await fetch('http://localhost:3039/episodes')
  const data = await response.json();


  return{
    props:{
      episodios: data
    },

    revalidate:60  //aqui define quanto tempo deve ser feita a requisição em getStaticProps
  }
}


