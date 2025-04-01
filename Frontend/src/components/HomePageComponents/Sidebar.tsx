const Sidebar = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-gray-200 mb-4"></div>
          <div className="text-center">
            <h2 className="font-semibold">Guest User</h2>
            <div className="text-sm text-red-500 mt-1">5% Profile</div>
          </div>
        </div>
  
        <div className="mt-6 space-y-2 text-sm">
          <p className="font-medium">What are you missing?</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>Daily job recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>Job application updates</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>Direct jobs from recruiters</span>
          </div>
        </div>
  
        <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md">Complete profile</button>
  
        <div className="mt-8 space-y-4">
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <span className="text-lg">🏠</span>
            My home
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <span className="text-lg">💼</span>
            Jobs
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <span className="text-lg">🏢</span>
            Companies
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <span className="text-lg">📝</span>
            Blogs
          </a>
        </div>
      </div>
    )
  }
  
  export default Sidebar
  
  