import { Divider, Stack,} from "@mui/material"
import AddUserItem from "./AddUserItem"


const SearchUser = ({sampleUsers}) => {
  return (
    <Stack spacing={'1rem'} sx={{
      height:'100%',
      overflowY:'auto',
      overflowX:'hidden',
    }}>
        {sampleUsers.map((user,index)=>{
            const {fullName,_id,avatar}=user
              return(
                <>
                    <AddUserItem key={index} name={fullName} _id={_id} avatar={avatar}/>
                    <Divider variant="middle"/>
                </>

            )
        })}
    </Stack>
  )
}

export default SearchUser