import { Octokit } from '@octokit/rest'
import type { Contributor, PullRequest } from '../types'

const getOctokit = () => {
    const token = localStorage.getItem('github_token')
    return new Octokit({
        auth: token || undefined,
    })
}

export const parseGithubUrl = (url: string): { owner: string; repo: string } => {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/
    const match = url.match(regex)

    if (!match) {
        throw new Error('Invalid GitHub repository URL')
    }

    return {
        owner: match[1],
        repo: match[2].replace(/\.git$/, ''),
    }
}

export const getTimePeriodDate = (period: string): Date | null => {
    const now = new Date()

    switch (period) {
        case '2weeks':
            return new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
        case '1month':
            return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        case '3months':
            return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        case '6months':
            return new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
        case 'all':
            return null
        default:
            return null
    }
}

export const fetchRepositoryData = async (
    repoUrl: string,
    timePeriod: string
): Promise<Contributor[]> => {
    const { owner, repo } = parseGithubUrl(repoUrl)
    const octokit = getOctokit()
    const sinceDate = getTimePeriodDate(timePeriod)

    const contributorMap = new Map<string, Contributor>()

    let page = 1
    const maxPages = 5

    while (page <= maxPages) {
        const { data: pullRequests } = await octokit.pulls.list({
            owner,
            repo,
            state: 'all',
            per_page: 100,
            page,
            sort: 'created',
            direction: 'desc',
        })

        if (pullRequests.length === 0) break

        for (const pr of pullRequests as PullRequest[]) {
            const createdAt = new Date(pr.created_at)

            if (sinceDate && createdAt < sinceDate) {
                continue
            }

            const username = pr.user.login

            if (!contributorMap.has(username)) {
                contributorMap.set(username, {
                    username,
                    avatar: pr.user.avatar_url,
                    totalPRs: 0,
                    mergedPRs: 0,
                    openPRs: 0,
                    closedPRs: 0,
                    isMaintainer: false,
                    profileUrl: pr.user.html_url,
                    mergedPRsList: [],
                    openPRsList: [],
                    closedPRsList: [],
                })
            }

            const contributor = contributorMap.get(username)!
            contributor.totalPRs++

            if (pr.merged_at) {
                contributor.mergedPRs++
                contributor.mergedPRsList.push(pr)
            } else if (pr.state === 'open') {
                contributor.openPRs++
                contributor.openPRsList.push(pr)
            } else if (pr.state === 'closed') {
                contributor.closedPRs++
                contributor.closedPRsList.push(pr)
            }
        }

        page++
    }

    const contributors = Array.from(contributorMap.values())
    contributors.sort((a, b) => b.totalPRs - a.totalPRs)

    return contributors
}
