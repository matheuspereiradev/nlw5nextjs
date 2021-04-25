
import {createContext, useState} from 'react';


interface Episode{
    title:string,
    members:string,
    duration:number,
    thumbnail:string,
    url:string,
}

interface PlayerContextData{
    listPoadcast:Episode[],
    currentEpisodeIndex:number,
    isPlaying:boolean,
    play:(episode:Episode)=>void,
    togglePlay:()=>void,
    setPlayState:(state:boolean)=>void
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({children}){
  const [listPoadcast,setListPoadcast] = useState([])
  const [currentEpisodeIndex,setCurrentEpisodeIndex] = useState(0);
  const [isPlaying,setIsPlaying] = useState(false)

  function play(episode){
    setListPoadcast([episode]),
    setCurrentEpisodeIndex(0),
    togglePlay()
  }

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setPlayState(state:boolean){
    setIsPlaying(state)
  }

    return(
        <PlayerContext.Provider value={{currentEpisodeIndex,listPoadcast,play,isPlaying,togglePlay,setPlayState}}>
          {children}
        </PlayerContext.Provider>
    )
   
}

