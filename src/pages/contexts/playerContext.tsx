
import {createContext, ReactNode, useState} from 'react';


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
    playNext:()=>void,
    playPrevious:()=>void,
    setPlayState:(state:boolean)=>void,
    setPlayList:(list:Array<Episode>,index:number)=>void
}

export const PlayerContext = createContext({} as PlayerContextData);

interface PlayerChildrenProvider{
  children:ReactNode
}

export function PlayerContextProvider({children}:PlayerChildrenProvider){
  const [listPoadcast,setListPoadcast] = useState([])
  const [currentEpisodeIndex,setCurrentEpisodeIndex] = useState(0);
  const [isPlaying,setIsPlaying] = useState(false)

  function play(episode:Episode){
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

  function setPlayList(list:Array<Episode>,index:number){
    setListPoadcast(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function playNext(){
    const index = currentEpisodeIndex+1;
    if(index < listPoadcast.length){
      setCurrentEpisodeIndex(index)
    }
  }

  function playPrevious(){
    const index = currentEpisodeIndex-1;
    if(index > -1){
      setCurrentEpisodeIndex(index)
    }
  }

    return(
        <PlayerContext.Provider value={{currentEpisodeIndex,listPoadcast,play,isPlaying,togglePlay,playNext,playPrevious,setPlayState,setPlayList}}>
          {children}
        </PlayerContext.Provider>
    )
   
}

