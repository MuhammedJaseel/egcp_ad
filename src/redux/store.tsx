import { configureStore, createSlice } from "@reduxjs/toolkit";

const settings = {
  chosen: 0,
};

const admin = {
  busy: true,
};

const statistics = {
  users: { total: 0, last24h: 0, prev24h: 0 },
  leads: { total: 0, last24h: 0, prev24h: 0 },
};

const list = {
  total: 0,
  page: 1,
  busy: true,
  data: [],
};

const appConf = {};

const appSlice = createSlice({
  name: "app",
  initialState: {
    settings: { ...settings },
  },
  reducers: {
    _setSettings: (state, action) => {
      const newValue = action.payload;
      state.settings = newValue;
    },
  },
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    admin: { ...admin },
    statistics: { ...statistics },
    users: { ...list },
    leads: { ...list },
    appConf: { ...appConf },
  },
  reducers: {
    _setAdmin: (state, action) => {
      const newValue = action.payload;
      state.admin = newValue;
    },
    _setStatistics: (state, action) => {
      const newValue = action.payload;
      state.statistics = newValue;
    },
    _setUsers: (state, action) => {
      const newValue = action.payload;
      state.users = newValue;
    },
    _setLeads: (state, action) => {
      const newValue = action.payload;
      state.leads = newValue;
    },
    _setAppConf: (state, action) => {
      const newValue = action.payload;
      state.appConf = newValue;
    },
  },
});

const { _setSettings } = appSlice.actions;
const { _setAdmin, _setStatistics, _setUsers, _setLeads, _setAppConf } =
  dataSlice.actions;

export const store = configureStore({
  reducer: { app: appSlice.reducer, data: dataSlice.reducer },
});

export const setSettings = (v: any) => store.dispatch(_setSettings(v));

export const setAdmin = (v: any) => store.dispatch(_setAdmin(v));
export const setStatistics = (v: any) => store.dispatch(_setStatistics(v));
export const setUsers = (v: any) => store.dispatch(_setUsers(v));
export const setLeads = (v: any) => store.dispatch(_setLeads(v));
export const setAppConf = (v: any) => store.dispatch(_setAppConf(v));

export const clearAllRedux = () => {
  setSettings({ ...settings });

  setAdmin({ ...admin });
  setStatistics({ ...statistics });
  setUsers({ ...list });
  setLeads({ ...list });
  setAppConf({ ...appConf });
};
