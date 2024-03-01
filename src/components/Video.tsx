import { AspectRatio } from "@chakra-ui/react";

export interface VideoProps {
    src: string;
    onEnd: () => void
}
export const Video = ({src, onEnd}:VideoProps) => {

    

    return <AspectRatio ratio={1152/1080}>
        <video id="video" key={src} autoPlay={true}  muted onEnded={() => onEnd()}>
        <source src={src} type="video/mp4" />
    </video>
    </AspectRatio> 

}