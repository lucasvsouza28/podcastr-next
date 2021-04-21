export default function parseTimeStamp(txt){
    if (!txt) return txt;

    txt = txt.toLocaleString();
    const sec_num = parseInt(txt, 10);
    const hours   = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);
    
    function padleft(txt) {
        return txt < 10 ? `0${txt}` : txt;
    }

    return padleft(hours) + ':' + padleft(minutes) + ':' + padleft(seconds);
};