// External libraries
import { useEffect } from "react"

// Store
import { useAppDispatch } from "../store/hooks"
import { getAllProperties } from "../store/property/act/actGetAllProperties"

// Components
import Achievements from "../components/Home/Achievements/Achievements"
import Banner from "../components/Home/Banner/Banner"
import LandingPage from "../components/Home/LandingPage/LandingPage"
import OurProducts from "../components/Home/OurProducts/OurProducts"
import OurServices from "../components/Home/OurServices/OurServices"
import TypeOfProperties from "../components/Home/TypeOfProperties/TypeOfProperties"

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllProperties())
  }, [dispatch])

  return (
    <>
      <LandingPage />
      <TypeOfProperties />
      <OurProducts />
      <Achievements />
      <Banner />
      <OurServices />
      {/* <OurClients /> */}
    </>
  )
}

export default Home