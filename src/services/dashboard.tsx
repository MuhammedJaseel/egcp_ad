import { setAdmin, setStatistics, setUsers, setLeads } from "../redux/store";
import { api } from "./config";
import { showErrorToast, showToast } from "./toast";

export async function loadAdmin(): Promise<any> {
  try {
    const res = await api.get("admin");
    return setAdmin({ ...res.data, busy: false });
  } catch (error) {}
}

export async function loadStatistics(): Promise<any> {
  try {
    const res = await api.get("statistics");
    return setStatistics({
      users: { total: res.data.users, last24h: 0, prev24h: 0 },
      leads: { total: res.data.leads, last24h: 0, prev24h: 0 },
    });
  } catch (error) {}
}

export async function loadUsers(p: number, s: string): Promise<any> {
  try {
    const res = await api.get(`users?page=${p}&search=${s}`);
    return setUsers({
      total: res.data.length,
      page: 1,
      data: res.data,
      busy: false,
    });
  } catch (error) {}
}

export async function loadLeads(p: number, s: string): Promise<any> {
  try {
    const res = await api.get(`leads?page=${p}&search=${s}`);
    return setLeads({
      total: res.data.length,
      page: 1,
      data: res.data,
      busy: false,
    });
  } catch (error) {}
}

export async function assignLeads(id: string, to: string): Promise<any> {
  try {
    await api.patch(`leads/${id}/assign`, { to });
    showToast("Succesfully assigned");
    return;
  } catch (error) {
    showErrorToast("Error on assigning");
  }
}

export async function changeLeadStatus(
  id: string,
  status: string
): Promise<any> {
  try {
    await api.patch(`leads/${id}/status`, { status });
    showToast("Succesfully Changed Status");
    return;
  } catch (error) {
    showErrorToast("Error on changing status");
  }
}
