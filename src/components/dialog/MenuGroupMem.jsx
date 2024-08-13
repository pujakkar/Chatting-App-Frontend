import {  Menu} from "@mui/material"



const MenuGroupMem = ({open,handleClose,anchorEl,_id,membersRemove}) => {


    const handleClick=()=>{
        membersRemove(_id)
    }
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={handleClose}
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >

        <button style={{border:'none',background:'none',cursor:'pointer'}} onClick={handleClick}>
            Remove from group
        </button>
    </Menu>
  )
}

export default MenuGroupMem