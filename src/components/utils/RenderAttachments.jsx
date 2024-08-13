import { FileOpen as FileOpenIcon} from "@mui/icons-material"
import { transformImage } from "../lib/fileformat"


const RenderAttachments = ({file,url}) => {
    switch (file){
        case 'video': 
            return(
                <>
                <video src={url} width={'200px'} controls></video>
                </>
            )
        case 'audio':
            return(
                <audio src={url} controls></audio>
            )
        case 'image':
            return(
                <img src={transformImage(url,200)} width={'200px'} height={'250px'} 
                style={{
                    objectFit:'contain'
                }} alt="" />
            )
        default:
            <FileOpenIcon/>


    }
}

export default RenderAttachments