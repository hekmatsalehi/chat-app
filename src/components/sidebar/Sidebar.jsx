import Navbar from '../navbar/Navbar'
import Search from '../search/Search'
import Chats from '../chats/Chats'
import './sidebar.scss'

function Sidebar() {
  return (
    <div className="sidebar">
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar