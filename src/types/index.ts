export interface Contributor {
    username: string
    avatar: string
    totalPRs: number
    mergedPRs: number
    openPRs: number
    closedPRs: number
    isMaintainer: boolean
    profileUrl: string
}

export interface PullRequest {
    id: number
    title: string
    number: number
    state: string
    created_at: string
    merged_at: string | null
    closed_at: string | null
    html_url: string
    user: {
        login: string
        avatar_url: string
        html_url: string
    }
}

export interface RepositoryData {
    owner: string
    repo: string
    contributors: Contributor[]
}
