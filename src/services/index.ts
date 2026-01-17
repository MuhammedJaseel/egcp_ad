import { setLeads } from "../redux/store";
import { api } from "./config";

interface User {
  name: string;
  email: string;
  password?: string;
  role: string;
}

export class LeadService {
  async load(p: number, s: string): Promise<any> {
    try {
      const res = await api.get(`users?page=${p}&search=${s}`);
      return setLeads({ ...res.data, busy: false });
    } catch (error) {}
  }

  async create(body: User) {
    const res = await api.post("users", body);
    return res.data;
  }

  async update(id: string, body: User) {
    const res = await api.put(`users/${id}`, body);
    return res.data;
  }
}
