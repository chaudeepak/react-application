import HomeFooter from "../home/components/footer-component";
import { Outlet } from "react-router-dom";
import Header from "../home/components/header-component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateCart } from "../../reducers/cart-reducer";

const HomePageLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateCart())
    }, [])
    
    return(<>
        <Header />

        <Outlet />

        <HomeFooter />
    </>)
} 

export default HomePageLayout;