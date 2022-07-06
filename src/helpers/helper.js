export const hasReplies = (discussions, currentUser) => discussions.some(
    (disc) => disc.notes.at(-1).author.username !== currentUser.username
);

export const updateTitle = (mergeRequests, user) => {
    const threadsWithReplies = mergeRequests.filter(mr => hasReplies(mr.discussions, user));
    const prefix = threadsWithReplies.length ? `(${threadsWithReplies.length}) ` : '';
    document.title = `${prefix}ThreadTracker`;
}