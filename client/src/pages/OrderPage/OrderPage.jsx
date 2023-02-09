import OrderFormComponent from "../../components/OrderFormComponent/OrderFormComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import useState from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const OrderPage=()=>{
    const [name, setName] = useState("")
    const navigate=useNavigate('')
    const getCookie = async () => {
      try {
        const { data } = await axios.get('http://localhost:8008/api/login', { withCredentials: true })
        setName(data.message)
      }
      catch (error) {
        console.log(error );
      }
    }
    
    getCookie()
    return(
      name&&navigate("/main")||<>
        <NavbarComponent/>
        <OrderFormComponent/>
        </>||name==undefined&&navigate("/login")
    )
}
export default OrderPage