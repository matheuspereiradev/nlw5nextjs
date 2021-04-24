export function convertDurationToTimeString(duration:number){
    const hours = Math.floor(duration / (60*60)) ;
    const minutes = Math.floor((duration%3600)/60);
    const seconds = duration%60;

    const finalresult = [hours,minutes,seconds].map(val=> String(val).padStart(2,'0')).join(':');

    return finalresult;
}