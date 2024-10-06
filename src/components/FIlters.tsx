import { useState } from "react";

interface FiltersProps {
  search: (searchString?: string) => void;
  updateDueDateSort: (val: SortValue | null) => void;
}

export enum SortValue {
  desc = "desc",
  asc = "asc",
}

const Filters: React.FC<FiltersProps> = ({ search, updateDueDateSort }) => {
  const [sort, setSort] = useState<SortValue | null>(null);
  const [expand, setExpand] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  }

  const handleSort = () => {
    let newSortOrder;
    switch(sort) {
      case SortValue.desc : newSortOrder = SortValue.asc; break;
      case SortValue.asc: newSortOrder = null; break;
      default: newSortOrder = SortValue.desc; break;
    }

    setSort(newSortOrder);
    updateDueDateSort(newSortOrder);
  }

  const sortIcon = {
    [SortValue.desc]: <span className="bi bi-caret-down-fill"></span>,
    [SortValue.asc]:  <span className="bi bi-caret-up-fill"></span>
  }

  function resetAndHideFilter() {
    setSort(null);
    updateDueDateSort(null);

    search("");

    setExpand(!expand);
  }

  return <div style={{ borderBottom: "2px solid black", width: "100%", display: "flex", justifyContent: "end", gap: "0.5rem", padding: "0.5rem", margin: "0.5rem 0" }}>
      {expand && <div className="d-flex justify-content-end">
        <input className="form-control" placeholder="Search" onChange={handleSearch} style={{ marginRight: "0.5rem" }} />
        <button type="button" onClick={handleSort} className="btn btn-light w-75">Due Date
          {sort && sortIcon[sort]}
        </button>
      </div>}
      <button className="btn btn-primary" onClick={resetAndHideFilter}>{expand ? <span className="bi bi-x-lg" /> : <>
        Filters <span className="bi bi-caret-down-fill" /> 
          </>
        }
        </button>    
  </div>
}

export default Filters;
