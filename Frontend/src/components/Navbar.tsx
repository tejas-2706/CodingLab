import { Bell, Menu, Search } from "lucide-react"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxpO67SIOhlAtP8yZJfEcahBvy5Y9Hsf6G7Q&s"
              alt="Naukri Logo"
              className="w-auto h-8 hover:cursor-pointer"
              onClick={()=>{navigate("/")}}
            />
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Jobs
                {/* <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1.5">1</span> */}
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Companies
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Services
                {/* <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1.5">1</span> */}
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search jobs here"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex px-4 py-2 border rounded-md hover:bg-gray-50" 
            onClick={()=>{navigate("/instruction-panel")}}
            >Give Exam</button>
            <Bell className="h-5 w-5 text-gray-600" />
            <Menu className="h-5 w-5 text-gray-600 md:hidden" />
            <div className="hidden md:block h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

