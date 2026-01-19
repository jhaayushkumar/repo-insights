import type { Contributor } from '../types'

interface ContributorListProps {
    contributors: Contributor[]
}

export default function ContributorList({ contributors }: ContributorListProps) {
    if (contributors.length === 0) {
        return null
    }

    return (
        <div className="space-y-6">
            <div className="card">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    📊 Contributors ({contributors.length})
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Found {contributors.length} contributor{contributors.length !== 1 ? 's' : ''} in this repository
                </p>

                <div className="grid gap-4">
                    {contributors.map((contributor) => (
                        <div
                            key={contributor.username}
                            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-start space-x-4">
                                <a
                                    href={contributor.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0"
                                >
                                    <img
                                        src={contributor.avatar}
                                        alt={`${contributor.username}'s avatar`}
                                        className="w-16 h-16 rounded-full border-2 border-primary-500 hover:border-primary-600 transition-colors duration-200"
                                    />
                                </a>

                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <a
                                            href={contributor.profileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                                        >
                                            @{contributor.username}
                                        </a>
                                        {contributor.isMaintainer && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                                👑 Maintainer
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-gray-800 dark:text-white">
                                                {contributor.totalPRs}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Total PRs
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {contributor.mergedPRs}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                ✓ Merged
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {contributor.openPRs}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                ⏳ Open
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                {contributor.closedPRs}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                ✗ Closed
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                    <span className="text-2xl">💡</span>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                            Pro Tip
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Click on contributor avatars or usernames to view their GitHub profiles. Add a GitHub Personal Access Token in your browser's localStorage to increase API rate limits.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
