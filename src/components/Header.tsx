export default function Header() {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Repo Insights
                    </h1>
                </div>
            </div>
        </header>
    )
}
