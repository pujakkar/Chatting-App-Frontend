import { Grid, Skeleton, Stack } from "@mui/material"


const LayoutLoader = () => {
    return (
        <div style={{
            minHeight:'100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'rgb(5, 12, 156)'
    
        }}>
        <Grid container spacing='1rem'  sx={{
            height:'94vh',
            width:'94vw',
        }}>
            <Grid item lg={4} md={4}
            sx={{
                display:{
                    xs:'none',
                    md:'block',
                    lg:'block',
                },
                height:'100%',
                width:'100%',
            }}>
                <Skeleton variant="rectangular"/>
            </Grid>
            <Grid item lg={4} md={4}
            sx={{
                display:{
                    xs:'none',
                    md:'block',
                    lg:'block',
                },
                height:'100%',
                width:'100%',
            }}>
                <Stack>
                    {Array.from({length:10}).map((_,index)=>(
                        <Skeleton key={index} height={'5rem'} variant="rounded"/> 
                    ))}
                </Stack>
                
            </Grid>
            <Grid item lg={4} md={4} xs={12}
            sx={{
                display:{
                    xs:'block',
                    md:'block',
                    lg:'block',
                },
                height:'100%',
                width:'100%',
            }}>
                <Skeleton variant="rectangular"/>       

            </Grid> 
        </Grid>
        </div>
      )
}

export default LayoutLoader