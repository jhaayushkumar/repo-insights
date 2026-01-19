import type { PullRequest } from '../types'

interface PRListModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    prs: PullRequest[]
    type: 'merged' | 'open' | 'closed'
}

export default function PRListModal({ isOpen, onClose, title, prs, type }: PRListModalProps) {
    if (!isOpen) return null

    const getStatusColor = () => {
        switch (type) {
            case 'merged':
                return 'text-green-600 dark:text-green-400'
            case 'open':
                return 'text-blue-600 dark:text-blue-400'
            case 'closed':
                return 'text-red-600 dark:text-red-400'
        }
    }

    const getStatusIcon = () => {
        switch (type) {
            case 'merged':
                return 'Merged'
            case 'open':
                return 'Open'
            case 'closed':
                return 'Closed'
        }
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center justify-between" id="modal-title">
                                    <span>{title}</span>
                                    <span className={`text-sm font-bold ${getStatusColor()} border border-current px-2 py-0.5 rounded-full`}>
                                        {getStatusIcon()} {prs.length}
                                    </span>
                                </h3>

                                <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
                                    {prs.length > 0 ? (
                                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {prs.map((pr) => (
                                                <li key={pr.id} className="py-3 text-left group">
                                                    <a
                                                        href={pr.html_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-2 px-2 rounded transition-colors duration-150"
                                                    >
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                                            {pr.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            #{pr.number} • opened on {new Date(pr.created_at).toLocaleDateString()}
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 italic py-4">
                                            No pull requests found.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
