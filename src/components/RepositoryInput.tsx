import { useState } from 'react'

interface RepositoryInputProps {
    onSubmit: (repoUrl: string, timePeriod: string) => void
    loading: boolean
}

export default function RepositoryInput({ onSubmit, loading }: RepositoryInputProps) {
    const [repoUrl, setRepoUrl] = useState('')
    const [timePeriod, setTimePeriod] = useState('3months')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (repoUrl.trim()) {
            onSubmit(repoUrl.trim(), timePeriod)
        }
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        GitHub Repository URL
                    </label>
                    <input
                        id="repo-url"
                        type="text"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/owner/repository"
                        className="input-field"
                        disabled={loading}
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Enter the full URL of any public GitHub repository
                    </p>
                </div>

                <div>
                    <label htmlFor="time-period" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Time Period
                    </label>
                    <select
                        id="time-period"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        className="input-field"
                        disabled={loading}
                    >
                        <option value="2weeks">Last 2 Weeks</option>
                        <option value="1month">Last Month</option>
                        <option value="3months">Last 3 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="all">All Time</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Filter pull requests by time period
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading || !repoUrl.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </span>
                    ) : (
                        '🔍 Analyze Repository'
                    )}
                </button>
            </form>
        </div>
    )
}
