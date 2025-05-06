import { HomeIcon, PuzzlePieceIcon, InformationCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Sidebar({ setCurrentView }) {
  return (
    <div className="w-64 bg-blue-600 text-white p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="itm-circle">ITM</div>
          <h1 className="text-xl font-bold">Isra Task Manager</h1>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-blue-700 rounded"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setCurrentView('other-apps')}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-blue-700 rounded"
          >
            <PuzzlePieceIcon className="h-5 w-5" />
            <span>Other Apps to Try</span>
          </button>
          <button
            onClick={() => setCurrentView('about')}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-blue-700 rounded"
          >
            <InformationCircleIcon className="h-5 w-5" />
            <span>About</span>
          </button>
          <button
            onClick={() => setCurrentView('contact')}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-blue-700 rounded"
          >
            <EnvelopeIcon className="h-5 w-5" />
            <span>Contact</span>
          </button>
        </nav>
      </div>
      <div className="text-sm">
        &copy; 2025 Isra Task Manager
      </div>
    </div>
  );
}