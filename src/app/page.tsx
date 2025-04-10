import ArtGrid from './components/ArtGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8 sm:p-16 font-[family-name:var(--font-geist-sans)]">
      <header className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="mb-6 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800">Art Institute of Chicago</h1>
            <p className="text-gray-500">Explore the collection</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <ArtGrid />
      </main>

      <footer className="max-w-7xl mx-auto mt-20 pt-8 text-center text-gray-400 text-sm">
        <p>
          Data provided by{' '}
          <a href="https://api.artic.edu/docs/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            The Art Institute of Chicago API
          </a>
        </p>
      </footer>
    </div>
  );
}
