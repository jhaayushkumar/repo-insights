import { useState, useEffect } from 'react'
import Header from './components/Header'
import RepositoryInput from './components/RepositoryInput'
import ContributorList from './components/ContributorList'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import { fetchRepositoryData } from './utils/githubApi'
import type { Contributor } from './types'

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved ? JSON.parse(saved) : false
    })
    const [contributors, setContributors] = useState<Contributor[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const handleRepositorySubmit = async (repoUrl: string, timePeriod: string) => {
        setLoading(true)
        setError(null)
        setContributors([])

        try {
            const data = await fetchRepositoryData(repoUrl, timePeriod)
            setContributors(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch repository data')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/80 dark:bg-gray-900/80 transition-colors duration-200 relative">
            <AnimatedBackground />
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                        Repo Insights
                    </h1>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                        Analyze GitHub repository contributions and track pull request activity
                    </p>

                    <RepositoryInput onSubmit={handleRepositorySubmit} loading={loading} />
                </div>

                {error && (
                    <div className="card bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 mb-6">
                        <p className="text-red-700 dark:text-red-300 text-center">{error}</p>
                    </div>
                )}

                {loading && (
                    <div className="card text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            <p className="text-gray-600 dark:text-gray-300">Analyzing repository...</p>
                        </div>
                    </div>
                )}

                {!loading && contributors.length > 0 && (
                    <ContributorList contributors={contributors} />
                )}

                {!loading && !error && contributors.length === 0 && (
                    <div className="card text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Enter a GitHub repository URL above to get started
                        </p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default App
