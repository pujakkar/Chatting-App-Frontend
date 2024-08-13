import {keyframes, Skeleton, styled} from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom'
export const VisuallyHiddenInput=styled('input')({
    border:0,
    clip:'react(0 0 0 0)',
    height:1,
    margin:-1,
    overflow:'hidden',
    padding:0,
    position:'absolute',
    whiteSpace:'nowrap',
    width:1,
})
 const Link=styled(LinkComponent)`
    text-decoration:none;
    color:black;
    &:hover{
    background-color:rgb(167, 230, 255);
    }
`;

const bounceAnimation=keyframes`
0% {transform:scale(1);}
50% {transform:scale(1.5);}
100% {transform:scale(1);}
`

const BouncingSkeleton=styled(Skeleton)(()=>({
    animation:`${bounceAnimation} 1s infinite`,
}));

export  {BouncingSkeleton,Link}
