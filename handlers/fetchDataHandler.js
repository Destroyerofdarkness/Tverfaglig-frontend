

const deleteUser = async(user)=>{
    try{
       const res =await fetch(`http://localhost:4000/delete/${user}`,{
        method: "DELETE",
        body: JSON.stringify({user}),
        headers: {"Content-Type":"application/json"}
       })  
       const data = await res.json()
       console.log(data, "On deleting the user")
       return;
       
    }catch(err){
        console.log(err)
        return err;
    }
}

module.exports = {deleteUser}