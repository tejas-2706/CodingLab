import MainContent from "./MainContent"
import RightSidebar from "./RightSidebar"
import Sidebar from "./Sidebar"

export const HomePage = () => {
    return <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <Sidebar />
          </div>
          <div className="md:col-span-6">
            <MainContent />
          </div>
          <div className="md:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
}