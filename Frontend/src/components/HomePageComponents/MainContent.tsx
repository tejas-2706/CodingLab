const MainContent = () => {
    return (
      <>
        <div className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-semibold mb-2">Practice customised mock interview with AI!</h2>
          <p className="mb-4">Get AI answers, tips and insights</p>
          <button className="bg-white text-teal-600 hover:bg-gray-100 px-4 py-2 rounded-md">Start for free</button>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recommended jobs (1)</h2>
            <a href="#" className="text-blue-600 text-sm">
              View all
            </a>
          </div>
  
          <div className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Driver</h3>
                <p className="text-sm text-gray-600">Primatech Visual Media</p>
                <p className="text-sm text-gray-600 mt-2">Ernakulam</p>
              </div>
              <div className="text-sm text-gray-500">4d ago</div>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-6">
            <img src="/placeholder.svg" alt="Resume Template" className="w-[150px] h-[200px] rounded-lg object-cover" />
            <div>
              <h2 className="text-lg font-semibold mb-4">Create your resume in 3 easy steps</h2>
              <ol className="space-y-2">
                <li>1. Add the missing details in your profile</li>
                <li>2. Choose a template for your resume</li>
                <li>3. Improve the content with AI</li>
              </ol>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Create resume
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default MainContent
  
  