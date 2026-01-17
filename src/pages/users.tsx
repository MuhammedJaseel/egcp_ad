import { useEffect, useState } from "react";
import { IC } from "../components/librery";
import { Paging } from "../components/paging";
import { useSelector } from "react-redux";
import { setUsers } from "../redux/store";
import { loadUsers } from "../services/dashboard";
import { formatDate } from "../services/simple";
import { Popup1 } from "../layouts/popup";
import { showErrorToast } from "../services/toast";
import { LeadService } from "../services";

export default function UsersPage() {
  const [search, setsearch] = useState("");

  const users = useSelector((state: any) => state.data.users);
  const { total, page, data, busy } = users;

  useEffect(() => {
    _loadDatas(page, "");
  }, []);

  const _loadDatas = async (page_: number, search_: string) => {
    await loadUsers(page_, search_);
  };

  const _changePage = (a1: any) => {
    setUsers({ total, page: a1, data: [], busy: true });
    _loadDatas(a1, search);
  };

  const _search = (e: any) => {
    const value = e.target.value;
    setsearch(value);
    if (value.length > 2) _loadDatas(1, value);
    else if (value.length === 0) _loadDatas(1, "");
  };

  const elSt =
    "px-5 py-3 flex items-center border-r border-[#16263B] last:border-0 overflow-hidden ";

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-xl">
          <span className="text-[#4F8FE1] font-bold ">Users</span> ({total})
        </div>
        <AddWindow done={() => _loadDatas(page, "")} />
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
          <div className="min-w-16" />
          <div className={elSt + "py-5 w-[40%]"}>User</div>
          <div className={elSt + "py-5 w-[34%]"}>Created On</div>
          <div className={elSt + "py-5 w-[26%] justify-end"}>Role</div>
          <div className={elSt + "py-5 w-[26%] justify-center"}>Leads</div>
          <div className={elSt + "py-5 w-[20%]"}>Status</div>
        </div>
        {busy && <div className="text-center text-sm p-4">Loading...</div>}
        {total < 1 && <div className="text-center text-sm p-4">No Data</div>}
        {data.map((_it: any, k: number) => (
          <div className="flex odd:bg-[#0a101d] px-2" key={k}>
            <div className="py-4 pl-4 min-w-16 flex justify-center"></div>
            <div className={elSt + "w-[40%]"}>
              <div>
                <div>{_it.name || "null"}</div>
                <div className="text-[#256DC9] text-sm">
                  {_it.email || "null"}
                </div>
              </div>
            </div>

            <div className={elSt + "py-5 w-[34%]"}>
              {formatDate(_it.createdAt)}
            </div>

            <div
              className={
                elSt + "w-[26%] text-[#A5A7AA] text-sm text-right justify-end"
              }
            >
              {_it.role}
            </div>

            <div className={elSt + "w-[26%] text-sm justify-end"}>0</div>

            <div className={elSt + "w-[20%]"}>Active</div>
          </div>
        ))}
      </div>
      <Paging total={total} page={page} reload={_changePage} />
    </div>
  );
}

function AddWindow({ it, done }: any) {
  const [on, seton] = useState(false);
  const [busy, setbusy] = useState(false);
  const [name, setname] = useState(it?.name ?? "");
  const [email, setemail] = useState(it?.email ?? "");
  const [password, setpassword] = useState(it?.password ?? "");
  const [role, setrole] = useState(it?.role ?? "");

  const isnew = it ? false : true;

  const service = new LeadService();

  const _onSubmit = async () => {
    if (busy) return;

    if (name === "") return showErrorToast("Enter name");
    if (email === "") return showErrorToast("Enter email");
    if (password === "") return showErrorToast("Enter password");

    const body = { name, email, password, role };

    setbusy(true);

    if (isnew)
      await service
        .create(body)
        .then(() => {
          seton(false);
          done();
        })
        .catch(() => {})
        .finally(() => setbusy(false));
    else
      await service
        .update(it._id, body)
        .then(() => {
          seton(false);
          done();
        })
        .catch(() => {})
        .finally(() => setbusy(false));
  };

  return (
    <>
      <button className="btn1 flex gap-2" onClick={() => seton(true)}>
        <img src={isnew ? IC.plus : IC.edit} />
        Add New User
      </button>
      <Popup1
        selected={on}
        className="p-8 max-w-[540px] w-full"
        close={() => seton(false)}
      >
        <div className="text-[24px] mt-2 mb-2 font-[600]">
          {isnew ? "Add" : "Edit"} User
        </div>

        <div className="text-[#C7CCD2] mt-6 mb-2">Name *</div>
        <input
          placeholder="text..."
          className="border border-[#16263B] bg-[#0F1626] rounded-[8px] py-3 px-5 w-full"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <div className="text-[#C7CCD2] mt-6 mb-2">Email *</div>
        <input
          placeholder="text..."
          className="border border-[#16263B] bg-[#0F1626] rounded-[8px] py-3 px-5 w-full"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <div className="text-[#C7CCD2] mt-6 mb-2">Password *</div>
        <input
          placeholder="text..."
          className="border border-[#16263B] bg-[#0F1626] rounded-[8px] py-3 px-5 w-full"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <div className="text-[#C7CCD2] mt-6 mb-2">Role *</div>
        <select
          className="border border-[#16263B] bg-[#0F1626] rounded-[8px] py-3 px-5 w-full"
          value={role}
          onChange={(e) => setrole(e.target.value)}
        >
          <option>AGENT</option>
          <option>ADMIN</option>
        </select>

        <div className="flex gap-4 mt-12">
          <button className="btn2 w-full" onClick={() => seton(false)}>
            Cancel
          </button>
          <button
            className={"btn1 w-full" + (busy ? " busybtn" : "")}
            onClick={_onSubmit}
          >
            Save
          </button>
        </div>
      </Popup1>
    </>
  );
}
