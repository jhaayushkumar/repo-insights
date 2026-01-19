import { useState } from 'react'
import type { Contributor, PullRequest } from '../types'
import PRListModal from './PRListModal'

interface ContributorListProps {
    contributors: Contributor[]
}

type ModalState = {
    isOpen: boolean
    title: string
    prs: PullRequest[]
    type: 'merged' | 'open' | 'closed'
}

export default function ContributorList({ contributors }: ContributorListProps) {
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        title: '',
        prs: [],
        type: 'merged'
    })

    // Prevent background scrolling when modal is open
    if (typeof document !== 'undefined') {
        if (modalState.isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }

    const openModal = (contributor: Contributor, type: 'merged' | 'open' | 'closed') => {
        let title = ''
        let prs: PullRequest[] = []

        switch (type) {
            case 'merged':
                title = `Merged PRs by @${contributor.username}`
                prs = contributor.mergedPRsList
                break
            case 'open':
                title = `Open PRs by @${contributor.username}`
                prs = contributor.openPRsList
                break
            case 'closed':
                title = `Closed PRs by @${contributor.username}`
                prs = contributor.closedPRsList
                break
        }

        setModalState({
            isOpen: true,
            title,
            prs,
            type
        })
    }

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }))
    }

    if (contributors.length === 0) {
        return null
    }

    return (
        <>
            <div className="space-y-6">
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        Contributors ({contributors.length})
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
                                                    Maintainer
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

                                            <div
                                                onClick={() => openModal(contributor, 'merged')}
                                                className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center cursor-pointer hover:ring-2 hover:ring-green-400 transition-all duration-200"
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`View merged PRs by ${contributor.username}`}
                                            >
                                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                    {contributor.mergedPRs}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Merged
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => openModal(contributor, 'open')}
                                                className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all duration-200"
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`View open PRs by ${contributor.username}`}
                                            >
                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {contributor.openPRs}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Open
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => openModal(contributor, 'closed')}
                                                className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center cursor-pointer hover:ring-2 hover:ring-red-400 transition-all duration-200"
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`View closed PRs by ${contributor.username}`}
                                            >
                                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                    {contributor.closedPRs}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Closed
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
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                                Pro Tip
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Click on <strong>Merged</strong>, <strong>Open</strong>, or <strong>Closed</strong> stats to see the detailed list of pull requests. Click on avatars to view GitHub profiles.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <PRListModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={modalState.title}
                prs={modalState.prs}
                type={modalState.type}
            />
        </>
    )
}
