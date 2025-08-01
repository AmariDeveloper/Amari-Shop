import { useEffect } from "react"
//import HeroSection from "../../components/public/home/HeroSection"
import Navbar from "../../components/public/common/navigation/Navbar"
import { useGetAllPublishedProductsQuery } from "../../redux/slices/public/actionSlice"
import "../../styles/public/home.css"
import HomeCategories from "../../components/public/home/HomeCategories"
import HomeProducts from "../../components/public/home/HomeProducts"
import { useDispatch } from "react-redux"
import { setAllPublishedProducts } from "../../redux/slices/public/clientSlice"
import Footer from "../../components/public/common/Footer"
import AppNotification from "../../components/backend/common/AppNotification"
import HeroSection2 from "../../components/public/home/HeroSection2"

const Home = () => {
   const dispatch = useDispatch();
   const { data: published_products } = useGetAllPublishedProductsQuery({ refetchOnMountOrArgChange: true });

   useEffect(() => {
        if(published_products){
              dispatch(setAllPublishedProducts([...published_products.products]));
        }
   }, [dispatch, published_products])
  return (
    <>
           <Navbar />
           {/* <HeroSection /> */}
           <HeroSection2 />
           <HomeCategories />
            <HomeProducts />
           <Footer />
           <AppNotification />
    </>
  )
}

export default Home