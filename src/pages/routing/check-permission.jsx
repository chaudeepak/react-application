import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckPermission = ({Component}) => {
    // let user = {
    //     role: "admin",
    // }

    // if(user && user.role === role){
    //     toast.success("login successful")
    //     return Component;
    // } else{
    //     toast.warn("you do not have previliage");
    //     return <Navigate to={"/" + user.role} />
    // }

    // let loggedinUser = localStorage.getItem()

    let loggedInuser = useSelector((rootStore) => {
        return rootStore.User?.loggedInUser
    })
    console.log(loggedInuser)

    if(loggedInuser === 'QpwL5tke4Pnpja7X4') {
        toast.success("successfully loggedin")
        return Component
    } else {
        toast.error('you do not have previliage')
    }
}

export default CheckPermission;