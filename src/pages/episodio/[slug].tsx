import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import {useRouter} from 'next/router' 
import { api } from '../../services/axios';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import Image from 'next/image';
import Link from 'next/link';
import styles from './episode.module.scss'

interface Episodio{
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

interface propsEpisode{
    episodio:Episodio
}


export default function Episode(props:propsEpisode){

    //const router = useRouter()

    //console.log(router.query.slug)
    
    return(
        <div className={styles.episode}>
        <div className={styles.thumbnailContainer}>
          <Link href="/">
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar"/>
            </button>
          </Link>
          <Image
            width={700}
            height={160}
            src={props.episodio.thumbnail}
            objectFit="cover"
          />
          <button type="button">
            <img src="/play.svg" alt="Tocar episódio"/>
          </button>
        </div>
  
        <header>
          <h1>{props.episodio.title}</h1>
          <span>{props.episodio.members}</span>
          <span>{props.episodio.publishedAt}</span>
          <span>{props.episodio.durationAsString}</span>
        </header>
  
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: props.episodio.description }} />
      </div>
       
    )
}


export const getStaticPaths:GetStaticPaths = async () =>{

    const {data} = await api.get('episodes',{
        params:{
          _limit:2,
          _sort:"published_at",
          _order:"desc"
        }
      });

      const paths = data.map(ep=>{
          return{
            params:{
                slug:ep.id
            }
          }
      })

    return{
        paths,
        fallback:'blocking' 
        //será processado no node do next.js e depois vai ser exibido
        //se for true ele faz a requisição porem no client
        // if(router.isFallback){
        //     return(<p>Carregando...</p>)
        // }
        //false quando ele acessar uma pagina que não foi buildada ele daria 404
    }
}

export const getStaticProps:GetStaticProps = async (context)=>{
    const slug = context.params.slug;
    const {data} = await api.get(`episodes/${slug}`);
  
    const episodio ={
          id:data.id,
          title:data.title,
          thumbnail:data.thumbnail,
          members:data.members,
          description:data.description,
          publishedAt:format(parseISO(data.published_at), 'd MMM yy',{locale:ptBR}),
          duration:Number(data.file.duration),
          durationAsString:convertDurationToTimeString(Number(data.file.duration)),
          url:data.file.url
      }
      
    
  
    return{
      props:{
        episodio
      },
      revalidate:60  //aqui define quanto tempo deve ser feita a requisição em getStaticProps
    }
}
