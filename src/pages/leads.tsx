import { useEffect, useState } from "react";
import { IC } from "../components/librery";
import { Paging } from "../components/paging";
import { useSelector } from "react-redux";
import { setLeads } from "../redux/store";
import {
  assignLeads,
  changeLeadStatus,
  loadLeads,
  loadUsers,
} from "../services/dashboard";
import { formatDate } from "../services/simple";

export default function LeadsPage() {
  const [search, setsearch] = useState("");

  const leads = useSelector((state: any) => state.data.leads);
  const { total, page, data, busy } = leads;

  const users = useSelector((state: any) => state.data.users);

  const { role } = useSelector((state: any) => state.data.admin);

  useEffect(() => {
    _loadDatas(page, "");
    if (role === "ADMIN") loadUsers(1, "");
  }, []);

  const _loadDatas = async (page_: number, search_: string) => {
    await loadLeads(page_, search_);
  };

  const _changePage = (a1: any) => {
    setLeads({ total, page: a1, data: [], busy: true });
    _loadDatas(a1, search);
  };

  const _search = (e: any) => {
    const value = e.target.value;
    setsearch(value);
    if (value.length > 2) _loadDatas(1, value);
    else if (value.length === 0) _loadDatas(1, "");
  };

  const _onChangeStatus = (id: string, status: string) => {
    changeLeadStatus(id, status);
  };

  const _onChangeAssign = (id: string, to: string) => {
    assignLeads(id, to);
  };

  const elSt =
    "px-5 py-3 flex items-center border-r border-[#16263B] last:border-0 overflow-hidden ";

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-xl">
          <span className="text-[#4F8FE1] font-bold ">Leads</span> ({total})
        </div>
      </div>
      <div className="bg-[#010513] border-1 border-[#010513] mt-6 rounded-[16px] overflow-hidden">
        <div className="bg-[#011022] rounded-t-[16px] p-5 flex gap-3 items-center border-b border-[#16263B] text-sm">
          <input
            placeholder="Search by User, Email, or name"
            className="border border-[#16263B] rounded-lg py-2 px-4 w-92 bg-[#0F1626]"
            style={{ backgroundImage: `url('${IC.lens}')` }}
            onChange={_search}
          />
          {/* <select
            className="border border-[#16263B] rounded-lg py-2 px-4 w-50 bg-[#0E1C2F]"
            id="search"
          >
            <option>All Status</option>
          </select> */}
        </div>
        <div className="flex text-[14px] px-2">
          <div className={elSt + "py-5 w-[50%]"}>Phone/Project</div>
          <div className={elSt + "py-5 w-[25%]"}>Source/Date</div>
          <div className={elSt + "py-5 w-[25%]"}>Status</div>
          {role === "ADMIN" && (
            <div className={elSt + "py-5 w-[25%]"}>Assign</div>
          )}
        </div>
        {busy && <div className="text-center text-sm p-4">Loading...</div>}
        {total < 1 && <div className="text-center text-sm p-4">No Data</div>}
        {data.map((_it: any, k: number) => (
          <div className="flex odd:bg-[#0a101d] px-2" key={k}>
            <div className={elSt + "w-[50%]"}>
              <div>
                {_it.phone}
                <div className="text-sm text-[#aaa]">{_it.project}</div>
              </div>
            </div>

            <div className={elSt + "w-[25%]"}>
              <div>
                {_it.source}
                <div className="text-xs text-[#aaa]">
                  {formatDate(_it.createdAt)}
                </div>
              </div>
            </div>
            <div className={elSt + "w-[25%]"}>
              <select
                className="text-sm w-full"
                onChange={(e) => _onChangeStatus(_it._id, e.target.value)}
                defaultValue={_it.status}
              >
                {/* <option>{_it.status}</option> */}
                <option>New</option>
                <option>Contacted</option>
                <option>Meeting</option>
                <option>Closed</option>
                <option>Junk</option>
              </select>
            </div>
            {role === "ADMIN" && (
              <div className={elSt + "w-[25%]"}>
                <select
                  className="text-sm w-full"
                  onChange={(e) => _onChangeAssign(_it._id, e.target.value)}
                  defaultValue={_it.assigned}
                >
                  <option>Not assigned</option>
                  {users.data.map(
                    (us: any, k: number) =>
                      us.role === "AGENT" && (
                        <option key={k} value={us._id}>
                          {us.name}
                        </option>
                      )
                  )}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
      <Paging total={total} page={page} reload={_changePage} />
    </div>
  );
}
