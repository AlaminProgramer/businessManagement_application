import decoder from 'jwt-decode'

const currentUser=()=>{
    if(localStorage.getItem('superToken')){
        const  decoded =decoder (localStorage.getItem('superToken'))
        return  decoded.type
    }
    return false
}
export default currentUser()