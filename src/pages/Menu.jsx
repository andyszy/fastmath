import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">⚡ FastMath</h1>
          <p className="text-xl text-gray-600">Choose your practice mode</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/multiplication" className="block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="text-6xl mb-4">✖️</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">Multiplication</h2>
              <p className="text-gray-600 mb-4">Master multiplication tables 2-12 with spaced repetition</p>
              <div className="flex flex-wrap gap-2 justify-center text-sm">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Easy</span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Medium</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">Hard</span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Earn up to $5.50 in rewards
              </div>
            </div>
          </Link>

          <Link to="/squares" className="block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="text-6xl mb-4">²√</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">Squares & Roots</h2>
              <p className="text-gray-600 mb-4">Learn squares 1² through 12² and their roots</p>
              <div className="flex flex-wrap gap-2 justify-center text-sm">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">1² to 12²</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Square Roots</span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Earn up to $6.00 in rewards
              </div>
            </div>
          </Link>

          <Link to="/powers2" className="block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="text-6xl mb-4">2ⁿ</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors">Powers of 2</h2>
              <p className="text-gray-600 mb-4">Master 2⁰ through 2¹⁶ and their roots</p>
              <div className="flex flex-wrap gap-2 justify-center text-sm">
                <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-semibold">2⁰ to 2¹⁶</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Roots</span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Earn up to $8.50 in rewards
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <a href="https://github.com/andyszy/fastmath" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

