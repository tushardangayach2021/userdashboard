export default {
    setUserId: function(id){
        localStorage.setItem("user_id", id)
    },
    getUserId: function(){
        return localStorage.getItem("user_id")
    },
    setDrawerOpen: function(bool){
        localStorage.setItem("drawer_open", bool);
    },
    getDrawerOpen: function(){
        return localStorage.getItem("drawer_open");
    }
}