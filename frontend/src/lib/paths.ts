export const paths = {
  projects: () => '/projects',
  project: (projectId: string) => `/projects/${projectId}/tasks`,
  projectTasks: (projectId: string) => `/projects/${projectId}/tasks`,
  knowledge: (projectId: string) => `/projects/${projectId}/knowledge`,
  task: (projectId: string, taskId: string) =>
    `/projects/${projectId}/tasks/${taskId}`,
  attempt: (projectId: string, taskId: string, attemptId: string) =>
    `/projects/${projectId}/tasks/${taskId}/attempts/${attemptId}`,
  attemptFull: (projectId: string, taskId: string, attemptId: string) =>
    `/projects/${projectId}/tasks/${taskId}/attempts/${attemptId}/full`,
};
