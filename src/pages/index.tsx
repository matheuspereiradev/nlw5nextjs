import { GetStaticProps } from "next";
import { api } from "../services/axios";
import {format,parseISO} from 'date-fns';
import { ptBR } from "date-fns/locale";

interface Episodios{
  id:string,
  title:string,
  members:string
}

interface propsHome{
  episodios:Array<Episodios>

}

export default function Home(props:propsHome) {

  console.log(props.episodios[0].members)

  return (
    <>
      <h1>index page</h1>
      <p>{JSON.stringify(props.episodios)}</p>
    </>
  )
}

export const getStaticProps:GetStaticProps = async ()=>{
  
  const {data} = await api.get('episodes',{
    params:{
      _limit:12,
      _sort:"published_at",
      _order:"desc"
    }
  });

  const episodios = data.map(episode=>{
    return{
        id:episode.id,
        title:episode.title,
        thumbnail:episode.thumbnail,
        members:episode.members,
        description:episode.description,
        publishedAt:format(parseISO(episode.published_at), 'd MMM yy',{locale:ptBR}),
        duration:Number(episode.file.duration),
        url:episode.url
    }
    
  })

  return{
    props:{
      episodios: data
    },

    revalidate:60  //aqui define quanto tempo deve ser feita a requisição em getStaticProps
  }
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

  //modelo tradicional SPA
  //problema não vai ser indexado
  // useEffect(()=>{
  //   fetch('http://localhost:3039/episodes')
  //     .then(response=> response.json() )
  //     .then(data=> console.log(data))
  // },[])



