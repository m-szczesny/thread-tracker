const _getAuth = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  return "Bearer " + accessToken;
};

const safeFetch = async (url) => {
  return fetch(url, {
    headers: {
      Authorization: _getAuth(),
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
};

const getProjectData = async () => {
  const repoURL = window.localStorage.getItem("repoURL");
  const { origin, pathname } = new URL(repoURL);
  const formattedPathName = encodeURIComponent(pathname.substring(1));
  const { id } = await safeFetch(`${origin}/api/v4/projects/${formattedPathName}`);
  return { id, baseUrl: origin };
}

const getCurrentUser = async ({ baseUrl }) => {
  const url = `${baseUrl}/api/v4/user`;
  return safeFetch(url);
};

export const getInitData = async () => {
  const projectData = await getProjectData();
  const userData = await getCurrentUser(projectData);
  return { userData, projectData };
}

export const fetchOpenMergeRequests = async ({ id, baseUrl }) => {
  const url = `${baseUrl}/api/v4/projects/${id}/merge_requests?state=opened&per_page=100`;
  return safeFetch(url);
};

export const fetchDiscussionsByMR = async ({ id, baseUrl }, mergeRequestIid) => {
  const url = `${baseUrl}/api/v4/projects/${id}/merge_requests/${mergeRequestIid}/discussions?per_page=100`;
  return safeFetch(url);
};

export const fetchDashboardData = async (userData, projectData) => {
  const newMRToCheck = [];
  const openMergeRequests = await fetchOpenMergeRequests(projectData);
  const mergeRequestsWithBlockingDiscussions = openMergeRequests.filter(
    (mr) => mr.blocking_discussions_resolved === false
  );
  await Promise.all(
    mergeRequestsWithBlockingDiscussions.map(async (mr) => {
      const discussions = await fetchDiscussionsByMR(projectData, mr.iid);
      const withNotesByMe = discussions.filter((disc) =>
        disc.notes.some(
          (note) =>
            note.author.username === userData.username &&
            note.resolved === false
        )
      );
      if (withNotesByMe.length) {
        mr.discussions = withNotesByMe;
        newMRToCheck.push(mr);
      }
    })
  );
  return newMRToCheck.sort((a, b) => a.iid - b.iid);
};
