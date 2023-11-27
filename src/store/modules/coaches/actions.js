const FIREBASE_REALTIME_DATABASE_URL = import.meta.env
  .VITE_FIREBASE_REALTIME_DATABASE_URL;
export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first.val,
      lastName: data.last.val,
      description: data.desc.val,
      hourlyRate: data.rate.val,
      areas: data.areas.val,
    };
    const token = context.rootGetters.token;
    const response = await fetch(
      `${FIREBASE_REALTIME_DATABASE_URL}/coaches/${userId}.json?auth=${token}`,
      { method: 'PUT', body: JSON.stringify(coachData) }
    );
    const responseData = await response.json();

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    const a = await import.meta.env.FIREBASE_REALTIME_DATABASE_URL;
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `${FIREBASE_REALTIME_DATABASE_URL}/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        ...responseData[key],
        id: key,
      };
      coaches.push(coach);
    }
    context.commit('setCoach', coaches);
    context.commit('setFetchTimestamp');
  },
};
