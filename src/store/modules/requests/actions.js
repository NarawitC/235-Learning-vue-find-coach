const FIREBASE_REALTIME_DATABASE_URL = import.meta.env
  .VITE_FIREBASE_REALTIME_DATABASE_URL;
export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `${FIREBASE_REALTIME_DATABASE_URL}/requests/${payload.coachId}.json`,
      { method: 'POST', body: JSON.stringify(newRequest) }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `${FIREBASE_REALTIME_DATABASE_URL}/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch request.'
      );
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        ...responseData[key],
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
