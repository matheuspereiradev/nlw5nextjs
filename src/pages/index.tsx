import { GetStaticProps } from "next";
import { api } from "../services/axios";
import Image from 'next/image';
import Link from 'next/link';
import {format,parseISO} from 'date-fns';
import { ptBR } from "date-fns/locale";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import style from './home.module.scss'
import { useContext } from "react";
import { PlayerContext } from "./contexts/playerContext";

interface Episodios{
  id:string,
  title:string,
  members:string,
  thumbnail:string,
  description:string,
  publishedAt:string,
  duration:number,
  durationAsString:string,
  url:string
}

interface propsHome{
  todosEp:Array<Episodios>,
  ultimosEp:Array<Episodios>,

}

export default function Home(props:propsHome) {

  const {setPlayList}= useContext(PlayerContext);

  const allEpisodes = [...props.ultimosEp,...props.todosEp ]

  return (
    <div className={style.homepage}>
      <section className = {style.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>

        <ul>
          {props.ultimosEp.map((episode,index) => (
            <li key={episode.id}>
              <Image 
                width={192}
                height={192}
                src={episode.thumbnail} 
                alt={episode.title}
                objectFit="cover"
              />

              <div className={style.episodeDetails}>
                <Link href={`/episodio/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                  
                
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button onClick={()=>{setPlayList(allEpisodes,index)}}>
                <img src="/play-green.svg" alt="Tocar episódio"/>
              </button>
            </li>
          ))}
        </ul>

      </section>
      <section className={style.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {props.todosEp.map((episode, index) => (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image 
                      width={120}
                      height={120}
                      src={episode.thumbnail} 
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodio/${episode.id}`} passHref>
                      <a href={`/episodio/${episode.id}`}>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={()=>{setPlayList(allEpisodes,index+props.ultimosEp.length)}}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </section>
    </div>
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
        durationAsString:convertDurationToTimeString(Number(episode.file.duration)),
        url:episode.file.url
    }
    
  })

  const ultimosEp = episodios.slice(0,2)
  const todosEp = episodios.slice(2,episodios.length)

  return{
    props:{
      ultimosEp,
      todosEp
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



