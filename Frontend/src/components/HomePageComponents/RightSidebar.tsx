const RightSidebar = () => {
    const jobStatuses = [
      "Actively searching jobs",
      "Preparing for interviews",
      "Appearing for interviews",
      "Received a job offer",
      "Casually exploring jobs",
      "Not looking for jobs",
    ]
  
    return (
      <>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-sm font-medium text-purple-600 mb-2">Needs attention</h2>
          <h3 className="font-semibold mb-4">Where are you in your job search journey?</h3>
          <div className="space-y-2">
            {jobStatuses.map((status) => (
              <button key={status} className="w-full px-4 py-2 text-left border rounded-md hover:bg-gray-50">
                {status}
              </button>
            ))}
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Never pay anyone to get a job</h3>
              <p className="text-sm text-gray-600">
                Fraudsters may ask you to invest money either to earn more OR to get you a job. Never make such payments.
              </p>
              <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default RightSidebar
  
  