export default {
    setUserId: function(id){
        localStorage.setItem("user_id", id)
    },
    getUserId: function(){
        return localStorage.getItem("user_id")
    }
}